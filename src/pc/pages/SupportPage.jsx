import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import Section from '@/pc/components/Section';
import React, { useState } from 'react';
import NoticeBoardPage from './NoticeBoardPage';

import { subtitState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';

import '@/pc/css/main.css';
import '@/pc/css/nav.css';
import '@/pc/css/notice.css';
import '@/pc/css/guide.css';

const SupportPage = () => {
  const imgObj = {
    main: require('@/common/imgs/후원자원봉사main.png'),
  };
  const [navIdx, setNavIdx] = useState(0);
  const [activeSubtit, setActiveSubtit] = useState('후원의손길');

  const [subtit, setSubtit] = useRecoilState(subtitState);
  setSubtit('후원의손길');

  const activeHandler = (idx) => {
    setNavIdx(idx);
    setActiveSubtit(['후원의손길', '자원봉사'][idx]);
    setSubtit(activeSubtit);
  };

  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <div className="img-title for-support">
            <h3>후원&자원봉사</h3>
          </div>
          <img className="main-img" src={imgObj.main} alt="main-section"></img>

          <div className="sub-nav-wrapper">
            <div className="sub-nav">
              <ul>
                <li
                  onClick={() => activeHandler(0)}
                  className={navIdx == 0 ? 'active-support' : ''}
                >
                  <span>후원의손길</span>
                </li>
                <li
                  onClick={() => activeHandler(1)}
                  className={navIdx == 1 ? 'active-support' : ''}
                >
                  <span>자원봉사</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <NoticeBoardPage activeSubtit={activeSubtit} />

      <Footer />
    </div>
  );
};

export default SupportPage;
