<?php
    session_start();
    require_once 'config.php';

    $user = $_POST['usuario'];
    $pass = $_POST['password'];

    $stmt = $conn->prepare("SELECT player_name, pj_id FROM PLAYERS WHERE player_name = ? AND player_passwd = ?");
    $stmt->bind_param("ss", $user, $pass);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $_SESSION['usuario'] = $row['player_name'];
        $_SESSION['pj_id'] = $row['pj_id'];
        header("Location: PERFIL.php");
    } else {
        echo "<script>alert('Datos incorrectos'); window.location='LOGIN.php';</script>";
    }

    $stmt->close();
    $conn->close();
?>