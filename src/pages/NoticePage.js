import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';

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

import { useNavigate } from 'react-router-dom';

const NoticePage = () => {
  const imgObj = {
    main: require('../imgs/notice/notice-main.png'),
  };

  const noticeTitleList = ['공지사항', '가정통신문', '채용안내'];

  const handlerRouting = (param) => {
    if (param == 'write') {
      setActiveComp(<Write />);
    } else if (param == 'detail') {
      setActiveComp(<NoticeDetailPage handlerRouting={handlerRouting} />);
    }
  };


  const [activeSubtit, setActiveSubtit] = useState('공지사항');
  const [activeComp, setActiveComp] = useState(<NoticeBoardPage activeSubtit={activeSubtit} handlerRouting={handlerRouting} />);
  
  const [navIdx, setNavIdx] = useState(0);
  const activeHandler = (idx) => {
    setNavIdx(idx);
    alert(activeSubtit);
    setActiveSubtit(noticeTitleList[idx]);
  };
  const navigate = useNavigate();

  const goWritePage = () => {
    navigate(`/write`);
  };

  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <img className="main-img" src={imgObj.main} alt="main-section"></img>

          <div className="sub-nav-wrapper">
            <div className="sub-nav">
              <ul>
                <li>
                  <span onClick={() => activeHandler(0)} className={navIdx == 0 ? 'active' : ''}>
                    공지사항
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => activeHandler(1)}
                    className={navIdx == 1 ? 'active-wide' : ''}
                  >
                    가정통신문
                  </span>
                </li>
                <li>
                  <span onClick={() => activeHandler(2)} className={navIdx == 2 ? 'active' : ''}>
                    채용안내
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {activeComp}

      <Footer />
    </div>
  );
};

export default NoticePage;
