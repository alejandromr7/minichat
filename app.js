require('dotenv').config();
const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {

    socket.on('cliente-mensaje', data => {

        io.emit('mensaje-from-server', data);
    });

});

// Desplegar el directorio publico //
app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
})