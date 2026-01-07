<?php
    session_start();
    if (!isset($_SESSION['usuario'])) {
        header("Location: LOGIN.php"); // Si no está logueado, lo echa
        exit();
    }

    // Conexión (lo ideal es tener esto en un archivo aparte)
    $conn = new mysqli("localhost", "root", "", "NOMBRE_DE_TU_BASE_DE_DATOS");
    $user = $_SESSION['usuario'];
    $pj_id = $_SESSION['pj_id'];

    // Consulta Multitabla (JOIN) para traer todo de una vez
    $sql = "SELECT p.*, s.*, a.special_ability_name 
            FROM PJ p
            JOIN STATS s ON p.player_name = s.player_name AND p.pj_id = s.pj_id
            LEFT JOIN SPA a ON p.player_name = a.player_name AND p.pj_id = a.pj_id
            WHERE p.player_name = '$user' AND p.pj_id = $pj_id";

    $result = $conn->query($sql);
    $datos = $result->fetch_assoc();
    ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Ficha de Personaje - <?php echo $datos['pj_name']; ?></title>
        <style>
            body { font-family: sans-serif; background: #2c3e50; color: white; padding: 20px; }
            .ficha { background: #34495e; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; }
            .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .stat-box { background: #22313f; padding: 10px; border-radius: 5px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="ficha">
            <h1><?php echo $datos['pj_name'] ?? 'Sin Nombre'; ?></h1>
            <p>Raza: <?php echo $datos['pj_race']; ?> | Clase: <?php echo $datos['pj_class']; ?></p>
            <hr>
            <h3>Estadísticas</h3>
            <div class="stats-grid">
                <div class="stat-box">Fuerza: <?php echo $datos['strength']; ?> (<?php echo $datos['strength_mod']; ?>)</div>
                <div class="stat-box">Destreza: <?php echo $datos['dexterity']; ?> (<?php echo $datos['dexterity_mod']; ?>)</div>
                <div class="stat-box">Sabiduría: <?php echo $datos['wisdom']; ?> (<?php echo $datos['wisdom_mod']; ?>)</div>
                <div class="stat-box">Carisma: <?php echo $datos['charisma']; ?> (<?php echo $datos['charisma_mod']; ?>)</div>
            </div>
            <h3>Habilidad Especial</h3>
            <p><?php echo $datos['special_ability_name'] ?? 'Ninguna'; ?></p>
            
            <br>
            <a href="logout.php" style="color: #e74c3c;">Cerrar Sesión</a>
        </div>
    </body>
</html>