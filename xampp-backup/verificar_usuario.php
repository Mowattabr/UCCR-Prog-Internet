<?php
// verificar_usuario.php - Verifica si un usuario existe en la base de datos

// Configuración de la base de datos (igual que registro.php)
$conn = new mysqli('localhost', 'root', '', 'University-GMA');
if ($conn->connect_error) {
    echo 'ERROR';
    exit;
}

// Obtener datos del formulario
$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

// Verificar si el usuario existe en la tabla 'users'
$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    // Usuario no existe
    echo 'USER_NOT_EXISTS';
} else {
    // Usuario existe, verificar contraseña
    if (password_verify($password, $user['password'])) {
        echo 'SUCCESS';
    } else {
        echo 'WRONG_PASSWORD';
    }
}

$stmt->close();
$conn->close();
?>
