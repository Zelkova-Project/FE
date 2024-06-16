import React, { useEffect, useState } from 'react';

import Stomp from '@stomp/stompjs'
import { Client } from '@stomp/stompjs'

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null)

  useEffect(() => {

    const stomp = new Client({
      brokerURL: 'wss://namu0005.or.kr/api/ws-zelkova',
      connectHeaders: {
        // Authorization: `Bearer ${access}`,
      },
      debug: (str) => {
        console.log(str)
      },
      reconnectDelay: 5000, //자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })
    setStompClient(stomp)
    
    stomp.activate()

  }, []);

  return (
    <div>
      <h1>WebSocket Message</h1>
      <p>{message}</p>
    </div>
  );
};

export default ChatPage;