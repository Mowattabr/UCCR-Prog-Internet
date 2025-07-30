<?php
include 'db.php';

$nombre = trim($_POST['nombre'] ?? '');
$correo = trim($_POST['correo'] ?? '');

$errores = [];
if ($nombre === '')  $errores[] = 'El nombre es obligatorio.';
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) $errores[] = 'Correo inválido.';

if (count($errores) > 0) {
  foreach ($errores as $err) {
    echo "<p style='color:red;'>$err</p>";
  }
  echo "<p><a href='index.php'>Volver</a></p>";
  exit;
}

$sql  = "INSERT INTO alumnos (nombre, correo) VALUES (:nombre, :correo)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':nombre' => $nombre, ':correo' => $correo]);

header('Location: index.php');
exit;
?>