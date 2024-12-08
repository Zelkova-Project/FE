import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import Section from '@/pc/components/Section';
import '@/pc/css/chat/chat.css';
import MemberCard from '@/pc/components/chat/MemberCard';
import OtherMessage from '@/pc/components/chat/OtherMessage';
import MyMessage from '@/pc/components/chat/MyMessage';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import useAxiosInsance from '@/common/axios/axiosInstance';

import { useRecoilState } from 'recoil';

import { userInfoState } from '@/common/recoilState/recoil';
import ChatMakeRoomModal from './ChatMakeRoomModal';
const ChatPage = () => {

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  let url = process.env.NODE_ENV == 'development'
    ? 'http://localhost:8080/api/chat-websocket'
    : 'https://namu0005.or.kr/api/chat-websocket';

  let socket = new SockJS(url);
  let stompClient = Stomp.over(socket);

  const [showRoom, setShowRoom] = useState(false)
  const [roomName, setRoomName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [chattings, setChattings] = useState([]);



  const navigate = useNavigate();
  const axios = useAxiosInsance();

  const imgObj = {
    comment: require('@/common/imgs/chat/comment.png'),
    chatting: require('@/common/imgs/chat/setting.png'),
    profile: require('@/common/imgs/notice/notail-comment.png'),
    more: require('@/common/imgs/chat/chat-user-more.png'),
    chatCopy: require('@/common/imgs/chat/chat-send-msg.png'),
  };

  useEffect(() => {
    getShowRoom();
  }, []);

  useEffect(() => {
    const height = document.querySelector(".chatting-msg-container-wrapper").scrollHeight;
    document.querySelector(".chatting-msg-container-wrapper").scrollTop = height;
  }, [chattings]);

  useEffect(() => {
    console.log('roomName useEffect! ', roomName);
    if (!roomName) return;

    stompClient.connect({}, function (frame) {
      stompClient.subscribe(`/topic/${roomName}`, function (message) {
        console.log('subscribe의 콜백 메소드 내부임!! ', message.body);
        setNewMessage(message)
      });

      stompClient.send('/app/joinChatRoom', {}, roomName);
    });

  }, [roomName]);

  useEffect(() => {
    if (!newMessage.body) return;

    showMessage(JSON.parse(newMessage.body));
  }, [newMessage]);

  const goToRoom = (방제) => {
    console.log('*** 방제 ', 방제);
    setChattings([]);
    setRoomName(방제);
  }

  const moveChatRoom = () => {
    navigate(`/chatroom/${roomName}`);
  }

  const getShowRoom = async () => {
    setShowRoom(!showRoom);
    const res = await axios.get('/chat/rooms');

    if (!res.isError) {
      delete res.isError;
    }

    const roomsInfo = Object.entries(res);
    let roomsArr = roomsInfo.map(([_, roomName]) => roomName);

    if (roomsArr[0] == '') roomsArr = [];

    setRooms(roomsArr);
  }

  const sendMessage = () => {
    stompClient.send(`/app/deliver`, {}, JSON.stringify({ 'sender': (userInfo.nickname || '홍길동'), 'content': textMessage, 'roomName': roomName }));

    setTextMessage('');
    document.getElementById("message").value = '';
  }

  const entering = (e) => {
    const isEnter = e.key == 'Enter';

    if (isEnter) {
      sendMessage();
    }
  }

  const showMessage = (message) => {
    const isJoined = Array.isArray(message);

    if (isJoined) {
      for (let info of message) {
        drawChatDom(JSON.parse(info));
      }
    } else {
      drawChatDom(message);
    }

  }

  const drawChatDom = (message) => {
    console.log('message > ', message)

    const isMine = message.sender == userInfo?.nickname || '';

    if (isMine) {
      setChattings((prevChattings) => [...prevChattings, <MyMessage chat={message} key={prevChattings.length} />]);
    } else {
      setChattings((prevChattings) => [...prevChattings, <OtherMessage chat={message} key={prevChattings.length} />]);
    }

  }

  const showModal = () => {
    setIsShowModal(true);
  }

  return (
    <div className="main-container">
      {
        isShowModal
          ? <ChatMakeRoomModal setRoomName={setRoomName} setIsShowModal={setIsShowModal} setRooms={setRooms} />
          : <></>
      }


      <Nav />

      <Section>
        <div className="chatting-entire-container">
          <div className="chatting-list-container">
            <div className="chatting-list-tit">
              <h3>채팅방 목록</h3>
              <div className="chatting-list-members-icons">
                <img
                  onClick={showModal}
                  src={imgObj.comment}
                />
                <img src={imgObj.chatting} />
              </div>
            </div>
            <div className="chatting-list-members">
              {
                (rooms || []).length > 0 ?
                  rooms.map(room => (
                    <div
                      onClick={() => goToRoom(room)}
                    >
                      <MemberCard
                        room={room}
                        key={room}
                      />
                    </div>
                  ))
                  :
                  '방을 만들어주세요'
              }
            </div>
          </div>

          <div className="chatting-msg-container">
            <div className="chatting-msg-opposite-info">
              <div className="user-info">
                <img src={imgObj.profile} />
                <p>방제: {roomName}</p>
              </div>
              <div className="user-info-more">
                <img src={imgObj.more}></img>
              </div>
            </div>

            <div className="chatting-msg-container-wrapper">
              {
                roomName ?
                  chattings
                  : '채팅방을 선택해주세요'
              }
            </div>
            <div className="chatting-msg-send-container">
              <div className="chatting-msg-send-content">
                <textarea
                  placeholder="내용을 입력해주세요"
                  autoComplete='off'
                  id='message'
                  onChange={(e) => setTextMessage(e.target.value)}
                  onKeyDown={(e) => entering(e)}
                ></textarea>
                <img src={imgObj.chatCopy} />
              </div>
              <div className="chatting-msg-send-btn">
                <button onClick={() => sendMessage()}>전송</button>
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
