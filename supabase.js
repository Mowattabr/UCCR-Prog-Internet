// supabase.js
// All Supabase-related logic for user registration and data management
// Requires config.js to be loaded first

// Use SUPABASE_URL from config.js

// Helper: Make a POST request to Supabase REST API to insert a user
async function registrarUsuario(payload) {
    const url = `${SUPABASE_URL}/rest/v1/lista_usuarios`;
    const headers = {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_APIKEY,
        'Authorization': SUPABASE_AUTH
    };
    // Only send fields matching the table schema
    const body = JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        telefono: payload.telefono || null,
        fecha_nacimiento: payload.fecha_nacimiento,
        rol: payload.rol,
        fecha_inscripcion: payload.fecha_inscripcion,
        codigo_usuario: payload.codigo_usuario,
        genero: payload.genero,
        intereses: payload.intereses ? [payload.intereses] : [],
        creditos_obtenidos: payload.creditos_obtenidos || '',
        estado: payload.estado || 'activo'
    });
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error('Supabase error: ' + error);
    }
    return await response.json();
}

// Helper: Cargar estudiantes desde Supabase
async function cargarEstudiantes() {
  const tablaContainer = document.getElementById('tabla-estudiantes');
  if (!tablaContainer) {
    console.warn('No se encontró la tabla de estudiantes en el DOM.');
    return;
  }
  const url = `${SUPABASE_URL}/rest/v1/lista_usuarios?rol=eq.estudiante`;
  const headers = {
    'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
    'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : ''
  };
  const response = await fetch(url, { headers });
  const tabla = tablaContainer.getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';
  if (response.ok) {
    const estudiantes = await response.json();
    console.log('Estudiantes recibidos:', estudiantes);
    if (estudiantes.length === 0) {
      tabla.innerHTML = '<tr><td colspan="9" style="color:#ff6b6b; text-align:center;">No hay estudiantes registrados.</td></tr>';
      return;
    }
    estudiantes.forEach(est => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${est.username}</td>
        <td>${est.email}</td>
        <td>${est.telefono || ''}</td>
        <td>${est.fecha_nacimiento}</td>
        <td>${est.fecha_inscripcion}</td>
        <td>${est.codigo_usuario}</td>
        <td>${est.genero}</td>
        <td>${(est.intereses && est.intereses.length) ? est.intereses.join(', ') : ''}</td>
        <td>${est.estado}</td>
      `;
      tabla.appendChild(fila);
    });
  } else {
    tabla.innerHTML = '<tr><td colspan="9" style="color:#ff6b6b; text-align:center;">No se pudo cargar la lista de estudiantes.</td></tr>';
  }
}

// Export for use in scripts.js
window.registrarUsuario = registrarUsuario;
window.cargarEstudiantes = cargarEstudiantes;
