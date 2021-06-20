const socket = io("ws://localhost:3000");
function sendMsg(){
  socket.emit('chat message',$('#msg').val());
  sendmessage($('#msg').val())
  $('#msg').val('');
  return 0;
}
socket.on('chat message',(msg)=>{
    renderMessage(msg);
  })
var renderMessage = message => {
var div = document.createElement('div')
div.classList.add('render-message')
div.innerText = message
document.getElementById('chat-box').appendChild(div)
}
var sendmessage = message => {
var div = document.createElement('div')
div.classList.add('send-message')
div.innerText = message
document.getElementById('chat-box').appendChild(div)

}