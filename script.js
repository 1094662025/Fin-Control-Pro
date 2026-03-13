// Obtener el formulario
const form = document.getElementById("registroForm");
 
// Obtener los campos de contraseña
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
 
// Obtener el lugar donde aparecerá el mensaje
const mensaje = document.getElementById("mensajeError");
 
// Evento cuando se envía el formulario
form.addEventListener("submit", function(e){
 
// Evita que la página se recargue
e.preventDefault();
 
// Verifica si las contraseñas son diferentes
if(password.value !== confirmPassword.value){
 
// Mostrar mensaje de error
mensaje.textContent = "⚠ Las contraseñas no coinciden";
mensaje.style.color = "red";
 
}else{
 
// Limpiar mensaje de error
mensaje.textContent = "";
 
// Mostrar popup de éxito
document.getElementById("popup").style.display="flex";
 
}
 
});
 
// Función para cerrar el popup
function cerrarPopup(){
 
document.getElementById("popup").style.display="none";
 
// Limpia los campos del formulario
form.reset();
 
}
 
// Función para mostrar u ocultar contraseña
function mostrarPassword(){
 
if(password.type === "password"){
 
password.type="text";
confirmPassword.type="text";
 
}else{
 
password.type="password";
confirmPassword.type="password";
 
}
 
}