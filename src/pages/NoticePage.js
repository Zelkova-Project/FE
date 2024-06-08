import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';

import '../css/main.css';
import '../css/guide.css';
import '../css/nav.css';
import '../css/notice.css';
import '../fonts/font.css';
import React, { useState, useEffect, act } from 'react';
import { Link } from 'react-router-dom';

import Write from './WritePage';
import NoticeBoardPage from './NoticeBoardPage';
import NoticeDetailPage from './NoticeDetailPage';

import { useNavigate } from 'react-router-dom';

const NoticePage = () => {
  const imgObj = {
    notice: require('../imgs/notice/notice-main.png'),
    home: require('../imgs/notice/가정통신문main.png'),
    hire: require('../imgs/notice/채용안내main.png')
  };

  const noticeTitleList = ['공지사항', '가정통신문', '채용안내'];

  const handlerRouting = (param) => {
    setActiveComp(param);
  };


  const [activeSubtit, setActiveSubtit] = useState('공지사항');
  const [activeComp, setActiveComp] = useState(<NoticeBoardPage activeSubtit={activeSubtit} handlerRouting={handlerRouting} />);
  
  const [navIdx, setNavIdx] = useState(0);
  const activeHandler = (idx) => {
    setNavIdx(idx);
    setActiveSubtit(noticeTitleList[idx]);
  };
  const navigate = useNavigate();

  const goWritePage = () => {
    navigate(`/write`);
  };
  
  const getMainImg = () => {
    const imgList = [imgObj.notice, imgObj.home, imgObj.hire];
    return imgList[navIdx];
  };


  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <div className='img-title'>
            <h3>{activeSubtit}</h3>
          </div>
          <img className="main-img" src={getMainImg()} alt="main-section"></img>

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

      {/* 게시글리스트 */}
      {activeComp != 'write' && activeComp != 'detail' &&
        <NoticeBoardPage activeSubtit={activeSubtit} handlerRouting={handlerRouting} />
      }
      
      {/* 게시글쓰기 */}
      {activeComp == 'write' && 
        <Write/>
      }

      {/* 게시글상세 */}
      {activeComp == 'detail' && 
        <NoticeDetailPage handlerRouting={handlerRouting} />
      }
      <Footer />
    </div>
  );
};

export default NoticePage;
