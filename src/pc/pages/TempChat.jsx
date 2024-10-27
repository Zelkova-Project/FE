const { useEffect, useRef } = require("react");


const TempChat = () => {

 useEffect(() => {

 }, []);
 var socket = new SockJS('http://localhost:8080/chat-websocket');
 var stompClient = Stomp.over(socket);
 
 stompClient.connect({}, function (frame) {
     console.log('Connected: ' + frame);

     stompClient.subscribe('/topic/messages', function (message) {
         showMessage(JSON.parse(message.body));
     });
 });
 function sendMessage() {
  var messageContent = document.getElementById("message").value;
  console.log('message ', messageContent);
  stompClient.send("/app/sendMessage", {}, JSON.stringify({'sender': 'User1', 'content': messageContent}));
}

function showMessage(message) {
 console.log('message ', message);
  var chat = document.getElementById("chat");
  var messageElement = document.createElement('p');
  messageElement.appendChild(document.createTextNode(message.sender + ": " + message.content));
  chat.appendChild(messageElement);
}

 return (
  <div id="chat">
   <input type="text" id="message"/>
   <button onClick={() => sendMessage()}>전송</button>
  </div>
 )
}

export default TempChat;