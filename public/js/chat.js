const socket = io("ws://localhost:3000");

function sendMsg(){
  var message = $('#msg').val();
  if(message!=''){
    socket.emit('chat message',message);
    $('#msg').val('');
    return 0;
  }else{
    alert('message cannot empty');
  }
  
}
socket.on('chat message',(msg,id,time)=>{
  console.log(id);
  if(socket.id==id){
    sendmessage(msg,time);
  }else{
    renderMessage(msg,time);
  }
  })
var renderMessage = (message,time) => {
var div=document.createElement('div');
var h5 = document.createElement('h5');
h5.classList.add('time');
div.classList.add('render-message');
div.innerText = message;
h5.innerText= time;
document.getElementById('chat-box').appendChild(div);
document.getElementById('chat-box').appendChild(h5);
}

var sendmessage = (message,time) => {
var div = document.createElement('div');
var h5 = document.createElement('h5');
h5.classList.add('time-after');
div.classList.add('send-message');
div.innerText = message;
h5.innerText= time;
document.getElementById('chat-box').appendChild(div);
document.getElementById('chat-box').appendChild(h5);
}