import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import Section from '@/pc/components/Section';
import { subtitState, navIdxState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';

import '@/pc/css/main.css';
import '@/pc/css/guide.css';
import '@/pc/css/nav.css';
import '@/pc/css/notice.css';
import '@/common/fonts/font.css';
import React, { useState, useEffect } from 'react';

import Write from './WritePage';
import NoticeBoardPage from './NoticeBoardPage';

import { useNavigate, useParams } from 'react-router';

const NoticePage = () => {
  window.scrollTo(0, 0);

  const { divider } = useParams();

  const imgObj = {
    notice: require('@/common/imgs/notice/notice-main.png'),
    home: require('@/common/imgs/notice/가정통신문main.png'),
    hire: require('@/common/imgs/notice/채용안내main.png'),
  };

  const noticeTitleList = ['공지사항', '가정통신문', '채용안내'];

  const handlerRouting = (param) => {
    setActiveComp(param);
  };

  const [subtit, setSubtit] = useRecoilState(subtitState);
  const [navIdx, setNavIdx] = useRecoilState(navIdxState);
  const [activeSubtit, setActiveSubtit] = useState('공지사항');

  const [activeComp, setActiveComp] = useState(
    <NoticeBoardPage activeSubtit={activeSubtit} handlerRouting={handlerRouting} />,
  );

  const navigate = useNavigate();

  const activeHandler = (idx) => {
    setNavIdx(idx);
    setActiveSubtit(noticeTitleList[idx]);
    setSubtit(activeSubtit);
    setActiveComp('');
  };

  const goWritePage = () => {
    navigate(`/write`);
  };

  const getMainImg = () => {
    const imgList = [imgObj.notice, imgObj.home, imgObj.hire];
    return imgList[navIdx];
  };

  if (divider == 'write') {
    handlerRouting(divider);
  }

  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <div className="img-title">
            <h3>{activeSubtit}</h3>
          </div>
          <img className="main-img" src={getMainImg()} alt="main-section"></img>

          <div className="sub-nav-wrapper">
            <div className="sub-nav">
              <ul>
                <li onClick={() => activeHandler(0)} className={navIdx == 0 ? 'active' : ''}>
                  <span>공지사항</span>
                </li>
                <li onClick={() => activeHandler(1)} className={navIdx == 1 ? 'active-wide' : ''}>
                  <span>가정통신문</span>
                </li>
                <li onClick={() => activeHandler(2)} className={navIdx == 2 ? 'active' : ''}>
                  <span>채용안내</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 게시글리스트 */}
      {activeComp != 'write' && activeComp != 'detail' && (
        <NoticeBoardPage activeSubtit={activeSubtit} handlerRouting={handlerRouting} />
      )}

      {/* 게시글쓰기 */}
      {activeComp == 'write' && <Write />}

      <Footer />
    </div>
  );
};

export default NoticePage;
