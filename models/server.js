const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        // Configuraciones de socket
        this.io = socketio(this.server, { /* Configuraciones */ });
    }

    middlewares() {
        // Desplegar el directorio publico //
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`http://localhost:${this.port}`);
        })
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        this.middlewares();
        this.configurarSockets();
        this.listen();
    }

}

module.exports = Server;