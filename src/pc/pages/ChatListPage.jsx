import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useRecoilState } from 'recoil';

import { userInfoState } from '@/common/recoilState/recoil';

import '@/pc/css/chat/chat.css';

const ChatListPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
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
  stompClient.send(`/app/deliver`, {}, JSON.stringify({'sender': (userInfo.nickname || '홍길동'), 'content': messageContent, 'roomName': roomName}));

  document.getElementById("message").value = '';
}

function showMessage(message) {
  let chat = document.getElementById("chat");
  let messageElement = document.createElement('p');
  messageElement.appendChild(document.createTextNode(message.sender + ": " + message.content));
  chat.appendChild(messageElement);
}

function entering(e) {
  const isEnter = e.key == 'Enter';

  if (isEnter) {
    sendMessage();
  }
}

 return (
  <>
    <div id="chat">
    </div>

    <div className="sending-area">
      <input 
        type="text" 
        id="message" 
        autoComplete='off'
        onKeyDown={(e) => entering(e)}
      />
      <button onClick={() => sendMessage()}>전송</button>
    </div>
  </>

  
 )
}

export default ChatListPage;
