import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import io from 'socket.io-client';
import {
    renderizarUsuarios,
    renderizarMensajes,
    renderizarMensajesPrivados,
    scrollBottom,
    scrollBottom2,
    renderizarImagen,
    renderizarImagenPrivada
} from './socket-chat-jquery';

export var socket = io();

var params = new URLSearchParams(window.location.search);

var imagefile = $('#imagefile')

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('User and Room are necessary');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

var admin = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (resp) {
        // console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    });

});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});



// Escuchar información
socket.on('crearMensaje', function (mensaje) {
    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

socket.on('crearImagen', function (mensaje) {
    // console.log('Servidor:', mensaje);
    renderizarImagen(mensaje, false);
    scrollBottom();
});

socket.on('crearImagenPrivada', function (mensaje) {
    // console.log('Servidor:', mensaje);
    renderizarImagenPrivada(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function (personas) {
    renderizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    renderizarMensajesPrivados(mensaje, false);
    scrollBottom();


});

/* function image send 

  arguments
  file *array* (no default value)*/
//   imagefile.on('change', function (e){
//     var file = e.originalEvent.target.files[0];
//     // var reader = new FileReader();
//     //     reader.onload = function (evt) {
//     //         socket.emit('crearImagen', {
//     //             nombre: nombre,
//     //             mensaje: evt.target.result}, 
//     //             function (mensaje) {
//     //             txtMensaje.val('').focus();
//     //             renderizarImagen(mensaje, true);
//     //             scrollBottom();
//     //         });
//     //     };
//     reader.readAsDataURL(file);
// });
