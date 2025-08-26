// Register user in Supabase
async function registrarUsuario(payload) {
	const url = `${SUPABASE_URL}/rest/v1/lista_usuarios`;
	const headers = {
		'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
		'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : '',
		'Content-Type': 'application/json',
		'Prefer': 'return=representation'
	};
	const response = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'No se pudo registrar el usuario');
	}
	return await response.json();
}
window.registrarUsuario = registrarUsuario;
// scripts.js
// Add all custom JavaScript for the site here.

// Ensure config.js is loaded before this script
// If using HTML, add this before scripts.js:
// <script src="config.js"></script>
// <script src="scripts.js"></script>
// If using modules, you can import:
// import './config.js';



// Redirect to registro.html when the Formulario de registro button is clicked
document.addEventListener('DOMContentLoaded', function() {
	var btnRegistro = document.getElementById('btnRegistro');
	if (btnRegistro) {
		btnRegistro.addEventListener('click', function() {
			window.location.href = 'registro.html';
		});
	}

	// Change avatar image based on selected gender in registro.html
	var genderRadios = document.querySelectorAll('input[name="gender"]');
	var avatarImg = document.getElementById('img-avatar-genero');
	if (genderRadios.length && avatarImg) {
		genderRadios.forEach(function(radio) {
			radio.addEventListener('change', function() {
				switch (radio.value) {
					case 'm':
						avatarImg.src = 'images/Male.png';
						break;
					case 'f':
						avatarImg.src = 'images/Female.png';
						break;
					case 'o':
						avatarImg.src = 'images/Other.png';
						break;
					case 'n':
						avatarImg.src = 'images/incognito.png';
						break;
					default:
						avatarImg.src = 'images/GMA.png';
				}
				// Remove grayscale and opacity for feedback
				avatarImg.style.filter = 'none';
				avatarImg.style.opacity = '1';
			});
		});
	}
});

function padNumber(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

async function generarCodigoUsuario(username) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const firstLetter = username ? username[0].toUpperCase() : 'X';
    // Get count of users with same prefix for consecutive number
    // Use SUPABASE_URL from config.js
    const prefix = `${year}${month}${firstLetter}`;
    const urlCheck = `${SUPABASE_URL}/rest/v1/lista_usuarios?codigo_usuario=like.${prefix}%25`;
    const headersCheck = {
        'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
        'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : ''
    };
    const responseCheck = await fetch(urlCheck, { headers: headersCheck });
    let count = 0;
    if (responseCheck.ok) {
        const data = await responseCheck.json();
        count = data.length + 1;
    } else {
        count = 1;
    }
    return `${year}-${month}-${firstLetter}${padNumber(count, 4)}`;
}

// Registration form validation and safe submission

document.addEventListener('DOMContentLoaded', function() {
	var usernameInput = document.getElementById('username');
	var codigoUsuarioInput = document.getElementById('codigo-estudiante');
	if (usernameInput && codigoUsuarioInput) {
		usernameInput.addEventListener('input', async function() {
			const username = usernameInput.value.trim();
			if (username) {
				const codigo = await generarCodigoUsuario(username);
				codigoUsuarioInput.value = codigo;
			} else {
				codigoUsuarioInput.value = '';
			}
		});
	}

	var registroForm = document.getElementById('registro-form');
	if (registroForm) {
		registroForm.addEventListener('submit', async function(e) {
			e.preventDefault();

			// Collect form data
			const username = document.getElementById('username').value.trim();
			const email = document.getElementById('email').value.trim();
			const password = document.getElementById('password').value;
			const confirmPassword = document.getElementById('confirm-password').value;
			const telefono = document.getElementById('telefono').value.trim();
			const fecha_nacimiento = document.getElementById('fecha-nacimiento').value;
			const rol = document.getElementById('rol').value;
			const fecha_inscripcion = document.getElementById('fecha-inscripcion').value;
			const genero = document.querySelector('input[name="gender"]:checked')?.value || '';
			const intereses = document.getElementById('intereses').value;

			// Basic validation
			let errorMsg = '';
			if (!username) errorMsg += 'Nombre de usuario requerido.\n';
			if (!email || !email.includes('@')) errorMsg += 'Correo electrónico inválido.\n';
			if (!password || password.length < 6) errorMsg += 'Contraseña debe tener al menos 6 caracteres.\n';
			if (password !== confirmPassword) errorMsg += 'Las contraseñas no coinciden.\n';
			if (!fecha_nacimiento) errorMsg += 'Fecha de nacimiento requerida.\n';
			if (!rol) errorMsg += 'Rol requerido.\n';
			if (!fecha_inscripcion) errorMsg += 'Fecha de inscripción requerida.\n';
			if (!genero) errorMsg += 'Género requerido.\n';
			if (!intereses) errorMsg += 'Debes seleccionar un club.\n';

			if (errorMsg) {
				alert('Corrige los siguientes errores antes de registrar:\n' + errorMsg);
				return; // Do not save to SQL
			}

            // Check if username exists in Supabase
            // Use global SUPABASE_URL from config.js
            const urlCheck = `${SUPABASE_URL}/rest/v1/lista_usuarios?username=eq.${encodeURIComponent(username)}`;
            const headersCheck = {
                'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
                'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : ''
            };
            const responseCheck = await fetch(urlCheck, { headers: headersCheck });
            if (responseCheck.ok) {
                const data = await responseCheck.json();
                if (data.length > 0) {
                    alert('El nombre de usuario ya existe. Por favor elige otro.');
                    return; // Prevent registration
                }
            } else {
                alert('No se pudo verificar el nombre de usuario. Intenta de nuevo.');
                return;
            }

			// Before preparing payload, auto-generate code again to ensure uniqueness
			const codigo_usuario = await generarCodigoUsuario(username);

			// Prepare payload for Supabase
			const payload = {
				username,
				email,
				password,
				telefono,
				fecha_nacimiento,
				rol,
				fecha_inscripcion,
				codigo_usuario,
				genero,
				intereses: Array.isArray(intereses) ? intereses : [intereses],
				creditos_obtenidos: '',
				estado: 'activo'
			};

			// Password validation for special roles
			if (rol === 'profesor' || rol === 'administrador') {
				const rolPassword = document.getElementById('password-rol').value;
				if (rol === 'profesor' && rolPassword !== 'profesor') {
					alert('La contraseña para el rol Profesor es incorrecta.');
					return;
				}
				if (rol === 'administrador' && rolPassword !== 'admin') {
					alert('La contraseña para el rol Administrador es incorrecta.');
					return;
				}
			}
			try {
				const result = await window.registrarUsuario(payload);
				alert('Usuario registrado exitosamente.');
				window.location.href = 'index.html';
			} catch (err) {
				alert('Error al registrar usuario: ' + err.message);
			}
		});
	}
});

