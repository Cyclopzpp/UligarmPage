<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Registro en Uligarm</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f2f5;
                font-family: Arial, sans-serif;
            }

            .register-container {
                background-color: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                text-align: center;
                width: 350px;
            }

            input, select {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }

            button {
                width: 100%;
                padding: 10px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 10px;
            }

            button:hover {
                background-color: #218838;
            }

            .login-link {
                margin-top: 15px;
                color: #007bff;
                text-decoration: none;
                display: block;
            }

            .login-link:hover {
                text-decoration: underline;
            }

            .error {
                color: #dc3545;
                font-size: 14px;
                margin: 5px 0;
            }
        </style>
    </head>
    <body>

        <div class="register-container">
            <h3>¡Regístrate en Uligarm!</h3>
            
            <?php
            if (isset($_GET['error'])) {
                $error = $_GET['error'];
                if ($error == 'usuario_existe') {
                    echo '<p class="error">El nombre de usuario ya está en uso.</p>';
                } elseif ($error == 'campos_vacios') {
                    echo '<p class="error">Todos los campos son obligatorios.</p>';
                } elseif ($error == 'contrasena_corta') {
                    echo '<p class="error">La contraseña debe tener al menos 6 caracteres.</p>';
                }
            }
            ?>
            
            <form action="procesar_registro.php" method="POST" id="registerForm">
                <input type="text" name="usuario" placeholder="Nombre de usuario" required>
                <input type="password" name="password" id="password" placeholder="Contraseña" required minlength="6">
                <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirmar contraseña" required>
                
                <select name="country" required>
                    <option value="" disabled selected>Selecciona tu país</option>
                    <option value="Alta del Este">Alta del Este</option>
                    <option value="Pir">Pir</option>
                    <option value="Mezonia">Mezonia</option>
                </select>
                
                <button type="submit">Registrarse</button>
            </form>
            
            <a href="LOGIN.php" class="login-link">¿Ya tienes cuenta? Inicia sesión aquí</a>
        </div>

        <script>
            document.getElementById('registerForm').addEventListener('submit', function(e) {
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirm_password').value;
                
                if (password !== confirmPassword) {
                    e.preventDefault();
                    alert('Las contraseñas no coinciden');
                    return false;
                }
                
                if (password.length < 6) {
                    e.preventDefault();
                    alert('La contraseña debe tener al menos 6 caracteres');
                    return false;
                }
                
                return true;
            });
        </script>
    </body>
</html>