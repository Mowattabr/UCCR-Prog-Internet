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
          alert('¡Registro exitoso!');
          form.reset();
          // Reset avatar to default
          var avatar = document.getElementById('img-avatar-genero');
          if (avatar) {
            avatar.src = 'images/Male_35764.png';
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
    m: 'images/Male_35764.png',
    f: 'images/Female_35792.png',
    o: 'images/gender_sex_icon_131294.png',
    n: 'images/incognito_icon_135478.png'
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
});