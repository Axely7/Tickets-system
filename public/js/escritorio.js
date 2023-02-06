// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector(".alert")
const lblPendientes = document.querySelector('#lblPendientes')


const searchParams = new URLSearchParams(window.location.search)

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio
divAlerta.style.display = 'none'

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})



socket.on('tickets-pendientes', (cola) => {
    if(cola === 0){
        lblPendientes.style.display = 'none'
    } else {
        lblPendientes.style.display = ''
        lblPendientes.innerText = cola
    }
   
})


btnAtender.addEventListener( 'click', () => {


    socket.emit( 'atender-ticket', {escritorio}, ( {ok, ticket} ) => {
      if(!ok){
        lblTicket.innerText = `Nadie.`
        return divAlerta.style.display = ''
      }

      lblTicket.innerText = `Ticket ${ticket.numero}`

    });

});