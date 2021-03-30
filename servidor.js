const express = require('express');
const http = require('http');
const cors = require('cors');
var app = express();

app.use(cors());

const servidor = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(servidor, {cors: {
    origin: (origin, cb) => {
        cb(null, origin);
    },
    methods: ["GET", "POST"]
  }});

let nombreUsuario = "";
io.on('connection', socket => {
    socket.on('conectado', (nombre) => {
        nombreUsuario = nombre;
        socket.broadcast.emit('mensajes', {nombre: "Servidor", mensaje: `${nombreUsuario} se ha unido a la sala de chat.`});
    })

    socket.on('mensaje', (nombre, mensaje) => {
        io.emit('mensajes', {nombre, mensaje});
    });

    socket.on('disconnect', () => {
        io.emit('mensajes', {nombre: "Servidor", mensaje: `Un participante abandonó la sala de chat.`});
    });
})

servidor.listen(3000, () => console.log('Servidor Inicializado'));