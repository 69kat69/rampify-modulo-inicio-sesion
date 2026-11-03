// variables pa
var ay = document.getElementById("formularioLogin");
var minipekka = document.getElementById("correo");
var pekka = document.getElementById("contrasena");

// enseña mensaje y el otro oculta o no la vista de este
var mk = document.getElementById("mensaje");
var danirep = document.getElementById("botonMostrar");

// correo formato permitido
function validarCorreo(correo) {
  var formatoCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (correo.length > 254) {
    return "El correo no puede tener más de 254 caracteres.";
  }

  if (!formatoCorreo.test(correo) || correo.includes("..")) {
    return "Escribe un correo válido. Usa letras, números y . _ % + - antes del @.";
  }

  return "";
}

// longitudes de la contra
function validarContra(contrasena) {
  var caracteresNoPermitidos = /[\s\u0000-\u001F\u007F]/;

  if (contrasena.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  if (contrasena.length > 72) {
    return "La contraseña no puede tener más de 72 caracteres.";
  }

  if (caracteresNoPermitidos.test(contrasena)) {
    return "La contraseña puede usar letras, números y símbolos, pero no espacios.";
  }

  return "";
}

// resultado abajo del formulario
function mostrarMensaje(texto, esCorrecto) {
  mk.textContent = texto;
  mk.classList.remove("correcto");

  if (esCorrecto) {
    mk.classList.add("correcto");
  }
}

// validacion
function iniciarSesion(evento) {
  evento.preventDefault();
  mostrarMensaje("", false);

  var correo = minipekka.value.trim();
  var contrasena = pekka.value;
  var errorCorreo = validarCorreo(correo);

  if (correo === "") {
    mostrarMensaje("Escribe tu correo electrónico.", false);
    minipekka.focus();
    return;
  }

  if (errorCorreo !== "") {
    mostrarMensaje(errorCorreo, false);
    minipekka.focus();
    return;
  }

  if (contrasena === "") {
    mostrarMensaje("Escribe tu contraseña.", false);
    pekka.focus();
    return;
  }

  var errorContrasena = validarContrasena(contrasena);
  if (errorContrasena !== "") {
    mostrarMensaje(errorContrasena, false);
    pekka.focus();
    return;
  }

  mostrarMensaje("El formato es correcto. Esta versión todavía no comprueba la cuenta.", true);
}

// ayudaa mostrar o no la contra
function cambiarVisibilidadContrasena() {
  if (pekka.type === "password") {
    pekka.type = "text";
    danirep.textContent = "Ocultar";
    danirep.setAttribute("aria-label", "Ocultar contraseña");
  } else {
    pekka.type = "password";
    danirep.textContent = "Mostrar";
    danirep.setAttribute("aria-label", "Mostrar contraseña");
  }
}

// botones on funciones
ay.addEventListener("submit", iniciarSesion);
danirep.addEventListener("click", cambiarVisibilidadContrasena);
