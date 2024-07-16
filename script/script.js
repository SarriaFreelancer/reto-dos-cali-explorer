

document.addEventListener('DOMContentLoaded',(e) => {

    e.preventDefault();
    //Capturar informacion
    const formRegistro = document.getElementById('formRegistro');
    const mostrarRegistro = document.getElementById('mostrarRegistro');
    let cards = [];


    //cuando haga click

    formRegistro.addEventListener('submit',(e) => {
        e.preventDefault();

        //Obtener la tarea
        const tarea = document.getElementById('tarea').value;
        const fecha = document.getElementById('date').value;
        //construir el objeto JSON

        const ObjCards = {
            card: tarea,
            fecha: fecha
        }

        cards.push(ObjCards);
        
        //console.log(cards);

        localStorage.setItem('formRegistro', JSON.stringify(cards));

        let m = JSON.parse(localStorage.getItem('formRegistro'));
        
         
         mostrarRegistro.innerHTML = '';
         m.forEach(element => {
            
             mostrarRegistro.innerHTML += `
                 <div>
                     <ul>
                         <li>${element.card}</li>
                         <li>${element.fecha}</li>
                     </ul>
                 </div>`;
         });
            
        
        // const card = document.createElement('div');
        // card.classList.add('card');
      

        
        // console.table(m);


});


});