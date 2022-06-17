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

  select.addEventListener('change', function(e) {
    let id = document.getElementById('id').value;
    fullFormData(endPoint, id);
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let id = document.getElementById('id').value;
    let nombre = document.getElementById('nombre').value;
    let primerApellido = document.getElementById('primer_apellido').value;
    let segundoApellido = document.getElementById('segundo_apellido').value;
    let correo = document.getElementById('correo').value;
    let telefono = document.getElementById('telefono').value;
    let peso = document.getElementById('peso').value;
    let altura = document.getElementById('altura').value;
    
    let datos = {
      nombre,
      primerApellido,
      segundoApellido,
      correo,
      telefono,
      peso,
      altura
    };
    
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', endPoint+'/'+id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(datos));
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let respuesta = JSON.parse(xhr.responseText);
        select.innerHTML = '<option value="">Seleccione un usuario</option>';
        getDataSelect(select, endPoint);
        alert(`${mode} ${respuesta.nombre} ${respuesta.primerApellido} actualizado`);
        form.reset();
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
      respuesta.forEach((element, i) => {
        let option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = element.id + ' - ' + element.nombre + ' ' + element.primerApellido;
        select.appendChild(option);
      });
    }
  }
}

function fullFormData(endPoint, id) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', endPoint+'/'+id);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let respuesta = JSON.parse(xhr.responseText);
      document.getElementById('nombre').value = respuesta.nombre;
      document.getElementById('primer_apellido').value = respuesta.primerApellido;
      document.getElementById('segundo_apellido').value = respuesta.segundoApellido;
      document.getElementById('correo').value = respuesta.correo;
      document.getElementById('telefono').value = respuesta.telefono;
      document.getElementById('peso').value = respuesta.peso;
      document.getElementById('altura').value = respuesta.altura;
    }
  }
}