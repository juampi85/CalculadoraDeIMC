let pacientes = [];
let formPacientes = document.getElementById('formPacientes');
let botonPacientes = document.getElementById('botonPacientes');
let divPacientes = document.getElementById('divPacientes');

if(localStorage.getItem('Pacientes')) {
    pacientes = JSON.parse(localStorage.getItem('Pacientes'));
} else {
    localStorage.setItem('Pacientes', JSON.stringify(pacientes));
}