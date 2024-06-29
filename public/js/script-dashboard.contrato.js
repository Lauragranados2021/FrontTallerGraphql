var oficinaID;
const loadTable = () => {
  document.getElementById("table-body").innerHTML = "";
  document.getElementById("select-id").innerHTML = "";
  document.getElementById("selectEditar").innerHTML = "";
  const optionDefault = document.createElement("option");
  const optionDefaultEdit = document.createElement("option");
  optionDefault.value = "Seleccione un ID";
  optionDefault.innerText = "Seleccione un ID";
  document.getElementById("select-id").appendChild(optionDefault);
  optionDefaultEdit.value = "Seleccione un ID";
  optionDefaultEdit.innerText = "Seleccione un ID";
  document.getElementById("selectEditar").appendChild(optionDefaultEdit);

  let query = `query getOficinas {
        getOficinas {
          name
          id
          capacidad
          direccion
          alquiler {
            id
            ContractStartDate
            ContractEndDate
            price
          }
        }
      }`;

  fetch("https://back-taller-graphql.vercel.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((datos) => datos.json())
    .then((datos) => {
      const selectOficina = document.getElementById("selectOficina");
      const selectOficinaUpdate = document.getElementById(
        "selectOficinaUpdate"
      );
      const select = document.getElementById("select-id");
      datos.data.getOficinas.forEach((oficina) => {
        oficina.alquiler.forEach((alquileres) => {
          oficinaID = oficina.id;
          console.log(oficinaID);
          const row = document.createElement("tr");
          row.innerHTML = `
            
        <td>${alquileres.id}</td>
    <td>${
      new Date(parseInt(alquileres.ContractStartDate))
        .toISOString()
        .split("T")[0]
    }</td>
<td>${
            new Date(parseInt(alquileres.ContractEndDate))
              .toISOString()
              .split("T")[0]
          }</td>
        <td>${alquileres.price}</td>
        <td>${oficina.name}</td>
        <td><i class="bi bi-x-circle" data-value='${
          alquileres.id
        }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;">
                    </i></td>`;

          const option = document.createElement("option");
          option.value = alquileres.id;
          option.innerText = alquileres.id;
          select.appendChild(option);
          const optionEditar = document.createElement("option");
          optionEditar.value = alquileres.id;
          optionEditar.innerText = alquileres.id;
          selectEditar.appendChild(optionEditar);

          document.getElementById("table-body").appendChild(row);
        });
      });
    })
    .catch((err) => console.log(err));
};
loadTable();
const cargarOficinas = () => {
  document.getElementById("selectOficina").innerHTML = "";
  document.getElementById("selectOficinaUpdate").innerHTML = "";
  const optionDefaultOficina = document.createElement("option");
  const optionDefaultOficinaUpdate = document.createElement("option");
  optionDefaultOficina.value = "Seleccione un ID";
  optionDefaultOficina.innerText = "Seleccione un ID";
  document.getElementById("selectOficina").appendChild(optionDefaultOficina);
  optionDefaultOficinaUpdate.value = "Seleccione un ID";
  optionDefaultOficinaUpdate.innerText = "Seleccione un ID";
  document
    .getElementById("selectOficinaUpdate")
    .appendChild(optionDefaultOficinaUpdate);
  let query = `query getOficinas {
      getOficinas {
        name
        id
        capacidad
        direccion
        alquiler {
          id
          ContractStartDate
          ContractEndDate
          price
        }
      }
    }`;

  fetch("https://back-taller-graphql.vercel.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((datos) => datos.json())
    .then((datos) => {
      const selectOficina = document.getElementById("selectOficina");
      const selectOficinaUpdate = document.getElementById(
        "selectOficinaUpdate"
      );
      const select = document.getElementById("select-id");
      datos.data.getOficinas.forEach((oficina) => {
        const optionOficina = document.createElement("option");
        optionOficina.value = oficina.id;
        optionOficina.innerText = oficina.name;
        selectOficina.appendChild(optionOficina);
        const optionOficinaUpdate = document.createElement("option");
        optionOficinaUpdate.value = oficina.id;
        optionOficinaUpdate.innerText = oficina.name;
        selectOficinaUpdate.appendChild(optionOficinaUpdate);
      });
    });
};
cargarOficinas();
function findById() {
  const selectedId = document.getElementById("select-id").value;
  let query = `query getOficinas {
    getOficinas {
      name
      id
      capacidad
      direccion
      alquiler {
        id
        ContractStartDate
        ContractEndDate
        price
      }
    }
  }`;

  fetch("https://back-taller-graphql.vercel.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((datos) => datos.json())
    .then((datos) => {
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = "";
      datos.data.getOficinas.forEach((oficina) => {
        oficina.alquiler.forEach((alquileres) => {
          if (alquileres.id == selectedId) {
            const row = document.createElement("tr");
            row.innerHTML = `
        
    <td>${alquileres.id}</td>
<td>${
              new Date(parseInt(alquileres.ContractStartDate))
                .toISOString()
                .split("T")[0]
            }</td>
<td>${
              new Date(parseInt(alquileres.ContractEndDate))
                .toISOString()
                .split("T")[0]
            }</td>
    <td>${alquileres.price}</td>
    <td>${oficina.name}</td>
    <td><i class="bi bi-x-circle" data-value='${
      alquileres.id
    }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;">
                </i></td>`;
            document.getElementById("table-body").appendChild(row);
          }
        });
      });
    })
    .catch((err) => console.log(err));
}
const add = () => {
  const codeof = document.getElementById("code").value;
  const inicio = document.getElementById("inicio").value;
  const fin = document.getElementById("fin").value;
  const price = parseInt(document.getElementById("precio").value);
  const oficina = document.getElementById("selectOficinaUpdate").value;
  if (!codeof || !inicio || !fin || isNaN(price) || !oficina) {
    alert(
      "Todos los campos son obligatorios y el precio debe ser un número válido."
    );
  } else {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    if (fechaFin >= fechaInicio) {
      let mutation = `mutation CreateAlquiler($createAlquilerId: ID!, $contractStartDate: String, $contractEndDate: String, $price: Int, $iDoficina: ID) {
    createAlquiler(id: $createAlquilerId, ContractStartDate: $contractStartDate, ContractEndDate: $contractEndDate, price: $price, IDoficina: $iDoficina) {
      id
      ContractStartDate
      ContractEndDate
      price
    }
    }`;

      fetch(`https://back-taller-graphql.vercel.app/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            createAlquilerId: codeof,
            contractStartDate: inicio,
            contractEndDate: fin,
            price: price,
            iDoficina: oficina,
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
            document.getElementById("code").value = "";
            document.getElementById("inicio").value = "";
            document.getElementById("fin").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("selectOficinaUpdate").value = "";
          }
        })
        .catch((error) => {
          console.error("Error al realizar la petición:", error);
          alert("Error al realizar la petición");
        });
    } else {
      alert("la fecha de fin debe ser mayor que la fecha de inicio");
    }
  }
};
const editing = () => {
  // Obtén el ID de la oficina seleccionada
  const alquiler = document.getElementById("selectEditar").value;

  let query = `query getOficinas {
      getOficinas {
        name
        id
        capacidad
        direccion
        alquiler {
          id
          ContractStartDate
          ContractEndDate
          price
        }
      }
    }`;

  fetch("https://back-taller-graphql.vercel.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((datos) => datos.json())
    .then((datos) => {
      datos.data.getOficinas.forEach((oficina) => {
        oficina.alquiler.forEach((alquileres) => {
          if (alquileres.id == alquiler) {
            let startDate = new Date(parseInt(alquileres.ContractStartDate));
            let formattedStartDate =
              startDate.toISOString().split("T")[0] + "T00:00";

            let endDate = new Date(parseInt(alquileres.ContractEndDate));
            let formattedEndDate =
              endDate.toISOString().split("T")[0] + "T00:00";

            // Si la petición es exitosa, limpiar la tabla y añadir una nueva fila con los detalles de la oficina
            document.getElementById("updatecode").value = alquileres.id;
            document.getElementById("updateinicio").value = formattedStartDate;
            document.getElementById("updatefin").value = formattedEndDate;
            document.getElementById("updateprecio").value = alquileres.price;
            document.getElementById("selectOficina").value = oficina.name;
          }
        });
      });
    })
    .catch((error) => {
      // Si la petición falla, mostrar un mensaje de error
      console.log("Error:", error);
    });
};
const edit = () => {
  const i = document.getElementById("selectEditar").value;
  const codeof = document.getElementById("updatecode").value;
  const inicio = document.getElementById("updateinicio").value;
  const fin = document.getElementById("updatefin").value;
  const precio = parseInt(document.getElementById("updateprecio").value);
  const oficinas = document.getElementById("selectOficina").value;
  console.log(oficinas);
  if (!codeof || !inicio || !fin || isNaN(precio) || !oficinas) {
    alert(
      "Todos los campos son obligatorios y el precio debe ser un número válido."
    );
  } else {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    if (fechaFin >= fechaInicio) {
      let mutation = `mutation ($updateAlquilerId: ID!, $contractStartDate: String, $contractEndDate: String, $price: Int, $iDoficina: ID) {
    updateAlquiler(id: $updateAlquilerId, ContractStartDate: $contractStartDate, ContractEndDate: $contractEndDate, price: $price, IDoficina: $iDoficina) {
      id
      ContractStartDate
      ContractEndDate
      price
    }
  }`;

      fetch(`https://back-taller-graphql.vercel.app/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            updateAlquilerId: codeof,
            contractStartDate: inicio,
            contractEndDate: fin,
            price: precio,
            iDoficina: oficinas,
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
            document.getElementById("updatecode").value = "";
            document.getElementById("updateinicio").value = "";
            document.getElementById("updatefin").value = "";
            document.getElementById("updateprecio").value = "";
            document.getElementById("selectOficina").value = "";
            alert("Contrato actalizada con éxito");
          }
        })
        .catch((error) => {
          console.error("Error al realizar la petición:", error);
          alert("Error al realizar la petición");
        });
    } else {
      alert("la fecha de fin es menor a la fecha de inicio ");
    }
  }
};
const drop = (id) => {
  let mutation = `mutation DeleteAlquiler($deleteAlquilerId: ID!) {
  deleteAlquiler(id: $deleteAlquilerId) {
    id
    ContractStartDate
    ContractEndDate
    price
  }
}`;
  fetch(`https://back-taller-graphql.vercel.app/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: mutation,
      variables: { deleteAlquilerId: id },
    }),
  })
    .then((respuesta) => respuesta.json())
    .then((result) => {
      alert("contrato eliminado");
      loadTable();
    })
    .catch((error) => alert(error));
};
