// Función para validar los ingresos de TEXTO en el formulario!!
function validadorTexto(texto){
    if (texto.length == 0){
        swal("ERROR..!!", "Debe completar los datos....", "warning");
        textoSinErrores = false;
    } 
    else{    
        for(let i = 0; i < texto.length; i++){
            let codigoAscii = texto.charCodeAt(i);
            if(codigoAscii < 65 || codigoAscii > 90){
                if((codigoAscii <97 || codigoAscii > 122)){
                    if(codigoAscii != 32){
                        swal("ERROR!!", "Recuerde que no debe ingresar signos y/o acentos...", "warning");
                        textoSinErrores = false;
                    }
                }
            }
        }
        return textoSinErrores;
    }
};


// Función para validar los ingresos de NÚMEROS en el formulario!!
function validadorNumero(numero){
    if (numero.length == 0){
        swal("ERROR..!!", "Debe completar todos los renglones...", "warning");
        numeroSinErrores = false;
    } 
    else{    
        for(let i = 0; i < numero.length; i++){
            let codigoAscii = numero.charCodeAt(i);
            if(codigoAscii < 48 || codigoAscii > 57){
                if(codigoAscii != 46){
                    swal("ERROR!!", "Recuerde que solo debe ingresar números", "warning");
                    numeroSinErrores = false;
                }
            }
        }
        return numeroSinErrores;
    }
};


// Evento para GUARDAR nuevos pacientes en el localStorage!!
formPacientes.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombre = document.getElementById('idNombre').value; 
    let peso = document.getElementById('idPeso').value;
    let altura = document.getElementById('idAltura').value; 
    let enfermedades = document.getElementById('idEnfermedades').value;
    let imc = (peso / (altura*altura)).toFixed(2);
    validadorTexto(nombre);
    validadorNumero(peso);
    validadorNumero(altura);
    validadorTexto(enfermedades);
    if (textoSinErrores == true && numeroSinErrores == true){
        const paciente = new Paciente(nombre, peso, altura, enfermedades, imc);
        pacientes.push(paciente);
        localStorage.setItem('Pacientes', JSON.stringify(pacientes));
        swal("Nuevo paciente...", "...agregado con éxito", "success");
        formPacientes.reset();
        idNombre.focus();
    } else {
        swal("ERROR!!!", "Revise alguno de los campos", "warning");
    }
});


// Evento para MOSTRAR los pacientes en cards!!
botonMostrar.addEventListener('click', () => {
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
        `  
        idNombre.focus();
    });

    // Evento para ELIMINAR, individualemte, a los pacientes!!
    pacientes.forEach((pacientesEnArray, indice) => {
        document.getElementById(`boton${indice}`).addEventListener('click', () => {
            divPacientes.removeChild(document.getElementById(`paciente${indice}`));
            let indiceArray = pacientes.findIndex(paciente => paciente.nombre == pacientesEnArray.nombre);
            pacientes.splice(indiceArray,1);
            localStorage.setItem('Pacientes', JSON.stringify(pacientes));
            swal("Eliminado!!", "Paciente eliminado de la base de datos", "warning");
        });
     });
 });