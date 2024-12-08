import '@/pc/css/chat/chat.css';

import React, { useRef } from 'react';
import { useState } from 'react';

const ChatMakeRoomModal = ({ setIsShowModal, setRoomName, setRooms }) => {

 const modalRef = useRef(null);
 const [roomTitle, setRoomTitle] = useState('');

 const closeModal = (e) => {
  setIsShowModal(false);
 }

 const makeRoom = () => {
  if (!roomTitle) {
   alert('방제를 입력해주세요');
   return;
  }

  setIsShowModal(false);
  setRoomName(roomTitle);
  setRooms((prev) => [...prev, roomTitle]);
 }

 return (
  <div
   className='chat-makeroom-container show'
   ref={modalRef}
   onClick={closeModal}
  >
   <div
    className='chat-makeroom-content'
    onClick={(e) => e.stopPropagation()}
   >


    <div>
     <ul>
      <li>채팅방 만들기</li>
     </ul>
    </div>

    <div>
     <label htmlFor="">방제</label>
     <input type="text" onChange={(e) => setRoomTitle(e.target.value)} />
    </div>

    <div>
     <button onClick={makeRoom}>만들기</button>
     <button onClick={() => setIsShowModal(false)}>취소</button>
    </div>

   </div>
  </div>
 )
}

export default ChatMakeRoomModal;