<?php
    session_start();
    require_once 'config.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Obtener datos del formulario
        $usuario = trim($_POST['usuario']);
        $password = $_POST['password'];
        $country = $_POST['country'];
        
        // Validaciones básicas
        if (empty($usuario) || empty($password) || empty($country)) {
            header("Location: REGISTER.php?error=campos_vacios");
            exit();
        }
        
        if (strlen($password) < 6) {
            header("Location: REGISTER.php?error=contrasena_corta");
            exit();
        }
        
        // Verificar si el usuario ya existe
        $stmt = $conn->prepare("SELECT player_name FROM PLAYERS WHERE player_name = ?");
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $stmt->close();
            $conn->close();
            header("Location: REGISTER.php?error=usuario_existe");
            exit();
        }
        $stmt->close();
        
        // Generar un nuevo pj_id para el usuario
        $stmt = $conn->prepare("SELECT COALESCE(MAX(pj_id), 0) + 1 as nuevo_id FROM PLAYERS WHERE player_name = ?");
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $nuevo_pj_id = $row['nuevo_id'];
        $stmt->close();
        
        // Hash de la contraseña
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
        // Iniciar transacción
        $conn->begin_transaction();
        
        try {
            // Insertar en PLAYERS
            $stmt = $conn->prepare("INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssis", $usuario, $password_hash, $nuevo_pj_id, $country);
            $stmt->execute();
            $stmt->close();
            
            // Insertar en PJ (con valores por defecto)
            $stmt = $conn->prepare("INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES (?, ?, NULL, 'M', 1, 0, 'Humano', 'Guerrero')");
            $stmt->bind_param("si", $usuario, $nuevo_pj_id);
            $stmt->execute();
            $stmt->close();
            
            // Insertar en STATS (valores por defecto)
            $default_stats = array(10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0);
            $stmt = $conn->prepare("INSERT INTO STATS (player_name, pj_id, strength, strength_mod, dexterity, dexterity_mod, constitution, constitution_mod, intelligence, intelligence_mod, wisdom, wisdom_mod, charisma, charisma_mod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("siiiiiiiiiiiii", $usuario, $nuevo_pj_id, 
                $default_stats[0], $default_stats[1], 
                $default_stats[2], $default_stats[3], 
                $default_stats[4], $default_stats[5], 
                $default_stats[6], $default_stats[7], 
                $default_stats[8], $default_stats[9], 
                $default_stats[10], $default_stats[11]);
            $stmt->execute();
            $stmt->close();
            
            // Confirmar transacción
            $conn->commit();
            
            // Iniciar sesión automáticamente
            $_SESSION['usuario'] = $usuario;
            $_SESSION['pj_id'] = $nuevo_pj_id;
            
            // Redirigir al perfil
            header("Location: PERFIL.php");
            exit();
            
        } catch (Exception $e) {
            // Rollback en caso de error
            $conn->rollback();
            error_log("Error en registro: " . $e->getMessage());
            echo "<script>alert('Error en el registro. Por favor, intenta nuevamente.'); window.location='REGISTER.php';</script>";
        }
        
        $conn->close();
    } else {
        header("Location: REGISTER.php");
        exit();
    }
?>