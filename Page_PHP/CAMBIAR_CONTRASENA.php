<?php
session_start();
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['usuario'])) {
    $nueva_pass = $_POST['nueva_password'];
    $user = $_SESSION['usuario'];

    // En un entorno real, usa password_hash()
    $stmt = $conn->prepare("UPDATE PLAYERS SET player_passwd = ? WHERE player_name = ?");
    $stmt->bind_param("ss", $nueva_pass, $user);
    
    if ($stmt->execute()) {
        echo "<script>alert('Contraseña actualizada'); window.location='PERFIL.php';</script>";
    }
    $stmt->close();
}
?>