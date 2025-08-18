// --- Registro de Usuario (registro.html) ---
// Contraseñas para roles especiales
window.ROL_PASSWORDS = {
  'profesor': 'profesor',
  'administrador': 'admin'
};

window.rolValidado = false;

window.manejarCambioRol = function() {
  const rol = document.getElementById('rol').value;
  const passwordContainer = document.getElementById('password-rol-container');
  const passwordInput = document.getElementById('password-rol');
  const passwordHint = document.getElementById('password-rol-hint');
  window.rolValidado = false;
  if (rol === 'profesor' || rol === 'administrador') {
    passwordContainer.style.display = 'block';
    passwordInput.required = true;
    passwordInput.value = '';
    if (rol === 'profesor') {
      passwordHint.textContent = 'Contraseña requerida para rol Profesor';
    } else if (rol === 'administrador') {
      passwordHint.textContent = 'Contraseña requerida para rol Administrador';
    }
    passwordInput.addEventListener('input', window.validarPasswordRol);
  } else {
    passwordContainer.style.display = 'none';
    passwordInput.required = false;
    passwordInput.value = '';
    window.rolValidado = true;
  }
  if (window.rolValidado || rol === 'estudiante') {
    window.generarCodigoEstudiante();
  } else {
    document.getElementById('codigo-estudiante').value = '';
  }
};

window.validarPasswordRol = function() {
  const rol = document.getElementById('rol').value;
  const passwordInput = document.getElementById('password-rol');
  const password = passwordInput.value;
  if (window.ROL_PASSWORDS[rol] && password === window.ROL_PASSWORDS[rol]) {
    passwordInput.style.borderColor = '#28a745';
    passwordInput.style.backgroundColor = '#d4edda';
    window.rolValidado = true;
    window.generarCodigoEstudiante();
  } else if (password.length > 0) {
    passwordInput.style.borderColor = '#dc3545';
    passwordInput.style.backgroundColor = '#f8d7da';
    window.rolValidado = false;
    document.getElementById('codigo-estudiante').value = '';
  } else {
    passwordInput.style.borderColor = '';
    passwordInput.style.backgroundColor = '';
    window.rolValidado = false;
    document.getElementById('codigo-estudiante').value = '';
  }
};

window.generarCodigoEstudiante = function() {
  const fechaInscripcion = document.getElementById('fecha-inscripcion').value;
  const rol = document.getElementById('rol').value;
  const codigoInput = document.getElementById('codigo-estudiante');
  if ((rol === 'profesor' || rol === 'administrador') && !window.rolValidado) {
    codigoInput.value = '';
    return;
  }
  if (fechaInscripcion && rol) {
    const fecha = new Date(fechaInscripcion);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    let prefijo;
    switch (rol) {
      case 'estudiante':
        prefijo = 'A';
        break;
      case 'profesor':
        prefijo = 'P';
        break;
      case 'administrador':
        prefijo = 'ADM';
        break;
      default:
        prefijo = 'A';
    }
    const numeroSecuencial = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    const codigo = `${año}_${mes}_${prefijo}_${numeroSecuencial}`;
    codigoInput.value = codigo;
  } else {
    codigoInput.value = '';
  }
};

window.manejarSeleccionClub = function() {
  const club = document.getElementById('intereses').value;
  const fuerzaMsg = document.getElementById('fuerza-msg');
  const fuerzaMsgPrincipal = document.getElementById('fuerza-msg-principal');
  if (club === 'starwars') {
    window.playLightsaberSound();
    fuerzaMsg.style.display = 'block';
    fuerzaMsg.style.opacity = '1';
    fuerzaMsgPrincipal.style.opacity = '1';
    setTimeout(function() {
      fuerzaMsg.style.opacity = '0';
      fuerzaMsgPrincipal.style.opacity = '0';
      setTimeout(function() {
        fuerzaMsg.style.display = 'none';
      }, 2000);
    }, 4000);
  } else {
    fuerzaMsg.style.display = 'none';
    fuerzaMsg.style.opacity = '0';
    fuerzaMsgPrincipal.style.opacity = '0';
  }
};

window.playLightsaberSound = function() {
  const audio = new Audio('misc/lightsaber-ignition-6816.mp3');
  audio.volume = 0.5;
  audio.play().catch(function(error) {
    console.log('Error al reproducir el sonido:', error);
  });
};

window.validarFormulario = function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
  const rol = document.getElementById('rol').value;
  const fechaInscripcion = document.getElementById('fecha-inscripcion').value;
  const genero = document.querySelector('input[name="gender"]:checked');
  const club = document.getElementById('intereses').value;
  if (!username) {
    alert('❌ El nombre de usuario es obligatorio');
    document.getElementById('username').focus();
    return false;
  }
  if (!email || !email.includes('@')) {
    alert('❌ Ingrese un email válido');
    document.getElementById('email').focus();
    return false;
  }
  if (!password) {
    alert('❌ La contraseña es obligatoria');
    document.getElementById('password').focus();
    return false;
  }
  if (password.length < 4) {
    alert('❌ La contraseña debe tener al menos 4 caracteres');
    document.getElementById('password').focus();
    return false;
  }
  if (password !== confirmPassword) {
    alert('❌ Las contraseñas no coinciden');
    document.getElementById('confirm-password').focus();
    return false;
  }
  if (!fechaNacimiento) {
    alert('❌ La fecha de nacimiento es obligatoria');
    document.getElementById('fecha-nacimiento').focus();
    return false;
  }
  if (!rol) {
    alert('❌ Debe seleccionar un rol');
    document.getElementById('rol').focus();
    return false;
  }
  if (!fechaInscripcion) {
    alert('❌ La fecha de inscripción es obligatoria');
    document.getElementById('fecha-inscripcion').focus();
    return false;
  }
  if (!genero) {
    alert('❌ Debe seleccionar un género');
    return false;
  }
  if (!club) {
    alert('❌ Debe seleccionar un club');
    document.getElementById('intereses').focus();
    return false;
  }
  if ((rol === 'profesor' || rol === 'administrador') && !window.rolValidado) {
    alert('❌ Debe ingresar la contraseña correcta para el rol ' + rol);
    document.getElementById('password-rol').focus();
    return false;
  }
  const codigo = document.getElementById('codigo-estudiante').value;
  if (!codigo) {
    alert('❌ Error: No se ha generado el código. Verifique todos los campos.');
    return false;
  }
  window.enviarDatosRegistro();
  return true;
};

window.enviarDatosRegistro = async function() {
  const form = document.getElementById('registro-form');
  const clubSeleccionado = document.getElementById('intereses').value;
  const registroData = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    telefono: document.getElementById('telefono').value,
    fecha_nacimiento: document.getElementById('fecha-nacimiento').value,
    rol: document.getElementById('rol').value,
    fecha_inscripcion: document.getElementById('fecha-inscripcion').value,
    codigo_usuario: document.getElementById('codigo-estudiante').value,
    genero: document.querySelector('input[name="gender"]:checked')?.value || '',
    intereses: clubSeleccionado ? [clubSeleccionado] : [],
    creditos_obtenidos: '',
    estado: 'activo',
    creado_en: new Date().toISOString()
  };
  const registroMsg = document.getElementById('registro-msg');
  registroMsg.style.display = 'block';
  registroMsg.style.color = '#17a2b8';
  registroMsg.textContent = 'Registrando usuario...';
  try {
    const response = await fetch('https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_APIKEY,
        'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(registroData)
    });
    if (response.ok) {
      const result = await response.json();
      registroMsg.style.display = 'none';
      if (result && result.length > 0) {
        try {
          window.mostrarPopupExito(result[0], registroData);
        } catch (popupError) {
          alert(`✅ Usuario registrado exitosamente!\n\nCódigo: ${result[0].codigo_usuario}\nNombre: ${registroData.username}\nEmail: ${registroData.email}`);
        }
        form.reset();
        document.getElementById('codigo-estudiante').value = '';
        window.rolValidado = false;
        document.getElementById('password-rol-container').style.display = 'none';
        const fechaInscripcion = document.getElementById('fecha-inscripcion');
        const hoy = new Date().toISOString().split('T')[0];
        fechaInscripcion.value = hoy;
      } else {
        registroMsg.style.display = 'none';
        alert('⚠️ Respuesta inesperada del servidor');
      }
    } else {
      registroMsg.style.display = 'none';
      const errorText = await response.text();
      if (response.status === 409) {
        alert('❌ Error: Este email ya está registrado en el sistema. Use un email diferente.');
      } else if (response.status === 400) {
        if (errorText.includes('duplicate') || errorText.includes('unique')) {
          alert('❌ Error: Ya existe un usuario con este email o código. Verifique los datos.');
        } else {
          alert('❌ Error de datos: ' + errorText);
        }
      } else if (response.status === 422) {
        alert('❌ Error: Datos inválidos. Verifique que todos los campos estén correctos.');
      } else {
        alert('❌ Error del servidor (' + response.status + '): ' + errorText);
      }
    }
  } catch (error) {
    registroMsg.style.display = 'none';
    alert('❌ Error al registrar usuario. Intente nuevamente.\n\nError: ' + error.message);
  }
};

