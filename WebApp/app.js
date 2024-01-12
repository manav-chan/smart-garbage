const express = require('express');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

fs.watch('./data.txt', (eventType, filename) => {
    fs.readFile('./data.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        
        for (let i = data.length; i >= 0; i--) {
            if (data[i] == '\n') {
                let level = data.slice(i+1);
                io.emit('file update', level);
                break;
            }
            if(i == 0) {
                io.emit('file update', data);
            }
        }
    });
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`));