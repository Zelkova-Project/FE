import { useEffect, useState } from 'react';
import '@/pc/css/chat/chat.css';
import { useNavigate } from 'react-router';
import useAxiosInsance from '@/common/axios/axiosInstance';

const TempChat = () => {

  const [showRoom, setShowRoom] = useState(true)
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  const axios = useAxiosInsance();

  useEffect(() => {
    if (roomName) {
      moveChatRoom();
    }
  }, [roomName]);

  const goToRoom = (방제) => {
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
    const roomsArr = roomsInfo.map(([_, roomName]) => roomName);

    setRooms(roomsArr);
  }

  return (
    <div className="chatlist-container">
      <div className="chat-tab">
        <div className="tab-item" onClick={() => setShowRoom(!showRoom)}>
          <strong>방만들기</strong>
        </div>
        <div className="tab-item" onClick={getShowRoom}>
          <strong>방 목록</strong>
        </div>
      </div>

      <div className="chat-content">
        {
          showRoom ? (
            <>
              <input type="text" onChange={(e) => setRoomName(e.target.value)} />
              <button onClick={moveChatRoom}>방 만들기</button>
            </>
          ) : (
            <ul>
              {
                (rooms || []).map(room => (
                  <li
                    key={room}
                    onClick={() => goToRoom(room)}
                  >
                    {room}
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    </div>
  )
}

export default TempChat;
