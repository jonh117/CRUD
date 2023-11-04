
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


function agregarEditarCita(cita) {
    const editIndex = parseInt(document.getElementById('edit-index').value);

    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];

    if (editIndex === -1) {
        
        citasGuardadas.push(cita);
    } else if (editIndex >= 0 && editIndex < citasGuardadas.length) {
       
        citasGuardadas[editIndex] = cita;
        document.getElementById('edit-index').value = -1;
    }

    localStorage.setItem('citas', JSON.stringify(citasGuardadas));
    document.getElementById('cita-form').reset();
    cargarCitas(); 
}


function eliminarCita(index) {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];

    if (index >= 0 && index < citasGuardadas.length) {
        citasGuardadas.splice(index, 1);
        localStorage.setItem('citas', JSON.stringify(citasGuardadas));
    }

    cargarCitas();
}

function cargarCitas() {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
    const citasContainer = document.getElementById('citas-container');
    citasContainer.innerHTML = '';

    citasGuardadas.forEach((cita, index) => {
        const citaCard = document.createElement('div');
        citaCard.classList.add('cita-card'); // Agregar una clase para las tarjetas

        citaCard.innerHTML = `
            <p class="title"><strong class="title">Nombre:</strong> ${cita.names}</p>
            <p class="title"><strong class="title">Correo:</strong> ${cita.email}</p>
            <p class="title"><strong class="title">Teléfono:</strong> ${cita.tel}</p>
            <p class="title"><strong class="title">Modelo:</strong> ${cita.model}</p>
            <p class="title"><strong class="title">Falla:</strong> ${cita.damage}</p>
            <p class="title"><strong class="title">Fecha:</strong> ${cita.date}</p>
            <p class="title"><strong class="title">Hora:</strong> ${cita.hour}</p>
            <button class="edit-button" onclick="editarCita(${index})">Editar</button>
            <button class="delete-button" onclick="eliminarCita(${index})">Eliminar</button>
        `;

        citasContainer.appendChild(citaCard);
    });
}

function editarCita(index) {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
    const cita = citasGuardadas[index];

    if (cita) {
        document.querySelector('.name-client').value = cita.names;
        document.querySelector('.email').value = cita.email;
        document.querySelector('.tel').value = cita.tel;
        document.querySelector('.model').value = cita.model;
        document.querySelector('.damage').value = cita.damage;
        document.querySelector('.date').value = cita.date;
        document.querySelector('.hour').value = cita.hour;

        document.getElementById('edit-index').value = index;
    }
}


document.getElementById('cita-form').addEventListener('submit', function(event) {
    event.preventDefault();
    agregarEditarCita(getCitaData());
});


cargarCitas();