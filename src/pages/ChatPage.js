import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import '../css/chat/chat.css';
import MemberCard from '../components/chat/MemberCard';
import OtherMessage from '../components/chat/OtherMessage';
import MyMessage from '../components/chat/MyMessage';

const ChatPage = () => {
  const imgObj = {
    comment: require('../imgs/chat/comment.png'),
    chatting: require('../imgs/chat/setting.png'),
    profile: require('../imgs/notice/notail-comment.png'),
    more: require('../imgs/chat/chat-user-more.png'),
    chatCopy: require('../imgs/chat/chat-send-msg.png'),
  };

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
              <OtherMessage/>
              <MyMessage/>
              <OtherMessage/>
              <MyMessage/>
              <OtherMessage/>
              <MyMessage/>
              <OtherMessage/>
              <OtherMessage/>
              <OtherMessage/>
            </div>
            <div className='chatting-msg-send-container'>
              <div className='chatting-msg-send-content'>
                <textarea placeholder='내용을 입력해주세요'></textarea>
                <img src={imgObj.chatCopy} />
              </div>
              <div className='chatting-msg-send-btn'>
                <button>전송</button>
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
