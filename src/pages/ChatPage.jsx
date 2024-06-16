import React, { useEffect, useState } from 'react';

import Stomp from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';

// import SockJS from 'sockjs-client';

const ChatPage = () => {

  const connectHandler = () => {
   let sockJs = new SockJS("https://namu0005.or.kr/ws-zelkova", null, {transports: ["websocket", "xhr-streaming", "xhr-polling"]});

    
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
