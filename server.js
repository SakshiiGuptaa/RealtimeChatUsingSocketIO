const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const users = {};

// set static folder
app.use(express.static(path.join(__dirname,'public')));

// run when client connects
io.on('connection',socket =>{
    
    socket.emit('messagee','welcome to ChatCord!');
    
    //Broadcast when a user connects 
    socket.broadcast.emit('messagee','A user has joined the chat');
    
    //Runs when client disconnects 
    socket.on('disconnect',()=>{
        io.emit('messagee','A user has left the chat')
    });
    
    // Display when a user joined
    socket.on('userJoined',nam =>{
        // console.log('New user joined...',nam);
        users[socket.id] = nam ;
        socket.broadcast.emit('userjoin',nam);
    });

    socket.on('send', messageconnection =>{
        socket.broadcast.emit('receive',{message: messageconnection, name:users[socket.id]})
    })

    // jab client or user chod lr jata h tb kya krna h
    socket.on('disconnect' , nam =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});
//server is on port 8000 and in terminal start it as (node server)
//On browser written as localhost:8000
const PORT = 8000 || process.env.PORT;

server.listen(PORT , () => console.log(`server running on port ${PORT}`));