<?php
    session_start();

    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "NOMBRE_DE_TU_BASE_DE_DATOS"; 

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $user = $_POST['usuario'];
    $pass = $_POST['password'];

    $sql = "SELECT player_name, pj_id FROM PLAYERS WHERE player_name = '$user' AND player_passwd = '$pass'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_SESSION['usuario'] = $row['player_name'];
        $_SESSION['pj_id'] = $row['pj_id'];
        
        header("Location: perfil.php");
    } else {
        echo "<script>alert('Usuario o contraseña incorrectos'); window.location='LOGIN.php';</script>";
    }

    $conn->close();
?>