
const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(4000, function () {
    console.log('app runing on port 4000');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function (socket) {
    console.log('connected to server');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data)
    });
    socket.on('coding', function (data) {
        socket.emit('coding', data)
    })
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data)
    });
});

