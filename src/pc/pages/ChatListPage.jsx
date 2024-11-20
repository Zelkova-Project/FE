import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

const ChatListPage = () => {

  const { roomName } = useParams();

  console.log('roomName ### ', roomName);

 let url = process.env.NODE_ENV == 'development' 
    ? 'http://localhost:8080/api/chat-websocket' 
    : 'https://namu0005.or.kr/api/chat-websocket';

 let socket = new SockJS(url);
 let stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
      stompClient.subscribe(`/topic/${roomName}`, function (message) {
          showMessage(JSON.parse(message.body));
      });
  });

  function sendMessage() {
    // stompClient.send("/app/enter", {}, JSON.stringify({'sender': 'tomhoon', 'content': 'hello tomhoon', 'roomName': roomName}));

  let messageContent = document.getElementById("message").value;
  stompClient.send(`/app/deliver`, {}, JSON.stringify({'sender': 'User1', 'content': messageContent, 'roomName': roomName}));
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

export default ChatListPage;