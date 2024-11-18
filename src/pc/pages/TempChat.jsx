const TempChat = () => {

 let url = process.env.NODE_ENV == 'development' 
    ? 'http://localhost:8080/api/chat-websocket' 
    : 'https://namu0005.or.kr/api/chat-websocket';

 let socket = new SockJS(url);
 let stompClient = Stomp.over(socket);
 
 stompClient.connect({}, function (frame) {
     console.log('Connected: ' + frame);
     stompClient.subscribe('/topic/messages', function (message) {
         showMessage(JSON.parse(message.body));
     });
 });
 function sendMessage() {
  let messageContent = document.getElementById("message").value;
  stompClient.send("/app/sendMessage", {}, JSON.stringify({'sender': 'User1', 'content': messageContent}));
}

function showMessage(message) {
  let chat = document.getElementById("chat");
  let messageElement = document.createElement('p');
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
