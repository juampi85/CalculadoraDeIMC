// Aquí limito las posibilidades de ingreso únicamente a letras (mayúsculas y minúsculas)
function soloTexto(input) {
  let texto = /[^a-z, A-Z]/gi;
  input.value = input.value.replace(texto, "");
}

//Aquí agrego una limitación para que solo se puedan agregar números (y el punto separador de decimales)
function soloNumeros(input) {
  let numero = /[^0-9, .]/gi;
  input.value = input.value.replace(numero, "");
}

// Esta limitación la hago desde acá (pero la de "ESTADO ACTUAL DE SALUD" la hago desde el mismo HTML). Ambas funcionan igual.
document.getElementById("idNombre").onkeyup = function () {
  soloTexto(this);
};

// Esta limitación la hago desde acá (pero la de "ALTURA" la hago desde el mismo HTML). Ambas funcionan igual.
document.getElementById("idPeso").onkeyup = function () {
  soloNumeros(this);
};

// Evento para GUARDAR nuevos pacientes en el localStorage!!
formPacientes.addEventListener("submit", (e) => {
  e.preventDefault();
  let nombre = document.getElementById("idNombre").value;
  let peso = document.getElementById("idPeso").value;
  let altura = document.getElementById("idAltura").value;
  let enfermedades = document.getElementById("idEnfermedades").value;
  let imc = (peso / (altura * altura)).toFixed(2);
  const paciente = new Paciente(nombre, peso, altura, enfermedades, imc);
  swal({
    title: "Los datos del nuevo paciente son correctos?",
    text: "Si son correctos apriete Ok",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((crearNuevoPaciente) => {
    if (crearNuevoPaciente) {
      pacientes.push(paciente);
      localStorage.setItem("Pacientes", JSON.stringify(pacientes));
      swal({
        text: "El nuevo paciente se guardó correctamente.",
        icon: "success",
        buttons:false ,
        timer:1500,
    });
    } else {
        swal({
            text: "El paciente, finalmente, no se guardó.",
            icon: "error",
            buttons:false ,
            timer:1500,
        });

    }
  });
  formPacientes.reset();
  idNombre.focus();
});

// Evento para MOSTRAR los pacientes en cards!!
botonMostrar.addEventListener("click", () => {
  divPacientes.innerHTML = "";

  pacientes.forEach((pacientesEnArray, indice) => {
    divPacientes.innerHTML += `
            <div id="paciente${indice}" class="card border-secondary mb-3" style="max-width: 20rem;margin:10px">
                <div class="card-header"><h4 class="nombre-card">Paciente ${pacientesEnArray.nombre}</h4></div>
                    <div class="card-body">
                        <p class="card-title">Peso: ${pacientesEnArray.peso}</p>
                        <p class="card-title">Altura: ${pacientesEnArray.altura}</p>
                        <p class="card-title">Enfermedades: ${pacientesEnArray.enfermedades}</p>
                        <p class="card-title">IMC: ${pacientesEnArray.imc}</p>
                        <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
                    </div>
                </div>
        `;
    idNombre.focus();
  });

  // Evento para ELIMINAR, individualemte, a los pacientes!!
  pacientes.forEach((pacientesEnArray, indice) => {
    document.getElementById(`boton${indice}`).addEventListener("click", () => {
        swal({
            title: `Estás seguro de eliminar a ${pacientesEnArray.nombre}?`,
            text: "Una vez eliminado NO se podrán recuperar sus datos.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((borrarPacienteIndividual) => {
            if (borrarPacienteIndividual) {
                divPacientes.removeChild(document.getElementById(`paciente${indice}`));
                let indiceArray = pacientes.findIndex(
                  (paciente) => paciente.nombre == pacientesEnArray.nombre
                );
                pacientes.splice(indiceArray, 1);
                localStorage.setItem("Pacientes", JSON.stringify(pacientes));
              swal(`Hecho!! ${pacientesEnArray.nombre} ya es solo un recuerdo...`, {
                icon: "success",
              });
            } else {
              swal(`Perfecto, ${pacientesEnArray.nombre} y sus ${pacientesEnArray.peso} kilos seguirán en nuestra base de datos`);
            }
          });
    });
  });
});