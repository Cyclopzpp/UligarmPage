<?php
    session_start();
    require_once 'config.php';

    $user = $_POST['usuario'];
    $pass = $_POST['password'];

    // 1. Buscamos al usuario por nombre para obtener su hash
    $stmt = $conn->prepare("SELECT player_name, pj_id, player_passwd FROM PLAYERS WHERE player_name = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        // 2. Comparamos la clave ingresada con el hash de la BD
        if (password_verify($pass, $row['player_passwd'])) {
            $_SESSION['usuario'] = $row['player_name'];
            $_SESSION['pj_id'] = $row['pj_id'];
            header("Location: PERFIL.php");
            exit();
        }
    }
    
    // Si falla el usuario o la contraseña
    echo "<script>alert('Datos incorrectos'); window.location='LOGIN.php';</script>";

    $stmt->close();
    $conn->close();
?>