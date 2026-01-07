<?php
    session_start();
    require_once 'config.php';

    if (!isset($_SESSION['usuario'])) {
        header("Location: LOGIN.php");
        exit();
    }

    $user = $_SESSION['usuario'];
    $pj_id = $_SESSION['pj_id'];

    $sql = "SELECT 
            p.*, 
            s.*, 
            pl.country_name,
            c.description as country_desc, 
            c.climate, 
            c.ruler,
            a.special_ability_name, 
            a.special_ability_description
            FROM PJ p
            JOIN STATS s ON p.player_name = s.player_name AND p.pj_id = s.pj_id
            JOIN PLAYERS pl ON p.player_name = pl.player_name AND p.pj_id = pl.pj_id
            LEFT JOIN SPA a ON p.player_name = a.player_name AND p.pj_id = a.pj_id
            LEFT JOIN COUNTRIES c ON pl.country_name = c.country_name
            WHERE p.player_name = ? AND p.pj_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $user, $pj_id);
    $stmt->execute();
    $datos = $stmt->get_result()->fetch_assoc();

?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Ficha - <?php echo htmlspecialchars($datos['pj_name'] ?? 'Sin Nombre'); ?></title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; background: #1a252f; color: white; display: flex; justify-content: center; padding: 40px; }
            .ficha { background: #2c3e50; padding: 30px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 100%; max-width: 500px; }
            h1 { color: #f1c40f; margin-bottom: 5px; }
            .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
            .stat-box { background: #34495e; padding: 15px; border-radius: 8px; border-left: 4px solid #3498db; }
            .stat-val { font-size: 1.2em; font-weight: bold; }
            .ability-section { margin-top: 25px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px; }
            .logout { display: inline-block; margin-top: 20px; color: #e74c3c; text-decoration: none; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="ficha">
            <h1><?php echo htmlspecialchars($datos['pj_name'] ?? 'Héroe Desconocido'); ?></h1>
            <p><strong>Raza:</strong> <?php echo $datos['pj_race']; ?> | <strong>Clase:</strong> <?php echo $datos['pj_class']; ?></p>
            <p>Nivel: <?php echo $datos['pj_level']; ?></p>
            
            <hr>
            
            <h3>Estadísticas Base</h3>
            <div class="stats-grid">
                <div class="stat-box">Fuerza: <span class="stat-val"><?php echo $datos['strength']; ?></span> (<?php echo $datos['strength_mod']; ?>)</div>
                <div class="stat-box">Destreza: <span class="stat-val"><?php echo $datos['dexterity']; ?></span> (<?php echo $datos['dexterity_mod']; ?>)</div>
                <div class="stat-box">Sabiduría: <span class="stat-val"><?php echo $datos['wisdom']; ?></span> (<?php echo $datos['wisdom_mod']; ?>)</div>
                <div class="stat-box">Carisma: <span class="stat-val"><?php echo $datos['charisma']; ?></span> (<?php echo $datos['charisma_mod']; ?>)</div>
            </div>

            <div class="ability-section">
                <h3>Habilidad Especial</h3>
                <p><strong><?php echo $datos['special_ability_name'] ?? 'Ninguna'; ?></strong></p>
                <small><?php echo $datos['special_ability_description'] ?? 'No hay descripción disponible.'; ?></small>
            </div>
            
            <a href="logout.php" class="logout">Cerrar Sesión</a>
        </div>
    </body>
</html>