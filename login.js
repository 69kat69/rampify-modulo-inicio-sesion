// variables pa
var ay = document.getElementById("formularioLogin");
var minipekka = document.getElementById("correo");
var pekka = document.getElementById("contrasena");

// enseña mensaje y el otro oculta o no la vista de este
var mk = document.getElementById("mensaje");
var danirep = document.getElementById("botonMostrar");

// correo formato permitido
function validarCorreo(correo) {
  if (correo.length > 254) {
    return "El correo no puede tener más de 254 caracteres.";
  }

  var partesCorreo = correo.split("@");
  if (partesCorreo.length !== 2) {
    return "El correo debe tener un solo @.";
  }

  var nombreUsuario = partesCorreo[0];
  var dominio = partesCorreo[1];

  if (nombreUsuario === "") {
    return "Escribe un nombre antes del @. No basta con @gmail.com.";
  }

  if (nombreUsuario.length > 64) {
    return "La parte anterior al @ no puede tener más de 64 caracteres.";
  }

  var caracteresUsuario = /^[A-Za-z0-9._%+-]+$/;
  if (!caracteresUsuario.test(nombreUsuario)) {
    return "Antes del @ usa letras, números o estos signos: . _ % + -";
  }

  if (nombreUsuario.startsWith(".") || nombreUsuario.endsWith(".") || nombreUsuario.includes("..")) {
    return "El nombre del correo no puede empezar, terminar ni repetir puntos.";
  }

  if (!/[A-Za-z]/.test(nombreUsuario)) {
    return "El correo debe incluir al menos una letra antes del @; no puede ser solo un número.";
  }

  var partesDominio = dominio.split(".");
  if (partesDominio.length < 2) {
    return "El dominio debe incluir un nombre y una terminación, como gmail.com.";
  }

  var caracteresDominio = /^[A-Za-z0-9-]+$/;
  for (var i = 0; i < partesDominio.length; i++) {
    var parte = partesDominio[i];

    if (parte === "" || parte.length > 63 || !caracteresDominio.test(parte)) {
      return "Revisa el dominio: no dejes puntos seguidos ni guiones al inicio o al final.";
    }

    if (parte.startsWith("-") || parte.endsWith("-")) {
      return "Las partes del dominio no pueden empezar ni terminar con guion.";
    }
  }

  var terminacion = partesDominio[partesDominio.length - 1];
  if (!/^[A-Za-z]{2,}$/.test(terminacion)) {
    return "La terminación del dominio debe tener al menos dos letras, como .com.";
  }

  return "";
}

// longitudes de la contra
function validarContra(contrasena) {
  var caracteresNoPermitidos = /[\s\u0000-\u001F\u007F]/;
  var esNumeroNegativo = /^-\d+(?:[.,]\d+)?$/.test(contrasena);
  var esNumeroDecimal = /^\d+[.,]\d+$/.test(contrasena);

  if (contrasena.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  if (contrasena.length > 72) {
    return "La contraseña no puede tener más de 72 caracteres.";
  }

  if (caracteresNoPermitidos.test(contrasena)) {
    return "La contraseña puede usar letras, números y símbolos, pero no espacios.";
  }

  if (esNumeroNegativo || esNumeroDecimal) {
    return "La contraseña no puede ser un número negativo ni decimal.";
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