function manejarCambioRol() {
    const rol = document.getElementById('rol').value;
    const passwordContainer = document.getElementById('password-rol-container');
    const passwordHint = document.getElementById('password-rol-hint');
    if (rol === 'profesor') {
        passwordContainer.style.display = 'block';
        passwordHint.textContent = 'Contraseña para profesor: profesor';
    } else if (rol === 'administrador') {
        passwordContainer.style.display = 'block';
        passwordHint.textContent = 'Contraseña para administrador: admin';
    } else {
        passwordContainer.style.display = 'none';
        passwordHint.textContent = '';
    }
}

function manejarSeleccionClub() {}
// Login function for index.html
async function iniciarSesion() {
	const usernameOrEmail = document.getElementById('login-username').value.trim();
	const password = document.getElementById('login-password').value;
	if (!usernameOrEmail || !password) {
		alert('Por favor ingresa tu usuario/email y contraseña.');
		return;
	}
	// Build query for Supabase REST API
	let query = `${SUPABASE_URL}/rest/v1/lista_usuarios?select=*&password=eq.${encodeURIComponent(password)}`;
	if (usernameOrEmail.includes('@')) {
		query += `&email=eq.${encodeURIComponent(usernameOrEmail)}`;
	} else {
		query += `&codigo_usuario=eq.${encodeURIComponent(usernameOrEmail)}`;
	}
	const headers = {
		'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
		'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : ''
	};
	try {
		const response = await fetch(query, { headers });
		if (!response.ok) {
			alert('Error al verificar usuario.');
			return;
		}
		const data = await response.json();
		if (data.length === 0) {
			alert('Usuario o contraseña incorrectos, o el usuario no existe.');
			return;
		}
		// Usuario existe, puedes continuar con el login
		// Fetch full user object by email or codigo_usuario to ensure id is present
		let userQuery = `${SUPABASE_URL}/rest/v1/lista_usuarios?select=*&limit=1`;
		if (data[0].email) {
			userQuery += `&email=eq.${encodeURIComponent(data[0].email)}`;
		} else if (data[0].codigo_usuario) {
			userQuery += `&codigo_usuario=eq.${encodeURIComponent(data[0].codigo_usuario)}`;
		}
		const userResponse = await fetch(userQuery, {
			headers: {
				'apikey': typeof SUPABASE_APIKEY !== 'undefined' ? SUPABASE_APIKEY : '',
				'Authorization': typeof SUPABASE_AUTH !== 'undefined' ? SUPABASE_AUTH : ''
			}
		});
		if (userResponse.ok) {
			const userData = await userResponse.json();
			if (userData.length > 0) {
				localStorage.setItem('uccr_user', JSON.stringify(userData[0]));
			} else {
				localStorage.setItem('uccr_user', JSON.stringify(data[0]));
			}
		} else {
			localStorage.setItem('uccr_user', JSON.stringify(data[0]));
		}
		window.location.href = 'dashboard.html';
	} catch (err) {
		alert('Error de conexión: ' + err.message);
	}
}

