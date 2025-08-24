// profile.js
// Handles loading and editing user profile data

// Helper: Get logged-in user from localStorage (set on login)
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('uccr_user'));
}

// Helper: Save user to localStorage
function setLoggedInUser(user) {
    localStorage.setItem('uccr_user', JSON.stringify(user));
}

// Load user profile data from Supabase
async function loadUserProfile() {
    const user = getLoggedInUser();
    if (!user) return;
    // Query by email or codigo_usuario
    let query = `${SUPABASE_URL}/rest/v1/lista_usuarios?select=*&limit=1`;
    if (user.email) {
        query += `&email=eq.${encodeURIComponent(user.email)}`;
    } else if (user.codigo_usuario) {
        query += `&codigo_usuario=eq.${encodeURIComponent(user.codigo_usuario)}`;
    }
    const headers = {
        'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
        'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : ''
    };
    const response = await fetch(query, { headers });
    if (!response.ok) return;
    const data = await response.json();
    if (data.length === 0) return;
    renderProfile(data[0]);
}

// Render profile fields
function renderProfile(user) {
    document.getElementById('user-display-name').textContent = user.username || '';
    document.getElementById('user-role').textContent = 'Rol: ' + (user.rol || '');
    document.getElementById('user-code').textContent = 'Código: ' + (user.codigo_usuario || '');
    document.getElementById('name-display').textContent = user.username || '';
    document.getElementById('email-display').textContent = user.email || '';
    document.getElementById('telefono-display').textContent = user.telefono || '';
    document.getElementById('genero-display').textContent = user.genero || '';
    document.getElementById('intereses-display').textContent = (user.intereses && user.intereses.length) ? user.intereses.join(', ') : '';
    document.getElementById('fecha-nacimiento-display').textContent = user.fecha_nacimiento || '';
    document.getElementById('fecha-inscripcion-display').textContent = user.fecha_inscripcion || '';
    document.getElementById('creditos-obtenidos-display').textContent = user.creditos_obtenidos || '';
    // Avatar
    let avatarSrc = 'images/Male.png';
    if (user.genero === 'f') avatarSrc = 'images/Female.png';
    else if (user.genero === 'o') avatarSrc = 'images/Other.png';
    else if (user.genero === 'n') avatarSrc = 'images/incognito.png';
    document.getElementById('user-avatar').src = avatarSrc;
    // Show admin panel if admin
    document.getElementById('admin-panel').style.display = (user.rol === 'admin') ? 'block' : 'none';
}

// Edit field logic
function editField(field) {
    document.getElementById(field + '-display').style.display = 'none';
    document.getElementById(field + '-edit').style.display = 'block';
    document.getElementById(field + '-buttons').style.display = 'block';
    // Set value for edit input
    if (field === 'genero') {
        document.getElementById('genero-edit').value = document.getElementById('genero-display').textContent;
    } else if (field === 'intereses') {
        document.getElementById('intereses-input').value = document.getElementById('intereses-display').textContent;
    } else {
        document.getElementById(field + '-edit').value = document.getElementById(field + '-display').textContent;
    }
}
function cancelEdit(field) {
    document.getElementById(field + '-edit').style.display = 'none';
    document.getElementById(field + '-buttons').style.display = 'none';
    document.getElementById(field + '-display').style.display = 'block';
}
async function saveField(field) {
    const user = getLoggedInUser();
    if (!user) return;
    let newValue;
    if (field === 'genero') {
        newValue = document.getElementById('genero-edit').value;
    } else if (field === 'intereses') {
        newValue = document.getElementById('intereses-input').value;
    } else {
        newValue = document.getElementById(field + '-edit').value;
    }
    // Update in Supabase
    let query = `${SUPABASE_URL}/rest/v1/lista_usuarios`;
    let body = {};
    body[field] = (field === 'intereses') ? [newValue] : newValue;
    const headers = {
        'Content-Type': 'application/json',
        'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
        'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : ''
    };
    let filter = '';
    if (user.email) filter = `?email=eq.${encodeURIComponent(user.email)}`;
    else if (user.codigo_usuario) filter = `?codigo_usuario=eq.${encodeURIComponent(user.codigo_usuario)}`;
    const response = await fetch(query + filter, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body)
    });
    if (response.ok) {
        // Update local user and UI
        user[field] = body[field];
        setLoggedInUser(user);
        loadUserProfile();
        cancelEdit(field);
    } else {
        alert('No se pudo guardar el cambio.');
    }
}

// On page load
window.addEventListener('DOMContentLoaded', loadUserProfile);
window.editField = editField;
window.cancelEdit = cancelEdit;
window.saveField = saveField;
