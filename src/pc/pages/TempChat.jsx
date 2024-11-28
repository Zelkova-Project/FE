import { useEffect, useState } from 'react';
import '@/pc/css/chat/chat.css';
import { useNavigate } from 'react-router';


const TempChat = () => {

  const [showRoom, setShowRoom] = useState(true)
  const [roomName, setRoomName] = useState('')
  const navigate = useNavigate();


  const moveChatRoom = () => {
    navigate(`/chatroom/${roomName}`);
  }

 return (
   <div className="chatlist-container">
     <div className="chat-tab">
      <div className="tab-item" onClick={() => setShowRoom(!showRoom)}>
        <strong>방만들기</strong>   
       </div>
      <div className="tab-item" onClick={() => setShowRoom(!showRoom)}>
        <strong>방 목록</strong>   
      </div>
     </div> 
     
     <div className="chat-content">
       {
         showRoom ? (
           <>
            <input type="text" onChange={(e) => setRoomName(e.target.value)}/>
            <button onClick={moveChatRoom}>방 만들기</button>
           </>
         ) : (
             <ul>
               <li>방제1</li>
               <li>방제1</li>
               <li>방제1</li>
             </ul>
         )
      }  
     </div>
   </div>
 )
}

export default TempChat;
