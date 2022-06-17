window.onload = function() {
  let endPoint;
  let form = document.getElementById('form');
  let tipo = document.getElementById('tipo').value;
  let mode = tipo == '1' ? 'Usuario' : 'Entrenador';
  if(tipo == '1') {
    endPoint = 'https://62a78a54bedc4ca6d7ca9dad.mockapi.io/usuario'
  }else{
    endPoint = 'https://62a78a54bedc4ca6d7ca9dad.mockapi.io/entrenadores'
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
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
    xhr.open('POST', endPoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(datos));
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 201) {
        let respuesta = JSON.parse(xhr.responseText);
        alert(`${mode} ${respuesta.nombre} ${respuesta.primerApellido} agregado`);
        form.reset();
      }
    }
  });
}


