import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import '../css/chat/chat.css';
import MemberCard from '../components/chat/MemberCard';
import OtherMessage from '../components/chat/OtherMessage';
import MyMessage from '../components/chat/MyMessage';
import { useEffect, useState } from 'react';

import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const [chatClient, setChatClient] = useState(null);
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const imgObj = {
    comment: require('../imgs/chat/comment.png'),
    chatting: require('../imgs/chat/setting.png'),
    profile: require('../imgs/notice/notail-comment.png'),
    more: require('../imgs/chat/chat-user-more.png'),
    chatCopy: require('../imgs/chat/chat-send-msg.png'),
  };

  const getToken = () => {
    let cookie = document.cookie;  
    const [key, val] = cookie.split("=");
    return val;
  }

  // TODO: csrfToken 없을 때 방어코드 추가
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

  const URL = '/zelkova/user/queue/message';

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
        URL,
        (message) => {
          console.log('메세지 >>> ', message);
        }
      );
      setIsConnected(true);
    }
    
    client.onDisconnect = () => {
      console.log('>>> 연결해제 ');
      setIsConnected(false);
    }

    client.onStompError = function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    
    client.activate();

    setChatClient(client); // local 전역으로 사용
  };


  const sendMessage = (e) => {
    console.log('>>> 메세지전송시작');
    console.log('>>> 클라이언트 : ', chatClient);
    console.log('>>> 연결유무 : ', isConnected);
    console.log('>>> 전송URL : ', URL);

    if (chatClient && isConnected) {
      chatClient.publish({
        destination: URL,
        body: JSON.stringify({ text: message }),
      });

      console.log('>>> 보낸메세지 : ', message);
      setMessage('');
    }
  };

  useEffect(() => {
    console.log('>>> 토큰 : ', getToken());

    connectHandler();

    // beforeDestory chatclient 있으면 제거해주기
    return () => {
      if (chatClient) {
        console.log('클라이언트 존재함 >>> 삭제 진행 >>>> ');
        chatClient.deactivate();
      }
    };
  }, []);


  return (
    <div className="main-container">
      <Nav />

      <Section>
        <div className="chatting-entire-container">
          <div className="chatting-list-container">
            <div className="chatting-list-tit">
              <h3>채팅 목록</h3>
              <div className="chatting-list-members-icons">
                <img src={imgObj.comment}></img>
                <img src={imgObj.chatting}></img>
              </div>
            </div>
            <div className="chatting-list-members">
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
              {/* <div className='chatting-list-member-card'>
            <div className='member-card-left'>
              <img src={imgObj.profile}></img>
            </div>
            <div className='member-card-right'>
              <div className='member-card-right-top'>
                <h4>성한결</h4>
                <p>5분 전</p>
              </div>
              <div className='member-card-right-bottom'>
                <p>Lorem ipsum dolor sit amet, consectetur</p>
              </div>
            </div>
          </div> */}
            </div>
          </div>

          <div className="chatting-msg-container">
            <div className="chatting-msg-opposite-info">
              <div className="user-info">
                <img src={imgObj.profile} />
                <p>성한결</p>
              </div>
              <div className="user-info-more">
                <img src={imgObj.more}></img>
              </div>
            </div>
              
            <div className='chatting-msg-container-wrapper'>
              {/* <OtherMessage/>
              <MyMessage/>
              <OtherMessage/>
              <MyMessage/>
              <OtherMessage/>
              <MyMessage/>
              <OtherMessage/>
              <OtherMessage/>
              <OtherMessage/> */}
            </div>
            <div className='chatting-msg-send-container'>
              <div className='chatting-msg-send-content'>
                <textarea 
                  placeholder='내용을 입력해주세요'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                >

                </textarea>
                <img src={imgObj.chatCopy} />
              </div>
              <div className='chatting-msg-send-btn'>
                <button onClick={(e) => sendMessage(e)}>전송</button>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* <Footer /> */}
    </div>
  );
};

export default ChatPage;
