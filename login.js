const formulario = document.getElementById("formularioLogin");
const correo = document.getElementById("correo");
const contra = document.getElementById("contrasena");
const mensaje = document.getElementById("mensaje");
const botonMostrar = document.getElementById("botonMostrar");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  mensaje.classList.remove("correcto");

  if (!correo.value.trim() || !contra.value) {
    mensaje.textContent = "Escribe tu correo y contraseña.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
    mensaje.textContent = "Escribe un correo electrónico válido.";
    correo.focus();
    return;
  }

  if (contra.value.length < 8 || contra.value.length > 64) {
    mensaje.textContent = "Laeña d contrasebe tener de 8 a 64 caracteres.";
    contra.focus();
    return;
  }

  mensaje.textContent = "Formato validado.";
  mensaje.classList.add("correcto");
});

botonMostrar.addEventListener("click", () => {
  const mostrar = contra.type === "password";
  contra.type = mostrar ? "text" : "password";
  botonMostrar.textContent = mostrar ? "Ocultar" : "Mostrar";
  botonMostrar.setAttribute(
    "aria-label",
    mostrar ? "Ocultar contraseña" : "Mostrar contraseña"
  );
});
