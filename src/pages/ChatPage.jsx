import React, { useEffect } from 'react';

import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const getToken = () => {
    let cookie = document.cookie;  
    const [key, val] = cookie.split("=");
    return val;
  }

  const generateRandomString = (csrfToken) => {
    const randomUUID = uuidv4();
    let secretString = '';

    for (let i = 0; i < csrfToken.length; i++) {
      const targetChar = csrfToken.charCodeAt(i);
      const randomChar = randomUUID.charCodeAt(i);
      const xorChar = targetChar ^ randomChar;
      secretString += String.fromCharCode(xorChar);
    }

    return randomUUID + secretString;
  };

  const headers = {
    'X-XSRF-TOKEN': btoa(generateRandomString(getToken()))
  };

  console.log('getToken >>> ', getToken());

  const connectHandler = () => {
    const client = new StompJs.Client({
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 500000,
      heartbeatIncoming: 400000,
      heartbeatOutgoing: 400000,
    });

    client.connectHeaders = headers;
    
    client.webSocketFactory = function () {
      return new SockJS('/ws-zelkova');
    };
    
    client.onConnect = function (frame) {
      client.subscribe(
        '/zelkova/user/queue/message',
        (message) => {
          console.log('message ::: ', message);
        }
      );
    }
    
    client.onStompError = function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    
    client.activate();
  };

  useEffect(() => {
    connectHandler();
  }, []);

  return (
    <div>
      <h1>WebSocket Message</h1>
      {/* <p>{message}</p> */}
    </div>
  );
};

export default ChatPage;