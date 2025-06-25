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

document.addEventListener('DOMContentLoaded', function() {
  // Ayuda
  var ayudaLink = document.querySelector('a[href="#ayuda"]');
  var ayudaSection = document.getElementById('ayuda');
  var cerrarAyuda = document.getElementById('cerrar-ayuda');
  if (ayudaLink && ayudaSection && cerrarAyuda) {
    ayudaLink.addEventListener('click', function(e) {
      e.preventDefault();
      ayudaSection.style.display = 'block';
      window.scrollTo({top: ayudaSection.offsetTop, behavior: 'smooth'});
    });
    cerrarAyuda.addEventListener('click', function() {
      ayudaSection.style.display = 'none';
    });
  }
  // Cursos
  var cursosLink = document.querySelector('a[href="#cursos"]');
  var cursosSection = document.getElementById('cursos');
  var cerrarCursos = document.getElementById('cerrar-cursos');
  if (cursosLink && cursosSection && cerrarCursos) {
    cursosLink.addEventListener('click', function(e) {
      e.preventDefault();
      cursosSection.style.display = 'block';
      window.scrollTo({top: cursosSection.offsetTop, behavior: 'smooth'});
    });
    cerrarCursos.addEventListener('click', function() {
      cursosSection.style.display = 'none';
    });
  }
  // Estudiantes
  var estudiantesLink = document.querySelector('a[href="#estudiantes"]');
  var estudiantesSection = document.getElementById('estudiantes');
  var cerrarEstudiantes = document.getElementById('cerrar-estudiantes');
  if (estudiantesLink && estudiantesSection && cerrarEstudiantes) {
    estudiantesLink.addEventListener('click', function(e) {
      e.preventDefault();
      estudiantesSection.style.display = 'block';
      window.scrollTo({top: estudiantesSection.offsetTop, behavior: 'smooth'});
    });
    cerrarEstudiantes.addEventListener('click', function() {
      estudiantesSection.style.display = 'none';
    });
  }
  // Profesores
  var profesoresLink = document.querySelector('a[href="#profesores"]');
  var profesoresSection = document.getElementById('profesores');
  var cerrarProfesores = document.getElementById('cerrar-profesores');
  if (profesoresLink && profesoresSection && cerrarProfesores) {
    profesoresLink.addEventListener('click', function(e) {
      e.preventDefault();
      profesoresSection.style.display = 'block';
      window.scrollTo({top: profesoresSection.offsetTop, behavior: 'smooth'});
    });
    cerrarProfesores.addEventListener('click', function() {
      profesoresSection.style.display = 'none';
    });
  }
});