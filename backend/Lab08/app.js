const apiUrl = 'api/usuarios.php';

function listarUsuarios() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('lista');
      lista.innerHTML = '';
      data.forEach(u => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${u.nombre} - ${u.email}
          <button onclick="editarUsuario(${u.id})">Editar</button>
          <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
        `;
        lista.appendChild(li);
      });
    });
}

function crearUsuario(nombre, email) {
  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email })
  })
    .then(res => res.json())
    .then(() => listarUsuarios());
}

function actualizarUsuario(id, nombre, email) {
  fetch(`${apiUrl}?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email })
  })
    .then(res => res.json())
    .then(() => listarUsuarios());
}

function eliminarUsuario(id) {
  if (!confirm('¿Seguro que desea eliminar este usuario?')) return;
  fetch(`${apiUrl}?id=${id}`, {
    method: 'DELETE'
  })
    .then(() => listarUsuarios());
}

// Helpers para interacción simple:
function enviarFormulario(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;

  if (id) {
    actualizarUsuario(id, nombre, email);
  } else {
    crearUsuario(nombre, email);
  }

  document.getElementById('formulario').reset();
  document.getElementById('id').value = '';
}

function editarUsuario(id) {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const usuario = data.find(u => u.id === id);
      document.getElementById('id').value = usuario.id;
      document.getElementById('nombre').value = usuario.nombre;
      document.getElementById('email').value = usuario.email;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formulario').addEventListener('submit', enviarFormulario);
  listarUsuarios();
});
