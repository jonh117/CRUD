
function agregarEditarCita(cita) {
    const citasContainer = document.getElementById('citas-container');
  
    const editIndex = parseInt(document.getElementById('edit-index').value);
  
    if (editIndex === -1) {
      // Agregar una nueva cita
      const citaElement = document.createElement('div');
      citaElement.classList.add('cita');
  
      citaElement.innerHTML = `
        <p><strong>Nombre:</strong> ${cita.names}</p>
        <p><strong>Correo:</strong> ${cita.email}</p>
        <p><strong>Teléfono:</strong> ${cita.tel}</p>
        <p><strong>Modelo:</strong> ${cita.model}</p>
        <p><strong>Falla:</strong> ${cita.damage}</p>
        <p><strong>Fecha:</strong> ${cita.date}</p>
        <p><strong>Hora:</strong> ${cita.hour}</p>
        <button class="edit-button">Editar</button>
        <button class="delete-button">Eliminar</button>
      `;
  
      citasContainer.appendChild(citaElement);
  

      const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
  

      citasGuardadas.push(cita);
  
   
      localStorage.setItem('citas', JSON.stringify(citasGuardadas));
    } else {
   
      const citaElements = Array.from(citasContainer.getElementsByClassName('cita'));
      if (editIndex >= 0 && editIndex < citaElements.length) {
        const citaElement = citaElements[editIndex];
        citaElement.innerHTML = `
          <p><strong>Nombre:</strong> ${cita.names}</p>
          <p><strong>Correo:</strong> ${cita.email}</p>
          <p><strong>Teléfono:</strong> ${cita.tel}</p>
          <p><strong>Modelo:</strong> ${cita.model}</p>
          <p><strong>Falla:</strong> ${cita.damage}</p>
          <p><strong>Fecha:</strong> ${cita.date}</p>
          <p><strong>Hora:</strong> ${cita.hour}</p>
          <button class="edit-button">Editar</button>
          <button class="delete-button">Eliminar</button>
        `;

        const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
        citasGuardadas[editIndex] = cita;
  
        localStorage.setItem('citas', JSON.stringify(citasGuardadas));
  
        document.getElementById('edit-index').value = -1;
      }
    }
  
  
    document.getElementById('cita-form').reset();
  }
  
  function eliminarCita(citaElement) {
    const citasContainer = document.getElementById('citas-container');
    citasContainer.removeChild(citaElement);
  

    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
  
  
    const citaIndex = Array.from(citasContainer.children).indexOf(citaElement);
    if (citaIndex !== -1) {
      citasGuardadas.splice(citaIndex, 1);
      localStorage.setItem('citas', JSON.stringify(citasGuardadas));
    }
  }
  

  function editarCita(citaElement) {
    const citasContainer = document.getElementById('citas-container');
    const citaElements = Array.from(citasContainer.getElementsByClassName('cita'));
    const editIndex = citaElements.indexOf(citaElement);
  
    if (editIndex >= 0) {
      
      const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
      const cita = citasGuardadas[editIndex];
  
    
      document.querySelector('.name-client').value = cita.names;
      document.querySelector('.email').value = cita.email;
      document.querySelector('.tel').value = cita.tel;
      document.querySelector('.model').value = cita.model;
      document.querySelector('.damage').value = cita.damage;
      document.querySelector('.date').value = cita.date;
      document.querySelector('.hour').value = cita.hour;
  
     
      document.getElementById('edit-index').value = editIndex;
    }
  }
  
  document.getElementById('cita-form').addEventListener('submit', function(event) {
    event.preventDefault();
    agregarEditarCita(getCitaData());
  });
  
 
  document.getElementById('citas-container').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('delete-button')) {
      const citaElement = target.parentElement;
      eliminarCita(citaElement);
    } else if (target.classList.contains('edit-button')) {
      const citaElement = target.parentElement;
      editarCita(citaElement);
    }
  });
  

  function getCitaData() {
    const names = document.querySelector('.name-client').value;
    const email = document.querySelector('.email').value;
    const tel = document.querySelector('.tel').value;
    const model = document.querySelector('.model').value;
    const damage = document.querySelector('.damage').value;
    const date = document.querySelector('.date').value;
    const hour = document.querySelector('.hour').value;
  
    return {
      names,
      email,
      tel,
      model,
      damage,
      date,
      hour,
    };
  }
  