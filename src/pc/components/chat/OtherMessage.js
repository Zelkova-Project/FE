import '@/pc/css/chat/chat.css';

const OtherMessage = ({chat}) => {
  console.log('otherMessage >>> ', chat);
  
  const imgObj = {
    profile: require('@/common/imgs/notice/notail-comment.png'),
  };

  return (
      <div className="chatting-other-msg-card">
        <div className="other-msg-card-left">
          <img src={imgObj.profile} />
        </div>

        <div className="other-msg-card-right">
          <h3>{chat.sender}</h3>
          <div className="other-msg-card-right-content">
            <p>{chat.content}</p>
          </div>
        </div>
      </div>
  );
};

export default OtherMessage;
