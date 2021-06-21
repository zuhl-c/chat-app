/* this program was written by zuhail pm */
/* for more info : www.github.com/zuhl-c */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 3000;
const io = require('socket.io')(server);
const path = require('path');
const fs = require('fs');
var date=require('date-and-time');


app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.sendFile('./index.html',{root:__dirname});
});

server.listen(port,function(){
    console.log('server running : '+port);
});

var clients=[];

io.on('connection',(socket)=>{

    var client_info= new Object();
    client_info.id=socket.id;
    clients.push(client_info);
    console.log('total clients => ' +clients.length );console.log(clients);

    console.log('client connected : id : '+socket.id);
    socket.on('disconnect',()=>{
        console.log('client disconnected : id : '+socket.id);
        deleteId(socket.id);
    });

    socket.on('chat message',async(msg)=>{
        var time = date.format( new Date() ,'hh:mm A');
        console.log('client : ' +socket.id +' , message : '+msg+' , time : '+time);
        io.emit('chat message',msg,socket.id,time);
       
    });
});

async function deleteId(id){
    for(var i =0; i<clients.length;i++){
       // console.log(clients[i]);
        if(clients[i].id==id){
            // console.log('removing disconnceted client id '+clients[i].id);
            await clients.splice(i,1);
            console.log('disconnected client id has been deleted');
            break;
        }
    }
}