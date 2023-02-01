// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button')


const searchParams = new URLSearchParams(window.location.search)

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio


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

socket.on("ultimo-ticket", (ultimoTicket) => {
//    lblNuevoTicket.innerHTML = 'Ticket: ' + ultimoTicket
})


btnAtender.addEventListener( 'click', () => {

    // socket.emit( 'siguient-ticket', null, ( ticket ) => {
    //    lblNuevoTicket.innerHTML = ticket
    // });

});