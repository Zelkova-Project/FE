import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import Section from '@/pc/components/Section';
import CommunityBody from '@/pc/components/community/CommunityBody';

import '@/pc/css/main.css';
import '@/pc/css/notice.css';
import '@/pc/css/community.css';
import '@/pc/css/guide.css';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CommunityPage = () => {
  const navigate = useNavigate();
  const imgObj = {
    main: require('@/common/imgs/community/community-main.png'),
  };

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

