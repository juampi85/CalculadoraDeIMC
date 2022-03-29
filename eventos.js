// Evento para MOSTRAR los pacientes en cards CON ASYNC y AWAIT
async function cargarPacientes() {
  let promesa = await fetch('./json/pacientes.json');
  let pacientesJSON = await promesa.json();
  return pacientesJSON;
};

botonMostrar.addEventListener('click', () => {
  divPacientes.innerHTML ="";
  cargarPacientes().then( data => {
    data.forEach((paciente, indice) => {
        divPacientes.innerHTML += `
        <div class="card" id="paciente: ${indice}" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${paciente.nombre}</h5>
          <p class="card-text">Peso: ${paciente.peso}kgs</p>
          <p class="card-text">Altura: ${paciente.altura}mts</p>
          <p class="card-text">Enf.: ${paciente.enfermedades}</p>
          <p class="card-text">IMC: ${paciente.IMC}</p>
        </div>
      </div>
        `
    });
  });
});

// Para eliminar las cards
botonBorrar.addEventListener("click", () => {
  divPacientes.innerHTML = "";
});