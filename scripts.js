// scripts.js
// Add all custom JavaScript for the site here.



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
			});
		});
	}
});

