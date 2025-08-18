// supabase.js
// All Supabase-related profile logic extracted from profile.html

// Helper maps
const genderMap = {
  'm': 'Masculino',
  'f': 'Femenino',
  'o': 'Otro',
  'n': 'Prefiero no decir'
};
const clubMap = {
  'ajedrez': 'Club de Ajedrez',
  'arte': 'Club de Arte',
  'deportes': 'Club de Deportes',
  'idiomas': 'Club de Idiomas',
  'matematica': 'Club de Matemática',
  'musica': 'Club de Música',
  'programacion': 'Club de Programación',
  'starwars': 'Club Star Wars',
  'otro': 'Otro club',
  'ninguno': 'No está interesado'
};

let currentUserData = null;
let originalValues = {};

// Load user data from Supabase
async function loadUserData() {
  const userSession = localStorage.getItem('currentUser');
  if (!userSession) {
    showMessage('No hay sesión activa. Redirigiendo al inicio...', 'error');
    setTimeout(() => window.location.href = 'index.html', 2000);
    return;
  }
  const sessionUser = JSON.parse(userSession);
  showMessage('Cargando perfil...', 'info');
  try {
    const url = `https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?email=eq.${encodeURIComponent(sessionUser.email)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_APIKEY,
        'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const users = await response.json();
      if (users && users.length > 0) {
        currentUserData = users[0];
        displayUserData(currentUserData);
        showMessage('✅ Perfil cargado', 'success');
      } else {
        showMessage('Usuario no encontrado en la base de datos', 'error');
      }
    } else {
      showMessage('Error al conectar con la base de datos', 'error');
    }
  } catch (error) {
    showMessage('Error de red al cargar perfil', 'error');
  }
}

// Display user data in the profile
function displayUserData(user) {
  document.getElementById('user-display-name').textContent = user.username || 'Usuario';
  document.getElementById('user-role').textContent = `Rol: ${user.rol || 'No especificado'}`;
  document.getElementById('user-code').textContent = `Código: ${user.codigo_usuario || 'No asignado'}`;
  document.getElementById('name-display').textContent = user.username || 'No especificado';
  document.getElementById('email-display').textContent = user.email || 'No especificado';
  document.getElementById('telefono-display').textContent = user.telefono || 'No especificado';
  document.getElementById('genero-display').textContent = genderMap[user.genero] || 'No especificado';
  let clubValue = Array.isArray(user.intereses) ? user.intereses[0] : user.intereses;
  document.getElementById('intereses-display').textContent = clubMap[clubValue] || 'No especificado';
  document.getElementById('fecha-nacimiento-display').textContent = formatDate(user.fecha_nacimiento);
  document.getElementById('fecha-inscripcion-display').textContent = formatDate(user.fecha_inscripcion);
  document.getElementById('creditos-obtenidos-display').textContent = user.creditos_obtenidos || 'No especificado';
  updateAvatar(user.genero);
  document.getElementById('admin-panel').style.display = user.rol === 'administrador' ? 'block' : 'none';
}

function updateAvatar(gender) {
  const avatar = document.getElementById('user-avatar');
  const avatarMap = {
    'm': 'images/Male.png',
    'f': 'images/Female.png',
    'o': 'images/Other.png',
    'n': 'images/incognito.png'
  };
  avatar.src = avatarMap[gender] || avatarMap['n'];
}

function formatDate(dateString) {
  if (!dateString) return 'No especificado';
  try {
    let date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return 'Error en fecha';
  }
}

function showMessage(message, type) {
  const messageArea = document.getElementById('message-area');
  messageArea.textContent = message;
  messageArea.style.display = 'block';
  switch(type) {
    case 'success': messageArea.style.backgroundColor = '#22c55e'; break;
    case 'error': messageArea.style.backgroundColor = '#ef4444'; break;
    case 'info': messageArea.style.backgroundColor = '#3b82f6'; break;
    case 'warning': messageArea.style.backgroundColor = '#f59e0b'; break;
    default: messageArea.style.backgroundColor = '#6b7280';
  }
  messageArea.style.color = 'white';
  if (type === 'success' || type === 'info') setTimeout(() => { messageArea.style.display = 'none'; }, 3000);
}

// Edit field logic
window.editField = function(fieldName) {
  const displayElement = document.getElementById(`${fieldName}-display`);
  const editElement = document.getElementById(`${fieldName}-edit`);
  const buttonsElement = document.getElementById(`${fieldName}-buttons`);
  if (!displayElement || !editElement || !buttonsElement) return;
  if (fieldName === 'genero') {
    editElement.value = currentUserData.genero || 'n';
  } else if (fieldName === 'intereses') {
    document.getElementById('intereses-input').value = Array.isArray(currentUserData.intereses) ? currentUserData.intereses[0] : currentUserData.intereses || '';
  } else {
    editElement.value = currentUserData[fieldName] || '';
  }
  displayElement.style.display = 'none';
  editElement.style.display = 'block';
  buttonsElement.style.display = 'block';
}

window.cancelEdit = function(fieldName) {
  document.getElementById(`${fieldName}-display`).style.display = 'block';
  document.getElementById(`${fieldName}-edit`).style.display = 'none';
  document.getElementById(`${fieldName}-buttons`).style.display = 'none';
}

window.saveField = async function(fieldName) {
  let newValue;
  if (fieldName === 'genero') {
    newValue = document.getElementById('genero-edit').value;
  } else if (fieldName === 'intereses') {
    newValue = document.getElementById('intereses-input').value;
  } else {
    newValue = document.getElementById(`${fieldName}-edit`).value;
  }
  // Prepare update object
  const updateObj = {};
  if (fieldName === 'intereses') {
    updateObj[fieldName] = [newValue];
  } else {
    updateObj[fieldName] = newValue;
  }
  // PATCH request
  try {
    const url = `https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?email=eq.${encodeURIComponent(currentUserData.email)}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_APIKEY,
        'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(updateObj)
    });
    if (response.ok) {
      showMessage('✅ Guardado correctamente', 'success');
      await loadUserData();
    } else {
      showMessage('❌ Error al guardar', 'error');
    }
  } catch {
    showMessage('❌ Error de red al guardar', 'error');
  }
  window.cancelEdit(fieldName);
}

document.addEventListener('DOMContentLoaded', loadUserData);
