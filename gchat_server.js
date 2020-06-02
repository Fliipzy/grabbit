class GchatServer {
    io;

    constructor(server) {
        this.io = require('socket.io')(server)
    }

    startListening() {
        this.io.on('connection', socket => {

            //What do when server recieves a message
            socket.on('message', (data) => {

                //Emit that message data to all clients/sockets
                this.io.sockets.emit('message', data)
            })
        })
    }
}

module.exports = GchatServer