window.addEventListener('DOMContentLoaded', function() {
  const fechaInscripcion = document.getElementById('fecha-inscripcion');
  const hoy = new Date().toISOString().split('T')[0];
  fechaInscripcion.value = hoy;
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', window.validarFormulario);
  }
  window.manejarCambioRol();
  window.generarCodigoEstudiante();
  const infoIcon = document.getElementById('info-club');
  if (infoIcon) {
    infoIcon.addEventListener('click', window.mostrarPopupClubInfo);
  }
});

window.currentUserCode = '';
window.currentUserData = {};

window.mostrarPopupExito = function(usuarioCreado, datosFormulario) {
  window.currentUserCode = usuarioCreado.codigo_usuario;
  window.currentUserData = {
    nombre: datosFormulario.username,
    email: datosFormulario.email,
    rol: datosFormulario.rol,
    codigo: usuarioCreado.codigo_usuario
  };
  document.getElementById('popup-username-value').textContent = datosFormulario.username;
  document.getElementById('popup-email-value').textContent = datosFormulario.email;
  document.getElementById('popup-rol-value').textContent = window.capitalizeFirstLetter(datosFormulario.rol);
  document.getElementById('popup-code-value').textContent = usuarioCreado.codigo_usuario;
  const popup = document.getElementById('success-popup');
  if (!popup) return;
  popup.style.display = 'flex';
  popup.style.opacity = '0';
  setTimeout(() => {
    popup.style.transition = 'opacity 0.3s ease-in-out';
    popup.style.opacity = '1';
  }, 50);
  try {
    window.playLightsaberSound();
  } catch (e) {}
};

window.copiarCodigoAlPortapapeles = function() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(window.currentUserCode).then(() => {
      window.mostrarMensajeTemporalEnBoton('📋 Copiar Código', '✅ ¡Copiado!');
    }).catch(err => {
      window.fallbackCopiarTexto(window.currentUserCode);
    });
  } else {
    window.fallbackCopiarTexto(window.currentUserCode);
  }
};

window.fallbackCopiarTexto = function(texto) {
  const textArea = document.createElement('textarea');
  textArea.value = texto;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      window.mostrarMensajeTemporalEnBoton('📋 Copiar Código', '✅ ¡Copiado!');
    } else {
      alert('Código: ' + texto + '\n\nCopia manualmente este código.');
    }
  } catch (err) {
    alert('Código: ' + texto + '\n\nCopia manualmente este código.');
  } finally {
    document.body.removeChild(textArea);
  }
};

