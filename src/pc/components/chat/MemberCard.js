import '@/pc/css/chat/chat.css';

const MemberCard = () => {
  const imgObj = {
    profile: require('@/common/imgs/notice/notail-comment.png'),
  };

  return (
    <div className="chatting-list-member-card">
      <div className="member-card-left">
        <img src={imgObj.profile}></img>
      </div>
      <div className="member-card-right">
        <div className="member-card-right-top">
          <h4>성한결</h4>
          <p>5분 전</p>
        </div>
        <div className="member-card-right-bottom">
          <p>Lorem ipsum dolor sit amet, consectetur</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
