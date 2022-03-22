let pacientes = [];
let formPacientes = document.getElementById('formPacientes');
let botonPacientes = document.getElementById('botonPacientes');
let divPacientes = document.getElementById('divPacientes');



// PRUEBAAAAAAAAAAAAAAAAAAAAAAAAAAA para validación de campos
let textoSinErrores = true;
let numeroSinErrores = true;


// acá reemplacé mi "if" para poder utilizar el operador ternario
localStorage.getItem('Pacientes') ? pacientes = JSON.parse(localStorage.getItem('Pacientes')) : localStorage.setItem('Pacientes', JSON.stringify(pacientes))