window.guardarCodigoArchivo = function() {
  const contenido = `GALAXIA MAGNA ACADEMY - INFORMACIÓN DE USUARIO\n========================================\n\nNombre: ${window.currentUserData.nombre}\nEmail: ${window.currentUserData.email}\nRol: ${window.capitalizeFirstLetter(window.currentUserData.rol)}\nCódigo de Usuario: ${window.currentUserData.codigo}\nFecha de Registro: ${new Date().toLocaleDateString('es-ES')}\n\n========================================\nIMPORTANTE: Guarda este código para iniciar sesión\n========================================`;
  const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `GMA_Usuario_${window.currentUserData.codigo}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  window.mostrarMensajeTemporalEnBoton('💾 Guardar como Archivo', '✅ ¡Guardado!');
};

window.mostrarMensajeTemporalEnBoton = function(textoOriginal, textoTemporal) {
  const botones = document.querySelectorAll('#success-popup button');
  botones.forEach(boton => {
    if (boton.textContent.includes(textoOriginal.split(' ')[1])) {
      const textoAnterior = boton.textContent;
      boton.textContent = textoTemporal;
      boton.style.background = '#22c55e';
      setTimeout(() => {
        boton.textContent = textoAnterior;
        boton.style.background = '';
      }, 2000);
    }
  });
};

window.cerrarPopupYVolverInicio = function() {
  const popup = document.getElementById('success-popup');
  popup.style.transition = 'opacity 0.3s ease-in-out';
  popup.style.opacity = '0';
  setTimeout(() => {
    popup.style.display = 'none';
    window.location.href = 'index.html';
  }, 300);
};

window.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

window.addEventListener('click', function(e) {
  const popup = document.getElementById('success-popup');
  if (e.target === popup) {
    window.cerrarPopupYVolverInicio();
  }
});

window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const popup = document.getElementById('success-popup');
    const clubPopup = document.getElementById('club-info-popup');
    if (popup && popup.style.display === 'flex') {
      window.cerrarPopupYVolverInicio();
    }
    if (clubPopup && clubPopup.style.display === 'flex') {
      window.cerrarPopupClubInfo();
    }
  }
});

window.mostrarPopupClubInfo = function() {
  const popup = document.getElementById('club-info-popup');
  popup.style.display = 'flex';
  popup.style.opacity = '0';
  setTimeout(() => {
    popup.style.transition = 'opacity 0.3s ease-in-out';
    popup.style.opacity = '1';
  }, 50);
};

window.cerrarPopupClubInfo = function() {
  const popup = document.getElementById('club-info-popup');
  popup.style.transition = 'opacity 0.3s ease-in-out';
  popup.style.opacity = '0';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 300);
};

window.addEventListener('click', function(e) {
  const clubPopup = document.getElementById('club-info-popup');
  if (e.target === clubPopup) {
    window.cerrarPopupClubInfo();
  }
});
// --- Login logic for index.html ---
async function iniciarSesion() {
  const usernameOrEmail = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  if (!usernameOrEmail || !password) {
    mostrarMensaje('Por favor, ingresa email/código de usuario y contraseña.', 'error');
    return;
  }
  mostrarMensaje('Verificando credenciales...', 'info');
  try {
    let searchUrl;
    if (usernameOrEmail.includes('@')) {
      searchUrl = `https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?email=eq.${encodeURIComponent(usernameOrEmail)}`;
    } else {
      searchUrl = `https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?codigo_usuario=eq.${encodeURIComponent(usernameOrEmail)}`;
    }
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_APIKEY,
        'Authorization': SUPABASE_AUTH,
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      const users = await response.json();
      if (users && users.length > 0) {
        const user = users[0];
        if (user.password && user.password === password) {
          localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            email: user.email,
            rol: user.rol,
            codigo: user.codigo_usuario,
            telefono: user.telefono,
            genero: user.genero,
            intereses: user.intereses,
            fecha_nacimiento: user.fecha_nacimiento,
            fecha_inscripcion: user.fecha_inscripcion,
            fromDatabase: true,
            databaseId: user.id || null
          }));
          mostrarMensaje('¡Login exitoso! Datos completos cargados. Redirigiendo...', 'success');
          setTimeout(() => {
            window.location.href = 'profile.html';
          }, 1000);
        } else {
          mostrarMensaje('Contraseña incorrecta. Verifica tus credenciales.', 'error');
        }
      } else {
        mostrarMensaje('Usuario no encontrado. Verifica tu email o código de usuario.', 'error');
      }
    } else {
      mostrarMensaje('Error al conectar con la base de datos.', 'error');
    }
  } catch (error) {
    console.error('Error al verificar credenciales:', error);
    mostrarMensaje('Error de conexión. Verifica tu conexión a internet.', 'error');
  }
}

function mostrarMensaje(mensaje, tipo) {
  const loginMsg = document.getElementById('login-msg');
  loginMsg.textContent = mensaje;
  loginMsg.style.display = 'block';
  switch(tipo) {
    case 'success':
      loginMsg.style.color = '#22c55e';
      break;
    case 'error':
      loginMsg.style.color = '#ef4444';
      break;
    case 'info':
      loginMsg.style.color = '#3b82f6';
      break;
    default:
      loginMsg.style.color = '#22c55e';
  }
}

function loginComoInvitado() {
  localStorage.setItem('currentUser', JSON.stringify({
    username: 'Invitado',
    email: 'guest@gma.cr',
    rol: 'invitado',
    codigo: 'GUEST_2025'
  }));
  mostrarMensaje('¡Bienvenido, Invitado! Redirigiendo...', 'success');
  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1000);
}

function loginComoInvitadoDirecto() {
  loginComoInvitado();
}
// --- Migrated from cursos.html ---
let allCursos = [];
let filteredCursos = [];
let isAdminLoggedIn = false;
const ADMIN_PASSWORD = 'admin';

document.addEventListener('DOMContentLoaded', function() {
  // Open Aprende más popup window
  var aprendeMasLinks = document.querySelectorAll('a[href="#aprende-mas"]');
  aprendeMasLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('aprende_mas_popup.html', 'AprendeMas', 'width=800,height=800,scrollbars=yes,resizable=yes');
    });
  });
  // Open Ayuda popup window
  var ayudaLinks = document.querySelectorAll('a[href="#ayuda"]');
  ayudaLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('ayuda_popup.html', 'Ayuda', 'width=600,height=700,scrollbars=yes,resizable=yes');
    });
  });
  // Open Contacto popup window
  var contactoLinks = document.querySelectorAll('a[href="#contacto"]');
  contactoLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('contacto_popup.html', 'Contacto', 'width=600,height=700,scrollbars=yes,resizable=yes');
    });
  });
  // TEST BUTTON for Contacto modal
  var testBtn = document.getElementById('test-contacto-btn');
  var contactoSection = document.getElementById('contacto');
  if (testBtn && contactoSection) {
    testBtn.addEventListener('click', function() {
      contactoSection.style.display = 'block';
      console.log('Test button: Contacto modal opened');
    });
  }
  loadCursos();
  setupAddCursoForm();
});

function loginAsAdmin() {
  const password = document.getElementById('admin-password').value;
  const statusDiv = document.getElementById('admin-status');
  if (password === ADMIN_PASSWORD) {
    isAdminLoggedIn = true;
    statusDiv.innerHTML = '<span style="color: #22c55e;">✅ Sesión iniciada como Administrador</span>';
    document.getElementById('admin-controls').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'inline-block';
    document.getElementById('admin-password').value = '';
    displayCursos(filteredCursos);
  } else {
    statusDiv.innerHTML = '<span style="color: #ef4444;">❌ Contraseña incorrecta</span>';
    setTimeout(() => { statusDiv.innerHTML = ''; }, 3000);
  }
}

function logoutAdmin() {
  isAdminLoggedIn = false;
  document.getElementById('admin-status').innerHTML = '';
  document.getElementById('admin-controls').style.display = 'none';
  document.getElementById('logout-btn').style.display = 'none';
  displayCursos(filteredCursos);
}

function setupAddCursoForm() {
  const form = document.getElementById('add-curso-form');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    await addNewCurso();
  });
}

async function addNewCurso() {
  const cuatrimestre = document.getElementById('new-cuatrimestre').value;
  const codigo = document.getElementById('new-codigo').value.trim();
  const curso = document.getElementById('new-curso').value.trim();
  const requisitos = document.getElementById('new-requisitos').value.trim();
  const creditos = parseInt(document.getElementById('new-creditos').value);
  if (!cuatrimestre || !codigo || !curso || !creditos) {
    alert('❌ Por favor complete todos los campos obligatorios');
    return;
  }
  const nuevoCurso = { cuatrimestre, codigo, curso, requisitos: requisitos || null, creditos };
  try {
    showLoadingModal();
    const response = await fetch('https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/cursos', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_APIKEY,
        'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(nuevoCurso)
    });
    hideLoadingModal();
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Curso agregado exitosamente:', result);
      alert('✅ Curso agregado exitosamente');
      clearAddForm();
      await loadCursos();
    } else {
      const errorText = await response.text();
      console.error('❌ Error al agregar curso:', errorText);
      if (response.status === 409 || errorText.includes('duplicate')) {
        alert('❌ Error: Ya existe un curso con ese código');
      } else {
        alert('❌ Error al agregar curso: ' + errorText);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error);
    hideLoadingModal();
    alert('❌ Error de conexión: ' + error.message);
  }
}

function clearAddForm() {
  document.getElementById('add-curso-form').reset();
}

async function loadCursos() {
  showLoadingModal();
  try {
    console.log('🔄 Cargando cursos desde Supabase...');
    const response = await fetch('https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/cursos?select=*&order=cuatrimestre,codigo', {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_APIKEY,
        'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json'
      }
    });
    hideLoadingModal();
    if (response.ok) {
      const cursos = await response.json();
      console.log('✅ Cursos cargados exitosamente:', cursos);
      allCursos = cursos;
      filteredCursos = [...cursos];
      displayCursos(cursos);
      updateStatistics(cursos);
      populateFilters(cursos);
    } else {
      console.error('❌ Error HTTP:', response.status);
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      showErrorModal(`Error HTTP ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('❌ Error al cargar cursos:', error);
    hideLoadingModal();
    showErrorModal('Error de conexión: ' + error.message);
  }
}

function displayCursos(cursos) {
  const container = document.getElementById('cursos-container');
  const noResults = document.getElementById('no-results');
  if (!cursos || cursos.length === 0) {
    container.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';
  container.innerHTML = cursos.map(curso => `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="curso-card" style="background: #23232b; border-radius: 12px; padding: 20px; height: 100%; border: 1px solid #3a3a3a; transition: transform 0.2s, box-shadow 0.2s; position: relative;">
        ${isAdminLoggedIn ? `
          <div style="position: absolute; top: 10px; right: 10px;">
            <button onclick="deleteCurso(${curso.id})" class="btn btn-sm btn-outline-danger" title="Eliminar curso">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        ` : ''}
        <div style="margin-bottom: 15px; ${isAdminLoggedIn ? 'margin-top: 30px;' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
            <span class="cuatrimestre-badge" style="background: ${getCuatrimestreColor(curso.cuatrimestre)}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8em;">
              ${curso.cuatrimestre}
            </span>
            <span style="color: #f18b32; font-weight: bold; font-family: monospace;">
              ${curso.codigo}
            </span>
          </div>
          <h5 style="color: #f18b32; margin: 0; font-size: 1.2em;">${curso.curso}</h5>
        </div>
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="color: #9ca3af; font-size: 0.9em;">
              <i class="fas fa-star" style="margin-right: 5px; color: #fbbf24;"></i>
              ${curso.creditos} ${curso.creditos === 1 ? 'crédito' : 'créditos'}
            </span>
            <span class="creditos-badge" style="background: ${getCreditosColor(curso.creditos)}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8em;">
              ${curso.creditos} CR
            </span>
          </div>
        </div>
        ${curso.requisitos ? `
          <div style="margin-bottom: 15px; padding: 10px; background: #2d2d35; border-radius: 8px;">
            <span style="color: #f18b32; font-size: 0.9em; font-weight: bold;">
              <i class="fas fa-list-check" style="margin-right: 5px;"></i>
              Requisitos:
            </span>
            <p style="color: #c9c9c9; font-size: 0.9em; margin: 5px 0 0 0; line-height: 1.4;">
              ${curso.requisitos}
            </p>
          </div>
        ` : `
          <div style="margin-bottom: 15px; padding: 10px; background: #2d2d35; border-radius: 8px;">
            <span style="color: #22c55e; font-size: 0.9em; font-weight: bold;">
              <i class="fas fa-check-circle" style="margin-right: 5px;"></i>
              Sin requisitos previos
            </span>
          </div>
        `}
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.curso-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 8px 25px rgba(241, 139, 50, 0.2)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
}

async function deleteCurso(cursoId) {
  if (!isAdminLoggedIn) {
    alert('❌ Acceso denegado. Solo administradores pueden eliminar cursos.');
    return;
  }
  const curso = allCursos.find(c => c.id === cursoId);
  if (!confirm(`¿Está seguro de eliminar el curso "${curso.codigo} - ${curso.curso}"?`)) {
    return;
  }
  try {
    showLoadingModal();
    const response = await fetch(`https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/cursos?id=eq.${cursoId}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_APIKEY,
        'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json'
      }
    });
    hideLoadingModal();
    if (response.ok) {
      console.log('✅ Curso eliminado exitosamente');
      alert('✅ Curso eliminado exitosamente');
      await loadCursos();
    } else {
      const errorText = await response.text();
      console.error('❌ Error al eliminar curso:', errorText);
      alert('❌ Error al eliminar curso: ' + errorText);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    hideLoadingModal();
    alert('❌ Error de conexión: ' + error.message);
  }
}

