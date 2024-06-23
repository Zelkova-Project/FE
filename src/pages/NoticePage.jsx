import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import { subtitState, navIdxState } from '../recoilState/recoil';
import { useRecoilState } from 'recoil';

import '../css/main.css';
import '../css/guide.css';
import '../css/nav.css';
import '../css/notice.css';
import '../fonts/font.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Write from './WritePage';
import NoticeBoardPage from './NoticeBoardPage';
import NoticeDetailPage from './NoticeDetailPage';

import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios/axiosInstance';

const NoticePage = () => {
  window.scrollTo(0, 0);

  const { divider } = useParams();

  const imgObj = {
    notice: require('../imgs/notice/notice-main.png'),
    home: require('../imgs/notice/가정통신문main.png'),
    hire: require('../imgs/notice/채용안내main.png'),
  };

  const noticeTitleList = ['공지사항', '가정통신문', '채용안내'];

  const handlerRouting = param => {
    setActiveComp(param);
  };

  const [subtit, setSubtit] = useRecoilState(subtitState);
  const [navIdx, setNavIdx] = useRecoilState(navIdxState);
  const [activeSubtit, setActiveSubtit] = useState('공지사항');

  const [activeComp, setActiveComp] = useState(
    <NoticeBoardPage activeSubtit={activeSubtit} handlerRouting={handlerRouting} />,
  );

  const navigate = useNavigate();

  const activeHandler = idx => {
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
