const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 3000;
const io = require('socket.io')(server);
const path = require('path');
const fs = require('fs');

app.use(express.static(__dirname + '/public'));

io.on('connection',(socket)=>{

    console.log('client connected');
    socket.on('disconnect',()=>{
        console.log('client disconnected');
    });
    socket.on('chat message',(msg)=>{
        console.log('client : '+msg);

        socket.emit('chat message','Hi from server');
        //socket.broadcast.emit('chat message',msg);
    });
});

app.get('/',function(req,res){
    res.sendFile('./index.html',{root:__dirname});
});

server.listen(port,function(){
    console.log('server running : '+port);
});