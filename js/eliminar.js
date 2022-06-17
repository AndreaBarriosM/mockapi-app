window.onload = function() {
  let endPoint;
  let form = document.getElementById('form');
  let select = document.getElementById('id');
  let tipo = document.getElementById('tipo').value;
  let mode = tipo == '1' ? 'Usuario' : 'Entrenador';

  if(tipo == '1') {
    endPoint = 'https://62a78a54bedc4ca6d7ca9dad.mockapi.io/usuario'
  }else{
    endPoint = 'https://62a78a54bedc4ca6d7ca9dad.mockapi.io/entrenadores'
  }

  getDataSelect(select, endPoint);
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let id = document.getElementById('id').value;
    
    let datos = {
      id
    };
    
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', endPoint+'/'+id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(datos));
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {        
        select.innerHTML = '<option value="">Seleccione un usuario</option>';
        getDataSelect(select, endPoint);
        alert(`${mode} eliminado`);
      }else if(xhr.readyState == 4 && xhr.status == 404) {
        console.log('No se encontro el usuario');
      }
    }
  });
}

function getDataSelect(select, endPoint) {  
  let xhr = new XMLHttpRequest();
  xhr.open('GET', endPoint);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let respuesta = JSON.parse(xhr.responseText);
      for (let i = 0; i < respuesta.length; i++) {
        let option = document.createElement('option');
        option.value = respuesta[i].id;
        option.innerHTML = respuesta[i].id + ' - ' + respuesta[i].nombre + ' ' + respuesta[i].primerApellido;
        select.appendChild(option);
      }
    }
  }
}