function updateStatistics(cursos) {
  if (!cursos || cursos.length === 0) return;
  const totalCursos = cursos.length;
  const totalCreditos = cursos.reduce((sum, curso) => sum + (parseInt(curso.creditos) || 0), 0);
  const cuatrimestres = [...new Set(cursos.map(curso => curso.cuatrimestre).filter(cuat => cuat))];
  const promedioCreditos = totalCursos > 0 ? Math.round((totalCreditos / totalCursos) * 10) / 10 : 0;
  document.getElementById('total-cursos').textContent = totalCursos;
  document.getElementById('total-creditos').textContent = totalCreditos;
  document.getElementById('total-cuatrimestres').textContent = cuatrimestres.length;
  document.getElementById('promedio-creditos').textContent = promedioCreditos;
  document.getElementById('stats-section').style.display = 'block';
}

function populateFilters(cursos) {
  const cuatrimestreSelect = document.getElementById('filter-cuatrimestre');
  const cuatrimestres = [...new Set(cursos.map(curso => curso.cuatrimestre).filter(cuat => cuat))].sort();
  cuatrimestreSelect.innerHTML = '<option value="">Todos los cuatrimestres</option>';
  cuatrimestres.forEach(cuatrimestre => {
    const option = document.createElement('option');
    option.value = cuatrimestre;
    option.textContent = cuatrimestre;
    cuatrimestreSelect.appendChild(option);
  });
}

function filterCursos() {
  const cuatrimestreFilter = document.getElementById('filter-cuatrimestre').value;
  const creditosFilter = document.getElementById('filter-creditos').value;
  const searchFilter = document.getElementById('search-input').value.toLowerCase();
  filteredCursos = allCursos.filter(curso => {
    const matchCuatrimestre = !cuatrimestreFilter || curso.cuatrimestre === cuatrimestreFilter;
    const matchCreditos = !creditosFilter || curso.creditos.toString() === creditosFilter;
    const matchSearch = !searchFilter || 
      (curso.codigo && curso.codigo.toLowerCase().includes(searchFilter)) ||
      (curso.curso && curso.curso.toLowerCase().includes(searchFilter)) ||
      (curso.requisitos && curso.requisitos.toLowerCase().includes(searchFilter));
    return matchCuatrimestre && matchCreditos && matchSearch;
  });
  displayCursos(filteredCursos);
}

function clearFilters() {
  document.getElementById('filter-cuatrimestre').value = '';
  document.getElementById('filter-creditos').value = '';
  document.getElementById('search-input').value = '';
  filteredCursos = [...allCursos];
  displayCursos(filteredCursos);
}

function getCuatrimestreColor(cuatrimestre) {
  switch(cuatrimestre) {
    case 'I': return '#22c55e';
    case 'II': return '#3b82f6';
    case 'III': return '#8b5cf6';
    case 'Verano': return '#f59e0b';
    default: return '#6b7280';
  }
}

function getCreditosColor(creditos) {
  if (creditos <= 2) return '#22c55e';
  if (creditos <= 4) return '#fbbf24';
  return '#ef4444';
}

function showLoadingModal() {
  document.getElementById('loading-modal').style.display = 'flex';
}
function hideLoadingModal() {
  document.getElementById('loading-modal').style.display = 'none';
}
function showErrorModal(message) {
  document.getElementById('error-message').textContent = message;
  document.getElementById('error-modal').style.display = 'flex';
}
function closeErrorModal() {
  document.getElementById('error-modal').style.display = 'none';
}
function reloadCursos() {
  closeErrorModal();
  loadCursos();
}
window.debugCursos = function() {
  console.log('📊 CURSOS DEBUG INFO:');
  console.log('Total cursos cargados:', allCursos.length);
  console.log('Cursos filtrados:', filteredCursos.length);
  console.log('Admin logged in:', isAdminLoggedIn);
  console.log('Datos completos:', allCursos);
  return {
    total: allCursos.length,
    filtered: filteredCursos.length,
    adminLoggedIn: isAdminLoggedIn,
    data: allCursos
  };
};
document.addEventListener('keydown', function(e) {
  if (e.target.id === 'admin-password' && e.key === 'Enter') {
    loginAsAdmin();
  }
});
// --- Migrated from admin_lista_usuarios.html ---
const ADMIN_PASSWORD_lista = 'admin';
let users_lista = [];
let editingUserId_lista = null;

// Admin authentication
function validateAdminAccess_lista() {
  const password = document.getElementById('admin-password').value;
  const errorDiv = document.getElementById('admin-error');
  
  if (password === ADMIN_PASSWORD_lista) {
    document.getElementById('admin-auth-modal').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    loadUsers_lista();
  } else {
    errorDiv.style.display = 'block';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-password').focus();
  }
}

// Go back to profile
function goBack_lista() {
  window.location.href = 'profile.html';
}

