import '@/pc/css/chat/chat.css';

const MyMessage = ({chat}) => {
  return (
    <div className='chatting-my-msg-card-container'>
      <div className="chatting-my-msg-card">
        <div className="my-msg-card-right-content">
          <p>{chat.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MyMessage;
