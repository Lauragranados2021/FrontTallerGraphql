const loadTable = () => {
    document.getElementById("table-body").innerHTML = "";
    document.getElementById("select-id").innerHTML = "";
    const optionDefault = document.createElement("option");
    optionDefault.value = "Seleccione un ID";
    optionDefault.innerText = "Seleccione un ID";
    document.getElementById("select-id").appendChild(optionDefault);
    fetch("http://localhost:3600", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: "{getBooks{ id title author{name},pages, year}}",
      }),
    })
      .then((datos) => datos.json())
      .then((datos) => {
          const select = document.getElementById("select-id");
        datos.data.getBooks.forEach((element) => {
          const row = document.createElement("tr");
          row.innerHTML = `
      <td>${element.id}</td>
      <td>${element.title}</td>
      <td>${element.author.name}</td>
      <td>${element.pages}</td>
      <td>${element.year}</td>
      `;
      const option = document.createElement("option");
      option.value = element.id;
      option.innerText = element.id;
      select.appendChild(option);
          document.getElementById("table-body").appendChild(row); 
        });
      })
  
      .catch((err) => console.log(err));
  };
  loadTable();
  function findById(){
      const selectedId = document.getElementById('select-id').value;
  fetch("http://localhost:3600",{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `{getBook(id:${selectedId}){title,author{name},pages,year}}`,
        }),
  })
  .then((datos) => datos.json())
  .then((data) => {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.data.getBook.id}</td>
        <td>${data.data.getBook.title}</td>
        <td>${data.data.getBook.author.name}</td>
        <td>${data.data.getBook.pages }</td>
        <td>${data.data.getBook.year }</td>
        `;
        tableBody.appendChild(row);
  })
  .catch((err) => console.log(err));
  }