// Load users from database
async function loadUsers_lista() {
  try {
    showMessage_lista('Cargando usuarios...', 'info');
    // Load only active users by default
    const response = await fetch('https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?estado=eq.activo&order=username', {
      method: 'GET',
      headers: {
      'apikey': SUPABASE_APIKEY,
      'Authorization': SUPABASE_AUTH,
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      users_lista = await response.json();
      displayUsers_lista(users_lista);
      updateStatistics_lista(users_lista);
      showMessage_lista(`${users_lista.length} usuarios cargados exitosamente`, 'success');
    } else {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error('Error loading users:', error);
    showMessage_lista('Error al cargar usuarios: ' + error.message, 'error');
  }
}

// Display users in table
function displayUsers_lista(usersToShow) {
  const tbody = document.getElementById('users-table-body');
  const noUsersMessage = document.getElementById('no-users-message');
  if (usersToShow.length === 0) {
    tbody.innerHTML = '';
    noUsersMessage.style.display = 'block';
    return;
  }
  noUsersMessage.style.display = 'none';
  tbody.innerHTML = usersToShow.map(user => {
    const avatar = getAvatarForGender_lista(user.genero);
    const roleColor = getRoleColor_lista(user.rol);
    const statusColor = getStatusColor_lista(user.estado || 'activo');
    const club = getClubName_lista(user.intereses);
    const registerDate = formatDate_lista(user.creado_en || user.fecha_inscripcion);
    return `
      <tr style="border-bottom: 1px solid #444; background-color: #2a2a2a !important;">
        <td style="border: none; padding: 6px 4px; background-color: #2a2a2a;">
          <img src="${avatar}" alt="" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; opacity: 0.8;">
        </td>
        <td style="border: none; padding: 6px 4px; color: #fff; font-size: 0.85em; background-color: #2a2a2a;">${user.username || '---'}</td>
        <td style="border: none; padding: 6px 4px; color: #fff; font-size: 0.8em; background-color: #2a2a2a;">${user.email || '---'}</td>
        <td style="border: none; padding: 6px 4px; color: #fff; font-size: 0.8em; background-color: #2a2a2a;">${user.codigo_usuario || '---'}</td>
        <td style="border: none; padding: 6px 4px; background-color: #2a2a2a;">
          <span style="background: ${roleColor}; color: #fff; padding: 2px 6px; border-radius: 3px; font-size: 0.7em; opacity: 0.9;">
            ${(user.rol || 'estudiante').charAt(0).toUpperCase()}
          </span>
        </td>
        <td style="border: none; padding: 6px 4px; background-color: #2a2a2a;">
          <span style="background: ${statusColor}; color: #fff; padding: 2px 6px; border-radius: 3px; font-size: 0.7em; opacity: 0.9;">
            ${(user.estado || 'activo').charAt(0).toUpperCase()}
          </span>
        </td>
        <td style="border: none; padding: 6px 4px; color: #fff; font-size: 0.8em; background-color: #2a2a2a;">${user.creditos_obtenidos || '---'}</td>
        <td style="border: none; padding: 6px 4px; color: #fff; font-size: 0.8em; background-color: #2a2a2a;">${club.length > 12 ? club.substring(0, 12) + '...' : club}</td>
        <td style="border: none; padding: 6px 4px; color: #fff; font-size: 0.75em; background-color: #2a2a2a;">${registerDate}</td>
        <td style="border: none; padding: 6px 4px; background-color: #2a2a2a;">
          <button class="edit-user-btn" data-user-id="${user.id}" style="background: #666; color: #fff; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; margin-right: 4px; font-size: 0.7em;" title="Editar">
            Editar
          </button>
          <button class="toggle-user-btn" data-user-id="${user.id}" data-username="${user.username || ''}" data-status="${user.estado || 'activo'}" style="background: ${(user.estado === 'activo') ? '#dc2626' : '#059669'}; color: #fff; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer; font-size: 0.7em;" title="${(user.estado === 'activo') ? 'Desactivar' : 'Activar'}">
            ${(user.estado === 'activo') ? 'Desactivar' : 'Activar'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Helper functions
function getAvatarForGender_lista(gender) {
  const avatarMap = {
    'm': 'images/Male.png',
    'f': 'images/Female.png',
    'o': 'images/Other.png',
    'n': 'images/incognito.png'
  };
  return avatarMap[gender] || 'images/incognito.png';
}

function getRoleColor_lista(role) {
  const colorMap = {
    'estudiante': '#3b82f6',
    'profesor': '#f59e0b',
    'administrador': '#ef4444',
    'invitado': '#6b7280'
  };
  return colorMap[role] || '#6b7280';
}

function getStatusColor_lista(status) {
  const colorMap = {
    'activo': '#22c55e',
    'inactivo': '#6b7280',
    'suspendido': '#ef4444'
  };
  return colorMap[status] || '#6b7280';
}

function getClubName_lista(intereses) {
  const clubMap = {
    'ajedrez': 'Ajedrez',
    'arte': 'Arte',
    'deportes': 'Deportes',
    'idiomas': 'Idiomas',
    'matematica': 'Matemática',
    'musica': 'Música',
    'programacion': 'Programación',
    'starwars': 'Star Wars',
    'otro': 'Otro',
    'ninguno': 'Ninguno'
  };
  if (Array.isArray(intereses) && intereses.length > 0) {
    return clubMap[intereses[0]] || 'Desconocido';
  }
  return clubMap[intereses] || 'Sin club';
}

function formatDate_lista(dateString) {
  if (!dateString) return 'Sin fecha';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  } catch (error) {
    return 'Fecha inválida';
  }
}

// Update statistics
function updateStatistics_lista(usersToShow) {
  const totalUsers = usersToShow.length;
  const students = usersToShow.filter(u => u.rol === 'estudiante').length;
  const professors = usersToShow.filter(u => u.rol === 'profesor').length;
  const admins = usersToShow.filter(u => u.rol === 'administrador').length;
  document.getElementById('total-users').textContent = totalUsers;
  document.getElementById('total-students').textContent = students;
  document.getElementById('total-professors').textContent = professors;
  document.getElementById('total-admins').textContent = admins;
}

// Filter users
function filterUsers_lista() {
  const roleFilter = document.getElementById('filter-role').value;
  const statusFilter = document.getElementById('filter-status').value;
  const searchFilter = document.getElementById('filter-search').value.toLowerCase();
  let filteredUsers = users_lista.filter(user => {
    const matchesRole = !roleFilter || user.rol === roleFilter;
    const matchesStatus = !statusFilter || (user.estado || 'activo') === statusFilter;
    const matchesSearch = !searchFilter || 
      (user.username && user.username.toLowerCase().includes(searchFilter)) ||
      (user.email && user.email.toLowerCase().includes(searchFilter)) ||
      (user.codigo_usuario && user.codigo_usuario.toLowerCase().includes(searchFilter));
    return matchesRole && matchesStatus && matchesSearch;
  });
  displayUsers_lista(filteredUsers);
  updateStatistics_lista(filteredUsers);
}

// Edit user
function editUser_lista(userId) {
  const user = users_lista.find(u => u.id === userId);
  if (!user) return;
  editingUserId_lista = userId;
  document.getElementById('user-username').value = user.username || '';
  document.getElementById('user-email').value = user.email || '';
  document.getElementById('user-role').value = user.rol || 'estudiante';
  document.getElementById('user-status').value = user.estado || 'activo';
  document.getElementById('user-gender').value = user.genero || 'n';
  document.getElementById('user-telefono').value = user.telefono || '';
  document.getElementById('user-creditos').value = user.creditos_obtenidos || '';
  document.getElementById('user-birth-date').value = user.fecha_nacimiento || '';
  // Handle club selection
  let clubValue = user.intereses;
  if (Array.isArray(clubValue) && clubValue.length > 0) {
    clubValue = clubValue[0];
  }
  document.getElementById('user-club').value = clubValue || 'ninguno';
  document.getElementById('user-modal').style.display = 'flex';
}

// Toggle user status (activate/deactivate instead of delete)
async function toggleUserStatus_lista(userId, username, currentStatus) {
  const newStatus = currentStatus === 'activo' ? 'inactivo' : 'activo';
  const action = newStatus === 'activo' ? 'activar' : 'desactivar';
  if (!confirm(`¿Está seguro de que desea ${action} el usuario "${username}"?`)) {
    return;
  }
  try {
    showMessage_lista(`${action.charAt(0).toUpperCase() + action.slice(1)}ando usuario...`, 'info');
    const response = await fetch(`https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
      'apikey': SUPABASE_APIKEY,
      'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estado: newStatus })
    });
    if (response.ok) {
      showMessage_lista(`Usuario "${username}" ${action}do exitosamente`, 'success');
      loadUsers_lista();
    } else {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating user status:', error);
    showMessage_lista('Error al actualizar estado del usuario: ' + error.message, 'error');
  }
}

// Reset user password
async function resetUserPassword_lista() {
  if (!editingUserId_lista) return;
  const newPassword = prompt('Ingrese la nueva contraseña para este usuario:');
  if (!newPassword || newPassword.length < 4) {
    alert('La contraseña debe tener al menos 4 caracteres');
    return;
  }
  try {
    showMessage_lista('Reseteando contraseña...', 'info');
    const response = await fetch(`https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?id=eq.${editingUserId_lista}`, {
      method: 'PATCH',
      headers: {
  'apikey': SUPABASE_APIKEY,
  'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword })
    });
    if (response.ok) {
      showMessage_lista('✅ Contraseña reseteada exitosamente', 'success');
    } else {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    showMessage_lista('❌ Error al resetear contraseña: ' + error.message, 'error');
  }
}

// Close modal
function closeModal_lista() {
  document.getElementById('user-modal').style.display = 'none';
  editingUserId_lista = null;
}

// Export users to CSV
function exportUsers_lista() {
  if (users_lista.length === 0) {
    showMessage_lista('No hay usuarios para exportar', 'warning');
    return;
  }
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Nombre,Email,Código,Rol,Estado,Teléfono,Género,Créditos,Club,Fecha Nacimiento,Fecha Registro\n"
    + users_lista.map(user => {
      const club = getClubName_lista(user.intereses);
      const registerDate = formatDate_lista(user.creado_en || user.fecha_inscripcion);
      const birthDate = formatDate_lista(user.fecha_nacimiento);
      return [
        user.username || '',
        user.email || '',
        user.codigo_usuario || '',
        user.rol || '',
        user.estado || 'activo',
        user.telefono || '',
        user.genero || '',
        user.creditos_obtenidos || '',
        club,
        birthDate,
        registerDate
      ].map(field => `"${field}"`).join(',');
    }).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `usuarios_gma_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showMessage_lista('✅ Archivo CSV exportado exitosamente', 'success');
}

// Handle form submission
document.getElementById('user-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!editingUserId_lista) return;
  const userData = {
    username: document.getElementById('user-username').value,
    email: document.getElementById('user-email').value,
    rol: document.getElementById('user-role').value,
    estado: document.getElementById('user-status').value,
    genero: document.getElementById('user-gender').value,
    telefono: document.getElementById('user-telefono').value,
    creditos_obtenidos: document.getElementById('user-creditos').value,
    fecha_nacimiento: document.getElementById('user-birth-date').value,
    intereses: [document.getElementById('user-club').value]
  };
  try {
    showMessage_lista('Actualizando usuario...', 'info');
    const response = await fetch(`https://qjtojggjtouvgljlozwr.supabase.co/rest/v1/lista_usuarios?id=eq.${editingUserId_lista}`, {
      method: 'PATCH',
      headers: {
  'apikey': SUPABASE_APIKEY,
  'Authorization': SUPABASE_AUTH,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (response.ok) {
      showMessage_lista('✅ Usuario actualizado exitosamente', 'success');
      closeModal_lista();
      loadUsers_lista();
    } else {
      const errorText = await response.text();
      throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    showMessage_lista('❌ Error al actualizar usuario: ' + error.message, 'error');
  }
});

// Show message function
function showMessage_lista(message, type) {
  const messageArea = document.getElementById('message-area');
  messageArea.textContent = message;
  messageArea.style.display = 'block';
  // Set color based on type
  switch(type) {
    case 'success':
      messageArea.style.background = '#065f46';
      messageArea.style.color = '#10b981';
      messageArea.style.border = '1px solid #10b981';
      break;
    case 'error':
      messageArea.style.background = '#7f1d1d';
      messageArea.style.color = '#ef4444';
      messageArea.style.border = '1px solid #ef4444';
      break;
    case 'info':
      messageArea.style.background = '#1e3a8a';
      messageArea.style.color = '#3b82f6';
      messageArea.style.border = '1px solid #3b82f6';
      break;
    case 'warning':
      messageArea.style.background = '#92400e';
      messageArea.style.color = '#f59e0b';
      messageArea.style.border = '1px solid #f59e0b';
      break;
  }
  // Auto-hide success and info messages
  if (type === 'success' || type === 'info') {
    setTimeout(() => {
      messageArea.style.display = 'none';
    }, 3000);
  }
}

// Handle Enter key for admin password
document.getElementById('admin-password').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    validateAdminAccess_lista();
  }
});

// Auto-focus password field
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('admin-password').focus();
  // Add event listeners for user action buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-user-btn')) {
      const userId = parseInt(e.target.getAttribute('data-user-id'));
      editUser_lista(userId);
    } else if (e.target.classList.contains('toggle-user-btn')) {
      const userId = parseInt(e.target.getAttribute('data-user-id'));
      const username = e.target.getAttribute('data-username');
      const status = e.target.getAttribute('data-status');
      toggleUserStatus_lista(userId, username, status);
    }
  });
});
// --- Login y modo administrador ---
/*
  Explicación para estudiantes:
  Esta página web está diseñada para estudiantes y utiliza JavaScript para mejorar la interacción y la experiencia de usuario.
  Uno de los métodos más utilizados en este archivo es `querySelector` y `querySelectorAll`.

  ¿Cómo funciona?
  - `querySelector('selector')` selecciona el primer elemento que coincide con el selector CSS que le pases. Por ejemplo, `document.querySelector('form')` selecciona el primer formulario de la página.
  - `querySelectorAll('selector')` selecciona todos los elementos que coinciden con el selector CSS y devuelve una lista (NodeList). Por ejemplo, `document.querySelectorAll('.nav-privado')` selecciona todos los elementos con la clase `nav-privado`.

  ¿Qué otras opciones tiene?
  Puedes usar cualquier selector CSS válido, como:
    - Por clase: `.mi-clase`
    - Por id: `#mi-id`
    - Por etiqueta: `div`, `input`, `button`, etc.
    - Combinaciones: `form input[type="text"]`, `ul > li.activo`, etc.

  Ejemplo:
    // Selecciona todos los botones dentro de un formulario
    var botones = document.querySelectorAll('form button');
    botones.forEach(function(btn) {
      btn.style.background = 'lightblue';
    });

  Esto permite modificar, mostrar, ocultar o agregar eventos a muchos elementos de la página de forma sencilla y flexible.
*/
// Función para activar modo administrador si usuario y contraseña son 'admin'
document.addEventListener('DOMContentLoaded', function() {

  // Función para verificar si un usuario existe en la base de datos
  function checkUserExists(username, password, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://backend-kt0bm09wc-mowattabrs-projects.vercel.app/api/index.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
  }

  function hideRegistroUsuario() {
    // Oculta el fieldset de registro de usuario
    var fieldsets = document.querySelectorAll('fieldset');
    fieldsets.forEach(function(fs) {
      if (fs.querySelector('legend') && fs.querySelector('legend').textContent.trim().toLowerCase() === 'registro de usuario') {
        fs.style.display = 'none';
      }
    });
  }

  function mostrarPrivados() {
    document.querySelectorAll('.nav-privado').forEach(function(el) {
      el.style.display = '';
    });
    // También puedes mostrar otras secciones privadas aquí si lo deseas
  }

  function setAdminMode() {
    document.body.classList.add('admin-mode');
    hideRegistroUsuario();
    showLoginMsg();
    mostrarPrivados();
    // Puedes mostrar un mensaje, cambiar estilos, o mostrar secciones exclusivas aquí
    alert('¡Modo administrador activado!');
  }

  function setUserMode() {
    hideRegistroUsuario();
    showLoginMsg();
    mostrarPrivados();
  }

  function showLoginMsg() {
    var userInput = document.getElementById('login-username');
    var passInput = document.getElementById('login-password');
    var user = userInput.value;
    var msg = document.getElementById('login-msg');
    if (msg) {
      msg.textContent = 'Hola, ' + (user ? user : 'usuario');
      msg.style.display = 'block';
      msg.style.fontSize = '2rem'; 
    }
    // Limpiar los campos de usuario y contraseña después de login
    if (userInput) userInput.value = '';
    if (passInput) passInput.value = '';
  }

  // Login rápido (usuario y contraseña requeridos) - DISABLED: Now handled directly in index.html
  // Commented out to avoid conflicts with the new login system
  /*
  const loginBtn = document.querySelector('button.btn-primary[type="button"]');
  if (loginBtn && loginBtn.textContent.includes('Iniciar sesión')) {
    loginBtn.addEventListener('click', function() {
      const user = document.getElementById('login-username').value.trim();
      const pass = document.getElementById('login-password').value.trim();
      if (!user || !pass) {
        alert('Por favor, ingrese usuario y contraseña.');
        return;
      }
      
      // Restricción: el usuario "admin" no puede iniciar sesión como usuario normal
      if (user === 'admin') {
        alert('El usuario "admin" solo puede acceder en modo administrador. Use el botón "Administrador".');
        return;
      }
      
      // Verificar si el usuario existe en la base de datos SQL
      checkUserExists(user, pass, function(response) {
        if (response === 'USER_NOT_EXISTS') {
          alert('El usuario "' + user + '" no existe.');
        } else if (response === 'WRONG_PASSWORD') {
          alert('Contraseña incorrecta para el usuario "' + user + '".');
        } else if (response === 'SUCCESS') {
          setUserMode();
        } else {
          alert('Error al verificar el usuario.');
        }
      });
    });
  }
  */

  // Login como Administrador (usuario y contraseña requeridos)
  const adminBtn = document.querySelector('button[style*="background:#f18b32"]');
  if (adminBtn) {
    adminBtn.addEventListener('click', function() {
      const user = document.getElementById('login-username').value.trim();
      const pass = document.getElementById('login-password').value.trim();
      if (!user || !pass) {
        alert('Por favor, ingrese usuario y contraseña.');
        return;
      }
      if (user === 'admin' && pass === 'admin') {
        setAdminMode();
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    });
  }

  // AJAX para el registro
  var regForm = document.getElementById('registro-form');
  if (regForm) {
    regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var form = e.target;
      var formData = new FormData(form);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', form.action, true);
      xhr.onload = function() {
        var msgDiv = document.getElementById('registro-msg');
        msgDiv.style.display = 'block';
        msgDiv.style.color = xhr.responseText.includes('exitoso') ? '#22c55e' : '#ff6b6b';
        msgDiv.textContent = xhr.responseText;
        if (xhr.responseText.includes('exitoso')) {
          var username = formData.get('username') || 'usuario';
          alert('¡Registro exitoso para ' + username + '!');
          location.reload(); // Refresh the page after clicking OK
          form.reset();
          // Reset avatar to default
          var avatar = document.getElementById('img-avatar-genero');
          if (avatar) {
            avatar.src = 'images/Male.png';
            avatar.style.filter = 'none';
            avatar.style.opacity = '1';
          }
          // Reset interests images
          document.querySelectorAll('.img_box').forEach(box => box.classList.remove('active'));
        }
      };
      xhr.send(formData);
    });
  }

  // Cambiar avatar según género (solo una vez, para evitar duplicados)
  const generoRadios = document.querySelectorAll('input[name="gender"]');
  const avatarImg = document.getElementById('img-avatar-genero');
  const avatarMap = {
    m: 'images/Male.png',
    f: 'images/Female.png',
    o: 'images/Other.png',
    n: 'images/incognito.png'
  };
  generoRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked && avatarMap[this.value] && avatarImg) {
        avatarImg.src = avatarMap[this.value];
        avatarImg.style.filter = 'none';
        avatarImg.style.opacity = '1';
      }
    });
  });

  // Intereses: iluminar imágenes al seleccionar
  const interesesCheckboxes = document.querySelectorAll('input[name="intereses"]');
  const interesesImgMap = {
    programacion: 'imgbox1',
    diseño: 'imgbox2',
    marketing: 'imgbox3',
    ciencia: 'imgbox4',
    basketball: 'imgbox5',
    musica: 'imgbox6',
    starwars: 'imgbox7'
  };
  interesesCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const boxId = interesesImgMap[this.value];
      if (boxId) {
        const box = document.getElementById(boxId);
        if (box) {
          if (this.checked) {
            box.classList.add('active');
          } else {
            box.classList.remove('active');
          }
        }
      }
      // Mensaje especial Star Wars
      if (this.value === 'starwars') {
        const fuerzaMsg = document.getElementById('fuerza-msg');
        if (fuerzaMsg && this.checked) {
          fuerzaMsg.style.display = 'block';
          setTimeout(() => { fuerzaMsg.style.display = 'none'; }, 2000);
        }
      }
    });
  });

  document.querySelector('form').addEventListener('submit', function(e) {
    const emailInput = document.getElementById('email');
    const errorSpan = document.getElementById('email-error');
    if (!emailInput.value.includes('@')) {
      e.preventDefault(); // Evita que el formulario se envíe
      errorSpan.style.display = 'inline'; // Muestra el mensaje de error
      emailInput.focus(); // Lleva el cursor al campo de email
    } else {
      errorSpan.style.display = 'none'; // Oculta el mensaje si el correo es válido
    }
  });

  // Esta función sirve para mostrar o esconder la imagen de cada interés según si el checkbox está marcado.
  // Si el usuario marca el checkbox, la imagen se muestra a color y opaca.
  // Si lo desmarca, la imagen se ve en escala de grises y más transparente.
  function toggleInterestImage(checkboxId, imgId) {
    document.getElementById(checkboxId).addEventListener('change', function() {
      const img = document.getElementById(imgId);
      if (img) {
        if (this.checked) {
          img.style.filter = 'none';     // Imagen a color
          img.style.opacity = '1';       // Imagen totalmente visible
        } else {
          img.style.filter = 'grayscale(1)'; // Imagen en blanco y negro
          img.style.opacity = '0.2';         // Imagen más transparente
        }
      }
    });
  }

  // Aquí llamamos a la función para cada interés, asociando el checkbox con su imagen correspondiente.
  toggleInterestImage('interes1', 'img-programacion');
  toggleInterestImage('interes2', 'img-diseno');
  toggleInterestImage('interes3', 'img-marketing');
  toggleInterestImage('interes4', 'img-ciencia');
  toggleInterestImage('interes5', 'img-basketball');
  toggleInterestImage('interes6', 'img-musica');
  toggleInterestImage('interes7', 'img-starwars');

  // Set all interest images to grayscale initially
  const interestImages = [
    'img-programacion', 'img-diseno', 'img-marketing', 'img-ciencia', 
    'img-basketball', 'img-musica', 'img-starwars'
  ];
  
  interestImages.forEach(imgId => {
    const img = document.getElementById(imgId);
    if (img) {
      img.style.filter = 'grayscale(1)';
      img.style.opacity = '0.2';
    }
  });

  // Mostrar/ocultar el mensaje especial de la fuerza al seleccionar Star Wars
  const fuerzaMsg = document.getElementById('fuerza-msg');
  const starWarsCheckbox = document.getElementById('interes7');
  if (fuerzaMsg && starWarsCheckbox) {
    starWarsCheckbox.addEventListener('change', function() {
      if (this.checked) {
        fuerzaMsg.classList.add('visible');
        fuerzaMsg.classList.remove('fade');
        // Después de 3 segundos, inicia el fade out
        setTimeout(() => {
          fuerzaMsg.classList.add('fade');
          fuerzaMsg.classList.remove('visible');
        }, 3000);
      } else {
        fuerzaMsg.classList.remove('visible', 'fade');
      }
    });
  }

  // (Eliminado bloque duplicado de avatar por género)

  function setupSectionToggle(linkSelector, sectionId, closeBtnId) {
    var links = document.querySelectorAll(linkSelector);
    var section = document.getElementById(sectionId);
    var closeBtn = document.getElementById(closeBtnId);
    console.log(`setupSectionToggle: Found ${links.length} links for selector '${linkSelector}'`);
    if (links.length && section && closeBtn) {
      links.forEach(function(link, idx) {
        console.log(`Attaching click event to link #${idx} for section #${sectionId}`);
        link.addEventListener('click', function(e) {
          e.preventDefault();
          console.log(`Clicked link for #${sectionId}`);
          section.style.display = 'block';
          console.log(`Section #${sectionId} display set to block.`);
          window.scrollTo({top: section.offsetTop, behavior: 'smooth'});
        });
      });
      closeBtn.addEventListener('click', function() {
        section.style.display = 'none';
        console.log(`Section #${sectionId} closed.`);
      });
    } else {
      if (!links.length) console.warn(`No links found for selector: ${linkSelector}`);
      if (!section) console.warn(`Section not found: ${sectionId}`);
      if (!closeBtn) console.warn(`Close button not found: ${closeBtnId}`);
    }
  }

  // Uso para cada sección:
