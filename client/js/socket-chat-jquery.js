import $ from 'jquery';
import { socket } from './socket-chat'

var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');


// referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var imagefile = $('#imagefile');
var imagefilePriv = $('#imagefilePriv')


// Funciones para renderizar usuarios
export function renderizarUsuarios(personas) { // [{},{},{}]

    console.log(personas);

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> <b><H4>Room:</b></H4> <span> <b><H4>' + params.get('sala') + '</H4></b></span></a>';
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
    if (mensaje.nombre === '') {
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

export function renderizarMensajesPrivados(mensaje, yo) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = '';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse1">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {

        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse1' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }


    divChatbox.append(html);

    }

    export function renderizarImagenPrivada(mensaje, yo) {

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
        html += '        <div class="box bg-light-inverse1">'
        html += '           <img src="'+ mensaje.mensaje +'" style="height:200px;width:200px">';
        html += '       </div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {

        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse1">'
        html += '           <img src="'+ mensaje.mensaje +'" style="height:200px;width:200px">';
        html += '       </div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }


    divChatbox.append(html);

}

export function renderizarImagen(mensaje, yo) {

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
        html += '        <div class="box bg-light-inverse">'
        html += '           <img src="'+ mensaje.mensaje +'" style="height:200px;width:200px">';
        html += '       </div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {

        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light">'
        html += '           <img src="'+ mensaje.mensaje +'" style="height:200px;width:200px">';
        html += '       </div>';
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



// Listeners
divUsuarios.on('click', 'a', function (e) {

    // LLamamos a la etiqueta dentro de ancortag (a) que contiene el id
    var id = $(this).data('id');
    if(params.get('sala')==="CVS"){
        if (id) {}
     }else
if (id) {console.log(id);
        socket.emit('mensajePrivado', {
        nombre: nombre,
        mensaje: "DM from "+ nombre +" = "+ txtMensaje.val(),
        para: id
    }, function (mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajesPrivados(mensaje, true);
        scrollBottom();
    });
        console.log('whisper');
    }
   

       
    
    
        
});

// var action = 1;
// divUsuarios.on("click",'a', viewSomething);

// function viewSomething(mensaje) {
//      var id = $(this).data('id');
//      if(params.get('sala')==="CVS"){
//         if (id) {}
//      }else
//     if ( action == 1 ) {
//         document.getElementById("txtMensaje").value = "Type a Private DM here:";
//         action = 2;
//     } else {
//         console.log(id);
//         socket.emit('mensajePrivado', {
//         nombre: nombre,
//         mensaje: "DM from "+ nombre +" = "+ txtMensaje.val(),
//         para: id
//     }, function (mensaje) {
//         txtMensaje.val('').focus();
//         renderizarMensajesPrivados(mensaje, true);
//         scrollBottom();
//     });
//         console.log('whisper');
//         action = 1;
//     }
// }

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

// $("#hola").on('click',function(){
//     document.getElementById('imagefile').click();

// })

// $("#imagefile").on('change',function(e){
//     var file = e.originalEvent.target.files[0];

//     if (!file.type.match("image.*")) {
//         alert("please select image")
//     }else{
//         var reader = new FileReader();

//         reader.addEventListener("load" , function(){
//              socket.emit('crearImagen', {
//                 nombre: nombre,
//                 mensaje: reader.result
//             }, 
//                 function (mensaje) {
//                 txtMensaje.val('').focus();
//                 renderizarImagen(mensaje, true);
//                 scrollBottom();
//             });
//         }, false);

//         if (file) {
//             reader.readAsDataURL(file)
//         }
//     }
// })
    

imagefile.on('change', function (e){
    
    var file = e.originalEvent.target.files[0];
    var reader = new FileReader();
            reader.onload = function (evt) {
        
    socket.emit('crearImagen', {
                nombre: nombre,
                mensaje: evt.target.result
            }, 
                function (mensaje) {
                txtMensaje.val('').focus();
                renderizarImagen(mensaje, true);
                scrollBottom();
            });
        };
    reader.readAsDataURL(file);
        

});

imagefilePriv.on('change', function (e){
    
    var file = e.originalEvent.target.files[0];
    var reader = new FileReader();
            var id = $(this).data('id');
            reader.onload = function (evt) {
        
    socket.emit('crearImagenPrivada', {
                nombre: nombre,
                mensaje: evt.target.result,
                para:id
            }, 
                function (mensaje) {
                txtMensaje.val('').focus();
                renderizarImagenPrivada(mensaje, true);
                scrollBottom();
            });
        };
    reader.readAsDataURL(file);

});