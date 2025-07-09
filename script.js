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

  // Login rápido (usuario y contraseña requeridos)
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
      setUserMode();
    });
  }

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

// Este bloque permite cambiar el avatar mostrado según el género seleccionado por el usuario.
// Cada vez que el usuario selecciona un radio button de género, se cambia la imagen del avatar.
const generoRadios = document.getElementsByName('genero');
const avatarImg = document.getElementById('img-avatar-genero');
// Diccionario con las URLs de los avatares para cada género
const avatarSources = {
  'm': 'https://images.icon-icons.com/343/PNG/512/Male_35764.png',
  'f': 'https://images.icon-icons.com/343/PNG/512/Female_35792.png',
  'o': 'https://images.icon-icons.com/72/PNG/256/contact_people_14393.png',
  'n': 'https://images.icon-icons.com/47/PNG/128/Errorstopoutput_error_parada_10120.png'
};

// Recorremos todos los radio buttons y les agregamos un evento para cambiar el avatar cuando se seleccionan.
generoRadios.forEach(radio => {
  radio.addEventListener('change', function () {
    avatarImg.src = avatarSources[this.value]; // Cambia la imagen del avatar
    avatarImg.style.filter = 'none';           // Quita el filtro de escala de grises
    avatarImg.style.opacity = '1';             // Hace la imagen totalmente visible
  });
});

function setupSectionToggle(linkSelector, sectionId, closeBtnId) {
  var link = document.querySelector(linkSelector);
  var section = document.getElementById(sectionId);
  var closeBtn = document.getElementById(closeBtnId);
  if (link && section && closeBtn) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      section.style.display = 'block';
      window.scrollTo({top: section.offsetTop, behavior: 'smooth'});
    });
    closeBtn.addEventListener('click', function() {
      section.style.display = 'none';
    });
  }
}

// Uso para cada sección:
setupSectionToggle('a[href="#ayuda"]', 'ayuda', 'cerrar-ayuda');
setupSectionToggle('a[href="#cursos"]', 'cursos', 'cerrar-cursos');
setupSectionToggle('a[href="#estudiantes"]', 'estudiantes', 'cerrar-estudiantes');
setupSectionToggle('a[href="#profesores"]', 'profesores', 'cerrar-profesores');
setupSectionToggle('a[href="#laboratorios"]', 'laboratorios', 'cerrar-laboratorios');