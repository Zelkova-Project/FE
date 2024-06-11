import '../../css/chat/chat.css';


const OtherMessage = () => {
 const imgObj = {
  profile: require('../../imgs/notice/notail-comment.png'),
};

  return (
    <div className="chatting-other-msg-card">
      <div className="other-msg-card-left">
        <img src={imgObj.profile} />
      </div>

      <div className="other-msg-card-right">
        <h3>성한결</h3>
        <div className="other-msg-card-right-content">
          <p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet</p>
        </div>
      </div>
    </div>
  );
};

export default OtherMessage;