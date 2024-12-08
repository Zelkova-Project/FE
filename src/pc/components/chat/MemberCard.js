import '@/pc/css/chat/chat.css';

const MemberCard = ({room}) => {
  console.log('room ', room);

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
          <h4>{room}</h4>
          <p>5분 전</p>
        </div>
        <div className="member-card-right-bottom">
          <p>클릭하여 방에 입장하세요</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
