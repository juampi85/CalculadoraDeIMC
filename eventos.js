formPacientes.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombre = document.getElementById('idNombre').value; 
    let peso = document.getElementById('idPeso').value;
    let altura = document.getElementById('idAltura').value; 
    let enfermedades = document.getElementById('idEnfermedades').value;
    let imc = (peso / (altura*altura)).toFixed(2);
    const paciente = new Paciente(nombre, peso, altura, enfermedades, imc);
    pacientes.push(paciente);
    localStorage.setItem('Pacientes', JSON.stringify(pacientes));
    // adicionarPacienteEnLaTabla (paciente);
    formPacientes.reset();
    idNombre.focus();
});
botonMostrar.addEventListener('click', () => {
    divPacientes.innerHTML = "";

    pacientes.forEach((pacientesEnArray, indice) => {
     // Matias, quise hacer que, con cada paciente, se generara una nueva fila de la tabla, pero NO logré ni que la fila
     // de encabezados apareciera una sola vez ni logré poder colocar un botón, por fila, para eliminar dicha fila (valga
     // la redundancia). Por ello tuve que recurrir a la vieja y conocida CARD.
     // Dejo el código con el cual intenté hacer las filas y NO ME SALIÓ!!

     
        // divPacientes.innerHTML += `
        // <table class="table table-hover">
        //     <thead class="encabezado-pacientes">
        //         <tr>
        //             <th scope="col">Nombre</th>
        //             <th scope="col">Peso</th>
        //             <th scope="col">Altura</th>
        //             <th scope="col">Enfermedades actuales</th>
        //             <th scope="col">IMC</th>
        //         </tr>
        //     </thead>
        //     <tbody id ="tablaPacientes">
        //         <tr class="table-active">
        //             <td>${pacientesEnArray.nombre}</td>
        //             <td>${pacientesEnArray.peso} kgs</td>
        //             <td>${pacientesEnArray.altura} mts</td>
        //             <td>${pacientesEnArray.enfermedades}</td>
        //             <td>${pacientesEnArray.imc}</td>
        //         </tr>
        //     </tbody>
        // </table>      
        // `
    
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

    pacientes.forEach((pacientesEnArray, indice) => {
        document.getElementById(`boton${indice}`).addEventListener('click', () => {
            divPacientes.removeChild(document.getElementById(`paciente${indice}`));
            let indiceArray = pacientes.findIndex(paciente => paciente.nombre == pacientesEnArray.nombre);
            pacientes.splice(indiceArray,1);
            localStorage.setItem('Pacientes', JSON.stringify(pacientes));
        });
     });
 });