window.onload = function () {  
  let tbodyUsers = document.getElementById('table_usuarios');
  let tbodyTrainers = document.getElementById('table_entrenadores');

  fillTables(tbodyUsers, 'https://62a78a54bedc4ca6d7ca9dad.mockapi.io/usuario');
  fillTables(tbodyTrainers, 'https://62a78a54bedc4ca6d7ca9dad.mockapi.io/entrenadores');
}

function fillTables(table, endPoint) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', endPoint);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let respuesta = JSON.parse(xhr.responseText);
      table.innerHTML = '';
      respuesta.forEach(user => {        
          let tr = document.createElement('tr');
          let tdId = document.createElement('td');
          let tdNombre = document.createElement('td');
          let tdPrimerApellido = document.createElement('td');
          let tdSegundoApellido = document.createElement('td');
          let tdCorreo = document.createElement('td');
          let tdTelefono = document.createElement('td');
          let tdPeso = document.createElement('td');
          let tdAltura = document.createElement('td');

          tdId.innerHTML = user.id;
          tdNombre.innerHTML = user.nombre;
          tdPrimerApellido.innerHTML = user.primerApellido;
          tdSegundoApellido.innerHTML = user.segundoApellido;
          tdCorreo.innerHTML = user.correo;
          tdTelefono.innerHTML = user.celular;
          tdPeso.innerHTML = user.peso;
          tdAltura.innerHTML = user.altura;

          tr.appendChild(tdId);
          tr.appendChild(tdNombre);
          tr.appendChild(tdPrimerApellido);
          tr.appendChild(tdSegundoApellido);
          tr.appendChild(tdCorreo);
          tr.appendChild(tdTelefono);
          tr.appendChild(tdPeso);
          tr.appendChild(tdAltura);

          table.appendChild(tr);        
      })            
    }
  }  
}