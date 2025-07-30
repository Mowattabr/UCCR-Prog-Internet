<?php
// Conexión a MySQL (XAMPP default: root, no password)
$conn = new mysqli('localhost', 'root', '', 'universidad');
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$username = trim($_POST['username']);
$email = trim($_POST['email']);
$password = $_POST['password'];
$gender = $_POST['gender'];
$intereses = isset($_POST['intereses']) ? $_POST['intereses'] : [];

// Validar datos básicos
if (empty($username) || empty($email) || empty($password) || empty($gender) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Datos inválidos. Por favor, completa todos los campos correctamente.");
}

// Convertir intereses a string separado por comas
$intereses_str = '';
if (is_array($intereses)) {
    $intereses_str = implode(',', $intereses);
}

// Hashear la contraseña
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insertar datos usando prepared statements
$stmt = $conn->prepare("INSERT INTO users (username, email, password, gender, intereses) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $username, $email, $hashed_password, $gender, $intereses_str);

if ($stmt->execute()) {
    echo "¡Registro exitoso!";
} else {
    echo "Error al registrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
