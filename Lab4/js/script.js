document.querySelector('form').addEventListener('submit', function(e) {
  const emailInput = document.getElementById('email');
  const errorSpan = document.getElementById('email-error');
  if (!emailInput.value.includes('@')) {
    e.preventDefault();
    errorSpan.style.display = 'inline';
    emailInput.focus();
  } else {
    errorSpan.style.display = 'none';
  }
});

// Función para cambiar filtro y opacidad según el checkbox
function toggleInterestImage(checkboxId, imgId) {
  document.getElementById(checkboxId).addEventListener('change', function() {
    const img = document.getElementById(imgId);
    if (img) {
      if (this.checked) {
        img.style.filter = 'none';
        img.style.opacity = '1';
      } else {
        img.style.filter = 'grayscale(1)';
        img.style.opacity = '0.2';
      }
    }
  });
}

toggleInterestImage('interes1', 'img-programacion');
toggleInterestImage('interes2', 'img-diseno');
toggleInterestImage('interes3', 'img-marketing');
toggleInterestImage('interes4', 'img-ciencia');
toggleInterestImage('interes5', 'img-basketball');
toggleInterestImage('interes6', 'img-musica');
toggleInterestImage('interes7', 'img-starwars');

// Cambia el avatar según el género seleccionado
const generoRadios = document.getElementsByName('genero');
const avatarImg = document.getElementById('img-avatar-genero');
const avatarSources = {
  'm': 'https://images.icon-icons.com/343/PNG/512/Male_35764.png',
  'f': 'https://images.icon-icons.com/343/PNG/512/Female_35792.png',
  'o': 'https://images.icon-icons.com/72/PNG/256/contact_people_14393.png',
  'n': 'https://images.icon-icons.com/47/PNG/128/Errorstopoutput_error_parada_10120.png'
};

generoRadios.forEach(radio => {
  radio.addEventListener('change', function () {
    avatarImg.src = avatarSources[this.value];
    avatarImg.style.filter = 'none';
    avatarImg.style.opacity = '1';
  });
});