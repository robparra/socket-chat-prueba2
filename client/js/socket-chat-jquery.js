import $ from 'jquery';
import { socket } from './socket-chat'

var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');


// referencias de jQuery
var divUsuarios = $('#divUsuarios');
var divUsuarios2 = $('#divUsuarios2');

var formEnviar = $('#formEnviar');
var formEnviar2 = $('#formEnviar2');

var txtMensaje = $('#txtMensaje');
var txtMensaje2 = $('#txtMensaje2');

var divChatbox = $('#divChatbox');
var divChatbox2 = $('#divChatbox2');


// Funciones para renderizar usuarios
export function renderizarUsuarios(personas) { // [{},{},{}]

    console.log(personas);

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Room: <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '"  href="javascript:void(0)" ><span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}


export function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {

        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }


    divChatbox.append(html);

}

export function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


export function scrollBottom2() {

    // selectors
    var newMessage = divChatbox2.children('li:last-child');

    // heights
    var clientHeight = divChatbox2.prop('clientHeight');
    var scrollTop = divChatbox2.prop('scrollTop');
    var scrollHeight = divChatbox2.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Listeners
divUsuarios.on('click', 'a', function () {

    //limpiarMensaje();

    // LLamamos a la etiqueta dentro de ancortag (a) que contiene el id
    var id = $(this).data('id');

    if (id) {
        console.log(id);
        //$(document).ready(function(){
  //$(divUsuarios).click(function(){
    //open("#myModal");
   //$("#myModal").load("privado.html ");
 // });
//});
        //window.open("privado.html","privado","with=120, height=300,scrollbars=YES")
        //abrirModal();
        //limpiarMensaje();

        // formulario del que envía al tocar el usuario de la izquierda
        formEnviar2.on('submit', function (e) {

            e.preventDefault();

            // verificar si el mensaje viene vacío
            // trim quita los espacios al principio y al final
            if (txtMensaje2.val().trim().length === 0) {
                return;
            }

            socket.emit('mensajePrivado', {
                nombre: nombre,
                mensaje: txtMensaje2.val(),
                para: id
            }, function (mensaje) {
                txtMensaje2.val('').focus();
                renderizarMensajePrivado(mensaje, true);
                scrollBottom2();
                return;
            });
        });
    }
    return;
});

formEnviar.on('submit', function (e) {

    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });


});