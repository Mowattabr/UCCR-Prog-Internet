<?php include 'db.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro de Alumnos</title>
</head>
<body>
  <div style="max-width:600px; margin:2rem auto; padding:1rem; border:1px solid #ddd; border-radius:4px;">
    <h2>Registro de Alumnos</h2>
    <form action="procesar.php" method="POST">
      <div style="margin-bottom:1rem;">
        <label>Nombre:</label>
        <input type="text" name="nombre" style="width:100%; padding:.5rem; border:1px solid #ccc; border-radius:4px;" required>
      </div>
      <div style="margin-bottom:1rem;">
        <label>Correo electrónico:</label>
        <input type="email" name="correo" style="width:100%; padding:.5rem; border:1px solid #ccc; border-radius:4px;" required>
      </div>
      <button type="submit" style="padding:.5rem 1rem; border:none; border-radius:4px; background-color:#007bff; color:#fff; cursor:pointer;">Enviar</button>
    </form>

    <table style="width:100%; border-collapse:collapse; margin-top:2rem;">
      <thead>
        <tr><th style="border:1px solid #dee2e6; padding:.5rem; background:#e9ecef;">ID</th><th style="border:1px solid #dee2e6; padding:.5rem; background:#e9ecef;">Nombre</th><th style="border:1px solid #dee2e6; padding:.5rem; background:#e9ecef;">Correo</th><th style="border:1px solid #dee2e6; padding:.5rem; background:#e9ecef;">Fecha</th></tr>
      </thead>
      <tbody>
        <?php
          $stmt = $pdo->query("SELECT * FROM alumnos ORDER BY fecha_registro DESC");
          while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>
                    <td>{$row['id']}</td>
                    <td>".htmlspecialchars($row['nombre'])."</td>
                    <td>".htmlspecialchars($row['correo'])."</td>
                    <td>{$row['fecha_registro']}</td>
                  </tr>";
          }
        ?>
      </tbody>
    </table>
  </div>
</body>
</html>