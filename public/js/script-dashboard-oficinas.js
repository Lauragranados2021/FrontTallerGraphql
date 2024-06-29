const loadTable = () => {
    document.getElementById("table-body").innerHTML = "";
    document.getElementById("select-id").innerHTML = "";
    document.getElementById("selectEditar").innerHTML = "";
    const optionDefault = document.createElement("option");
    optionDefault.value = "Seleccione un ID";
    optionDefault.innerText = "Seleccione un ID";
    const optionDefaultEdit = document.createElement("option")
    optionDefault.value = "Seleccione un ID";
  optionDefault.innerText = "Seleccione un ID";
    document.getElementById("select-id").appendChild(optionDefault);
    optionDefaultEdit.value = "Seleccione un ID";
    optionDefaultEdit.innerText = "Seleccione un ID";
    document.getElementById("selectEditar").appendChild(optionDefaultEdit);
    fetch("https://back-taller-graphql.vercel.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: "{getOficinas{ id name direccion capacidad alquiler{id}}}",
      }),
    })
      .then((datos) => datos.json())
      .then((datos) => {
        const select = document.getElementById("select-id");
        const selectEditar = document.getElementById("selectEditar");
        datos.data.getOficinas.forEach((element) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.direccion}</td>
      <td>${element.capacidad}</td>
      <td><i class="bi bi-x-circle" data-value='${
                    element.id
                  }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;">
                  </i></td>`;
                  const option = document.createElement("option");
                  option.value = element.id;
                  option.innerText = element.id;
                  select.appendChild(option);
                  const optionEditar = document.createElement("option");
                  optionEditar.value =  element.id;
                  optionEditar.innerText =  element.id;
                  selectEditar.appendChild(optionEditar);
          document.getElementById("table-body").appendChild(row); 
        });
      })
  
      .catch((err) => console.log(err));
  };
  loadTable();
  function findById(){
    const selectedId = document.getElementById('select-id').value;
fetch("https://back-taller-graphql.vercel.app/graphql",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{getOficina(id:${selectedId}){name,alquiler{id},direccion,capacidad}}`,
      }),
})
.then((datos) => datos.json())
.then((data) => {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    const row = document.createElement('tr');
    row.innerHTML = `
     <td>${selectedId}</td>
      <td>${data.data.getOficina.name}</td>
      <td>${data.data.getOficina.direccion }</td>
      <td>${data.data.getOficina.capacidad }</td>
      <td><i class="bi bi-x-circle" data-value='${
                    selectedId
                  }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;">
                  </i></td>`;
      
      tableBody.appendChild(row);
})
.catch((err) => console.log(err));
}


const add= ()=>{
  const codeof = document.getElementById("code").value;
  const nameof = document.getElementById("nombre").value;
  const direccionof = document.getElementById("direccion").value;
  const capacidadof =parseInt( document.getElementById("capacidad").value);
  if(codeof === "" || nameof === "" || direccionof === "" || capacidadof === ""){
    alert("Todos los campos son requeridos");
  }
  else{
  let mutation=`mutation CreateOficina($createOficinaId: ID!, $name: String, $direccion: String, $capacidad: Int) {
  createOficina(id: $createOficinaId, name: $name, direccion: $direccion, capacidad: $capacidad) {
    id
    name
    direccion
    capacidad
    alquiler {
      id
    }
  }
}`
fetch("https://back-taller-graphql.vercel.app/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: mutation,
    variables: {
      createOficinaId: codeof,
      name: nameof,
      direccion: direccionof,
      capacidad: capacidadof,
    },
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.error) {
      const errorMessage = data.errors[0].message; // Asumiendo que siempre hay al menos un error
      alert(`Error: ${errorMessage}`);
    } else {
      loadTable();
      alert("Contrato agregada con éxito");
    }
  })
  .catch((error) => console.log(err.message));
}};

const  editing=()=>{
  // Obtén el ID de la oficina seleccionada
  const officeId = document.getElementById('selectEditar').value;
  // Hacer una petición a la API para obtener los detalles de la oficina con el código seleccionado
  fetch("https://back-taller-graphql.vercel.app/graphql",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{getOficina(id:${officeId}){name,alquiler{id},direccion,capacidad}}`,
      }),
})
.then(response => response.json())
.then(data => {
  // Si la petición es exitosa, limpiar la tabla y añadir una nueva fila con los detalles de la oficina

    document.getElementById('updatenombre').value = data.data.getOficina.name;
    document.getElementById('updatedireccion').value = data.data.getOficina.direccion;
    document.getElementById('updatecapacidad').value = data.data.getOficina.capacidad;
   
})
.catch(error => {
  // Si la petición falla, mostrar un mensaje de error
  console.log('Error:', error);
});
}
const edit=()=>{
  const i= document.getElementById("selectEditar").value;
 
  const nameof = document.getElementById("updatenombre").value;
  const direccionof = document.getElementById("updatedireccion").value;
  const capacidadof = parseInt(document.getElementById("updatecapacidad").value);
  if( nameof === "" || direccionof === "" || capacidadof === ""){
    alert("Todos los campos son requeridos");
    
  }
  console.log(i)
    let mutation=`mutation UpdateOficina($updateOficinaId: ID!, $name: String, $direccion: String, $capacidad: Int) {
  updateOficina(id: $updateOficinaId, name: $name, direccion: $direccion, capacidad: $capacidad) {
    id
    name
    direccion
    capacidad
    alquiler {
      id
    }
  }
}`
    
fetch(`https://back-taller-graphql.vercel.app/graphql`, {
  method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
  },
  body: JSON.stringify({
    query: mutation,
    variables: {
      updateOficinaId: i,
      name: nameof,
      direccion: direccionof,
      capacidad: capacidadof,
    },
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
   
      if (data.error) {
        const errorMessage = data.errors[0].message; // Asumiendo que siempre hay al menos un error
        alert(`Error: ${errorMessage}`);
      } else {

      loadTable();
     
      document.getElementById('updatenombre').value = "";
      document.getElementById('updatedireccion').value = "";
      document.getElementById('updatecapacidad').value = "";
      alert("Oficina actalizada con éxito");
    
  }
  })
  .catch((error) => {
    console.error("Error al realizar la petición:", error);
    alert("Error al realizar la petición");
  });


}
const drop=(id)=>{
  let mutation=`mutation DeleteOficina($deleteOficinaId: ID!) {
  deleteOficina(id: $deleteOficinaId) {
    id
    name
    direccion
    capacidad
    alquiler {
      id
    }
  }
}`
  fetch(`https://back-taller-graphql.vercel.app/graphql`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: mutation,
      variables: {deleteOficinaId : id },
    }),
  })
    .then((respuesta) => respuesta.json())
    .then((result) => {
      alert("oficina eliminada");
      loadTable()
    })
    .catch((error) => alert(error));
  
}