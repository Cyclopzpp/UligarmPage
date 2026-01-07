<?php
    session_start();
    require_once 'config.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['usuario'])) {
        $nuevo_nombre = $_POST['nuevo_nombre'];
        $user = $_SESSION['usuario'];
        $pj_id = $_SESSION['pj_id'];

        // Actualizamos el nombre en la tabla PJ
        $stmt = $conn->prepare("UPDATE PJ SET pj_name = ? WHERE player_name = ? AND pj_id = ?");
        $stmt->bind_param("ssi", $nuevo_nombre, $user, $pj_id);
        
        if ($stmt->execute()) {
            // Si sale bien, volvemos a la ficha para ver el nombre actualizado
            header("Location: PERFIL.php");
        } else {
            echo "Error al actualizar: " . $conn->error;
        }
        $stmt->close();
    }
    $conn->close();
?>