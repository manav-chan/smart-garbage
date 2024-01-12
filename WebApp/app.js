const express = require('express');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const validator = require('validator');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;
let currentUsername = null;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'chilli potato', resave: false, saveUninitialized: true }));

// Routes
app.get('/', (req, res) => {
    if(req.session.loggedin) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.sendFile(__dirname + '/login.html');
    }
});

app.post('/auth', (req, res) => {
    const username = req.body.username;
    currentUsername = username;
    const password = req.body.password;
    if(username && password) {
        if(validator.isEmail(username)) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/');
        }
        else {
            res.send('Invalid email!');
            res.end();
        }
    }
    else {
        res.send('Please enter Username and Password!')
        res.end();
    }
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

function sendEmail(session) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: currentUsername,
        subject: 'ALERT: Dustbin full!',
        text: 'The dustbin is at ISBT is nearly full. Please take action.'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

fs.watch('./data.txt', (eventType, filename) => {
    fs.readFile('./data.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        
        let level = '';
        for (let i = data.length; i >= 0; i--) {
            if (data[i] == '\n') {
                level = data.slice(i+1);
                io.emit('file update', level);
                break;
            }
            if(i == 0) {
                level = data;
                io.emit('file update', data);
            }
        }
        if(level[0] == 'D') {
            sendEmail();
        }
    });
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`));