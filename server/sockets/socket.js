const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {


        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'User/Room is necessary'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } join the chat`));

        callback(usuarios.getPersonasPorSala(data.sala));

    });

    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });


    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } left the chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));


    });

    // Mensajes privados
    client.on('mensajePrivado', (data, callback) => {
 // obtener a la persona que envía el mensaje
 let persona = usuarios.getPersona(client.id);
 // crear mensaje
 let mensaje = crearMensaje(persona.nombre, data.mensaje, client.id);
 // console.log(mensaje);
 client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
 callback(mensaje);
 });

    //Socket image
  /* This function cacth the image and emit it to all users in the room
  */
  client.on('user image',function(image){
      const persona = usuarios.getPersona(client.id);
      client.broadcast.to(persona.sala).emit('addimage', `Image shared by ${persona.nombre}: `, image);
  });

});