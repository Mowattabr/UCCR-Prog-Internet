// Common admin tools logic for students, professors, admins
function setupAdminTools({rol, pageTitle, tableId, modalId, filterLabel, fetchLabel}) {
  document.title = pageTitle;
  document.querySelector('h2').textContent = fetchLabel;
  document.querySelector('p').textContent = `Panel de administración para ver todos los ${fetchLabel.toLowerCase()}`;
  const filterInput = document.getElementById('filter-global');
  const modal = document.getElementById(modalId);
  const table = document.getElementById(tableId);
  let globalData = [];

  function filtrar(data) {
    const filtro = filterInput.value.toLowerCase();
    return data.filter(est => {
      return (
        (!filtro ||
          (est.username && est.username.toLowerCase().includes(filtro)) ||
          (est.email && est.email.toLowerCase().includes(filtro)) ||
          (est.password && est.password.toLowerCase().includes(filtro)) ||
          (est.telefono && est.telefono.toLowerCase().includes(filtro)) ||
          (est.fecha_nacimiento && est.fecha_nacimiento.toLowerCase().includes(filtro)) ||
          (est.rol && est.rol.toLowerCase().includes(filtro)) ||
          (est.fecha_inscripcion && est.fecha_inscripcion.toLowerCase().includes(filtro)) ||
          (est.codigo_usuario && est.codigo_usuario.toLowerCase().includes(filtro)) ||
          (est.genero && est.genero.toLowerCase().includes(filtro)) ||
          (est.intereses && est.intereses.join(', ').toLowerCase().includes(filtro)) ||
          (est.creado_en && est.creado_en.toLowerCase().includes(filtro)) ||
          (est.creditos_obtenidos && est.creditos_obtenidos.toLowerCase().includes(filtro)) ||
          (est.estado && est.estado.toLowerCase().includes(filtro))
        )
      );
    });
  }

  async function cargar() {
    const url = `${SUPABASE_URL}/rest/v1/lista_usuarios?rol=eq.${rol}`;
    const headers = {
      'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
      'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : ''
    };
    const response = await fetch(url, { headers });
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    if (response.ok) {
      const data = await response.json();
      globalData = data;
      const filtrados = filtrar(data);
      filtrados.forEach(est => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td><button class='btn btn-warning btn-sm' onclick='modificar("${est.id}")'>Mod</button></td>
          <td title="${est.username}">${est.username}</td>
          <td title="${est.email}">${est.email}</td>
          <td title="${est.password}">${est.password}</td>
          <td title="${est.telefono || ''}">${est.telefono || ''}</td>
          <td>${est.fecha_nacimiento}</td>
          <td>${est.rol}</td>
          <td>${est.fecha_inscripcion}</td>
          <td title="${est.codigo_usuario}">${est.codigo_usuario}</td>
          <td>${est.genero}</td>
          <td class="truncate-intereses" title="${(est.intereses && est.intereses.length) ? est.intereses.join(', ') : ''}">${(est.intereses && est.intereses.length) ? est.intereses.join(', ') : ''}</td>
          <td>${est.creado_en || ''}</td>
          <td title="${est.creditos_obtenidos}">${est.creditos_obtenidos}</td>
          <td>${est.estado}</td>
        `;
        tbody.appendChild(fila);
      });
    } else {
      tbody.innerHTML = `<tr><td colspan="14" style="color:#ff6b6b; text-align:center;">No se pudo cargar la lista de ${fetchLabel.toLowerCase()}.</td></tr>`;
    }
  }

  window.modificar = function(id) {
    const est = globalData.find(e => e.id === id);
    if (!est) return;
    document.getElementById('edit-id').value = est.id;
    document.getElementById('edit-username').value = est.username || '';
    document.getElementById('edit-email').value = est.email || '';
    document.getElementById('edit-password').value = est.password || '';
    document.getElementById('edit-telefono').value = est.telefono || '';
    document.getElementById('edit-fecha_nacimiento').value = est.fecha_nacimiento || '';
    document.getElementById('edit-rol').value = est.rol || '';
    document.getElementById('edit-fecha_inscripcion').value = est.fecha_inscripcion || '';
    document.getElementById('edit-codigo_usuario').value = est.codigo_usuario || '';
    document.getElementById('edit-genero').value = est.genero || '';
    document.getElementById('edit-intereses').value = (est.intereses && est.intereses.length) ? est.intereses.join(', ') : '';
    document.getElementById('edit-creado_en').value = est.creado_en || '';
    document.getElementById('edit-creditos_obtenidos').value = est.creditos_obtenidos || '';
    document.getElementById('edit-estado').value = est.estado || '';
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  };

  document.getElementById('guardarCambios').addEventListener('click', async function() {
    const id = document.getElementById('edit-id').value;
    const datos = {
      username: document.getElementById('edit-username').value,
      email: document.getElementById('edit-email').value,
      password: document.getElementById('edit-password').value,
      telefono: document.getElementById('edit-telefono').value,
      fecha_nacimiento: document.getElementById('edit-fecha_nacimiento').value,
      rol: document.getElementById('edit-rol').value,
      fecha_inscripcion: document.getElementById('edit-fecha_inscripcion').value,
      codigo_usuario: document.getElementById('edit-codigo_usuario').value,
      genero: document.getElementById('edit-genero').value,
      intereses: document.getElementById('edit-intereses').value.split(',').map(s => s.trim()),
      creado_en: document.getElementById('edit-creado_en').value,
      creditos_obtenidos: document.getElementById('edit-creditos_obtenidos').value,
      estado: document.getElementById('edit-estado').value
    };
    try {
      const url = `${SUPABASE_URL}/rest/v1/lista_usuarios?id=eq.${id}`;
      const headers = {
        'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
        'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : '',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      };
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(datos)
      });
      if (response.ok) {
        bootstrap.Modal.getInstance(modal).hide();
        cargar();
      } else {
        alert('Error al guardar los cambios.');
      }
    } catch (e) {
      alert('Error de red al guardar los cambios.');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    cargar();
    filterInput.addEventListener('input', cargar);
  });
}
