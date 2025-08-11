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