document.addEventListener('DOMContentLoaded', function() {
  setupSectionToggle('a[href="#ayuda"]', 'ayuda', 'cerrar-ayuda');
  setupSectionToggle('a[href="#cursos"]', 'cursos', 'cerrar-cursos');
  setupSectionToggle('a[href="#estudiantes"]', 'estudiantes', 'cerrar-estudiantes');
  setupSectionToggle('a[href="#profesores"]', 'profesores', 'cerrar-profesores');
  setupSectionToggle('a[href="#laboratorios"]', 'laboratorios', 'cerrar-laboratorios');
  setupSectionToggle('a[href="#contacto"]', 'contacto', 'cerrar-contacto');
  setupSectionToggle('a[href="#aprende-mas"]', 'aprende-mas', 'cerrar-aprende-mas');
});

  // --- Profesores dinámico con materias únicas ---
  // Lista de cursos desde la tabla de cursos
  const cursos = [
    'Inglés I','Matemática I','Introducción a la Informática','Comunicación',
    'Administración I','Contabilidad para Ingeniería','Inglés II','Programación de Cómputo I',
    'Arquitectura de Computadoras','Programación Internet','Sistemas Computacionales (C)','Cálculo I',
    'Métodos Estadísticos I','Finanzas para Ingeniería','Estructura de Datos y Algoritmos','Programación Computadoras II (Visual Basic)',
    'Economía para Ingeniería','Organización de Archivos','Programación de Computadoras III (Visual Basic Avanzado)','Sistemas Operativos I',
    'Diseño y Optimización de Base de Datos','Análisis y Diseño de Sistemas I','Telemática','Administración de Proyectos',
    'Análisis y Diseño de Sistemas II','Investigación de Operaciones I','Administración de Centros de Cómputo','Telemática II',
    'Investigación de Operaciones II','Auditoría de Sistemas Computacionales','Programación de Lenguaje de 4ta Generación','Seminario de Graduación'
  ];

  // Profesores iniciales (nombre, descripcion, materia)
  let profesores = [
    ['Dr. Gordon Moore','Cofundador de Intel y creador de la Ley de Moore','Arquitectura de Computadoras'],
    ['Dra. Ada Lovelace','Primera programadora de la historia, visionaria del software','Programación de Cómputo I'],
    ['MSc. Donald Knuth','Autor de la obra clásica \'The Art of Computer Programming\'','Estructura de Datos y Algoritmos'],
    ['MSc. Grace Hopper','Pionera en lenguajes de programación, desarrolladora de COBOL','Sistemas Operativos I'],
    ['Dr. Tim Berners-Lee','Inventor de la World Wide Web','Programación Internet'],
    ['MSc. Katherine Johnson','Matemática de la NASA, clave en misiones espaciales','Matemática I'],
    ['Lic. Philip Kotler','Padre del marketing moderno y autor reconocido en todo el mundo','Administración I'],
    ['Dr. Alan Turing','Criptógrafo británico y pionero de la computación moderna','Organización de Archivos'],
    ['Fabián Chinchilla Mayorga','Especialista en desarrollo web, HTML semántico y flujos de trabajo colaborativos con GitHub','Programación Internet'],
    ['Dra. Margaret Hamilton','Desarrolladora del software de la misión Apolo 11','Análisis y Diseño de Sistemas I']
  ];

  const tbody = document.getElementById('profesores-tbody');
  function renderProfesores() {
    tbody.innerHTML = '';
    // Obtener materias ya asignadas
    const materiasAsignadas = profesores.map(p => p[2]);
    profesores.forEach((prof, idx) => {
      const tr = document.createElement('tr');
      // Opciones: la materia actual + todas las no asignadas
      const materiaActual = prof[2];
      // Materias disponibles: la actual + las no asignadas
      const materiasDisponibles = cursos.filter(curso => curso === materiaActual || !materiasAsignadas.includes(curso));
      // Si la materia actual no está en cursos (ej: "Programación de Cómputo I/II/III"), solo mostrar esa opción
      let materiaOptions = '';
      if (!cursos.includes(materiaActual)) {
        materiaOptions = `<option value="${materiaActual}" selected>${materiaActual}</option>`;
      } else {
        materiasDisponibles.forEach(materia => {
          materiaOptions += `<option value="${materia}"${materia === materiaActual ? ' selected' : ''}>${materia}</option>`;
        });
      }
      tr.innerHTML = `
        <td><b>${prof[0]}</b></td>
        <td class="descripcion">${prof[1]}</td>
        <td class="materia">
          <select class="materia-select" data-prof-idx="${idx}"${!cursos.includes(materiaActual) ? ' disabled' : ''}>
          </select>
        </td>
      `;
      tbody.appendChild(tr);
    });
    // Asignar eventos a los selects
    tbody.querySelectorAll('.materia-select').forEach(select => {
      select.addEventListener('change', function() {
        const idx = parseInt(this.getAttribute('data-prof-idx'));
        const nuevaMateria = this.value;
        // Verificar que la materia no esté asignada a otro profesor
        const yaAsignada = profesores.some((p, i) => i !== idx && p[2] === nuevaMateria);
        if (yaAsignada) {
          alert('Esta materia ya está asignada a otro profesor.');
          renderProfesores();
          return;
        }
        profesores[idx][2] = nuevaMateria;
        renderProfesores();
      });
    });
  }
  renderProfesores();

  // Validación del formulario de registro
  const form = document.getElementById('registro-form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const usernameInput = document.getElementById('username');
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const registroMsg = document.getElementById('registro-msg');

  form.addEventListener('submit', function(e) {
    let valid = true;
    let messages = [];

    // Validar nombre de usuario
    if (!usernameInput.value.trim()) {
      valid = false;
      messages.push('El nombre de usuario es obligatorio.');
    }

    // Validar email
    if (!emailInput.value.includes('@')) {
      valid = false;
      emailError.style.display = 'inline';
      messages.push('El correo debe contener un @.');
    } else {
      emailError.style.display = 'none';
    }

    // Validar contraseña
    if (!passwordInput.value) {
      valid = false;
      messages.push('La contraseña es obligatoria.');
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
      valid = false;
      messages.push('Las contraseñas no coinciden.');
    }

    // Validar género
    let genderSelected = false;
    genderInputs.forEach(input => { if (input.checked) genderSelected = true; });
    if (!genderSelected) {
      valid = false;
      messages.push('Debe seleccionar un género.');
    }

    if (!valid) {
      e.preventDefault();
      registroMsg.style.display = 'block';
      registroMsg.style.color = '#ff6b6b';
      registroMsg.innerHTML = messages.join('<br>');
    } else {
      registroMsg.style.display = 'none';
    }
  });

  // Avatar género grayscale effect
  function applyAvatarGrayscale() {
    const avatarGenero = document.getElementById('img-avatar-genero');
    if (avatarGenero) {
      console.log('Applying grayscale to avatar'); // Debug log
      avatarGenero.style.filter = 'grayscale(100%)';
      avatarGenero.style.webkitFilter = 'grayscale(100%)';
      avatarGenero.style.opacity = '0.6';
      console.log('Avatar styles applied:', avatarGenero.style.filter); // Debug log
    } else {
      console.log('Avatar element not found'); // Debug log
    }
  }

  // Apply grayscale immediately
  applyAvatarGrayscale();

  // Also apply after a short delay to ensure image is loaded
  setTimeout(applyAvatarGrayscale, 100);

  // Remove grayscale filter when a gender is selected
  const avatarGenderInputs = document.querySelectorAll('input[name="gender"]');
  avatarGenderInputs.forEach(input => {
    input.addEventListener('change', function() {
      const avatarGenero = document.getElementById('img-avatar-genero');
      if (avatarGenero) {
        avatarGenero.style.filter = 'none';
        avatarGenero.style.webkitFilter = 'none';
        avatarGenero.style.opacity = '1';
      }
    });
  });
});