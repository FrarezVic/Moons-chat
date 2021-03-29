const express = require('express');
const http = require('http');
var app = express();

const servidor = http.createServer(app);

const io = require('socket.io')(servidor, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: false
    }
  });


io.on('connection', socket => {
    socket.on('conectado', () => {
        console.log('Usuario Conectado');
    })
})

servidor.listen(3000, () => console.log('Servidor Inicializado'));