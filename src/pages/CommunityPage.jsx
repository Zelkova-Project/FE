import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import CommunityBody from '../components/community/CommunityBody';

import '../css/main.css';
import '../css/notice.css';
import '../css/community.css';
import '../css/guide.css';

import { useNavigate } from 'react-router-dom';

const CommunityPage = () => {
  const navigate = useNavigate();
  const imgObj = {
    main: require('../imgs/community/community-main.png'),
  };

  let activeComp = {};

  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <div className="img-title">
            <h3>커뮤니티</h3>
          </div>
          <img className="main-img" src={imgObj.main} alt="main-section"></img>
        </div>
      </Section>

      <CommunityBody />

      <Footer />
    </div>
  );
};

export default CommunityPage;
