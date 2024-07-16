document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');
    const mostrarRegistro = document.getElementById('mostrarRegistro');
    let cards = [];

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        const tarea = document.getElementById('tarea').value;
        const fecha = document.getElementById('date').value;



        const Existe = cards.find(card => card.card === tarea && card.fecha === fecha);
        

        if (!tarea || !fecha) {
            alert('La tarea no puede tener datos vacíos.');
            return;
        }
        
        if (Existe) {
            alert('La tarea con la misma fecha ya existe. Por favor, ingresa otra tarea o fecha.');
            return; 
        } 

         

        const ObjCards = {
            card: tarea,
            fecha: fecha
        };
        //Estoy agregando una tarea al array
        cards.push(ObjCards);
        
        //Estoy agregando mi arreglo al localstorage
        localStorage.setItem('formRegistro', JSON.stringify(cards));
        
        mostrarRegistro.innerHTML = '';

        //Recorro mi arreglo por cada elemento y le agrego elementos html
        cards.forEach((element, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <ul>
                    <li>Tarea: ${element.card}</li>
                    <li>Fecha: ${element.fecha}</li>
                </ul>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;
            mostrarRegistro.appendChild(card);
        });

        document.getElementById('tarea').value = '';
        document.getElementById('date').value = '';
    });

    // Función para cargar datos desde localStorage al cargar la página
    const cargarL = () => {
        const storedCards = JSON.parse(localStorage.getItem('formRegistro')) || [];
        cards = storedCards; // Cargar datos guardados en cards

        mostrarRegistro.innerHTML = '';
        cards.forEach((element, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <ul>
                    <li>Tarea: ${element.card}</li>
                    <li>Fecha: ${element.fecha}</li>
                </ul>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;
            mostrarRegistro.appendChild(card);
        });
    };

    //Muestro y elimino
    mostrarRegistro.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar')) {
            const index = e.target.getAttribute('data-index');
            cards.splice(index, 1); // Eliminar elemento del array
            localStorage.setItem('formRegistro', JSON.stringify(cards)); // Actualizar localStorage
            cargarL(); 
        }
    });

    //Cargar desde localStorage 
    cargarL();
});
