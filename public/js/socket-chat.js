var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('User and Room are necessary');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        // console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    renderizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    // abrimos ventana del modal
     abrirModal();
 //window.open("public/privado.html","privado","with=120, height=300,scrollbars=YES")
 
 
 // renderizamos mensaje del que envía
 renderizarMensajePrivado(mensaje, false);
 scrollBottom2();
 
 // listener para enviar mensaje del que recibe el mensaje privado
 
 formEnviar2.on('submit', function(e) {
 
 e.preventDefault();
 
 // verificar si el mensaje viene vacío
 // trim quita los espacios al principio y al final
 
 if (txtMensaje2.val().trim().length === 0) {
 
 return;
 
 }
 
 socket.emit('mensajePrivado', {
 
 nombre: usuario.nombre,
 mensaje: txtMensaje2.val(),
 para: mensaje.id // el destinatario tiene que ser el mismo que lo envía
 
 }, function(mensajenew) {
 
 txtMensaje2.val('').focus();
 renderizarMensajePrivado(mensajenew, true);
 scrollBottom2();
 return;
 });
 });
 
 // para que quien cierra el chat del lado que lo recibe pueda hacerlo
 closeModal.on('click', function() {
 $('#modal').hide();
 divChatbox2.html('');
 });
 
 
});

//add image to the DOM
socket.on('addimage', function(msg,base64image,mensaje){
  $('.chat-rbox')
  .append(
      $('<p class="meta">', '<span>', "prueba", "</span></p>").append($('<b>').text(msg),'<p><a target="_blank" href="'+ base64image +'"><img src="'+ base64image +'"></a></p>'
      )
  );
});

/* function image send 

  arguments
  file *array* (no default value)*/
$(function(){
  //when the page loads completely
  $("#imagefile").on('change',function(e){
      var file = e.originalEvent.target.files[0];
      var reader = new FileReader();
      reader.onload = function(evt){
          //send the image
          socket.emit('user image', evt.target.result);
      };
      reader.readAsDataURL(file);
  });
});
