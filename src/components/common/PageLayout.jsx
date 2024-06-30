import '../../css/guide.css';
import '../../css/main.css';
import '../../css/notice.css';
import '../../css/community.css';

import Footer from '../../components/Footer';
import React, { useState, useEffect } from 'react';
import { activeInfoState } from '../../recoilState/recoil';
import { useRecoilState } from 'recoil';

import Nav from '../../components/Nav';
import Section from '../../components/Section';

import imgMap from '../common/data/imgData';

const PageLayout = ({ pageName, bodySlot }) => {
  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);
  const [activeSubtitle, setActiveSubtitle] = useState('');

  const subTitle = {
    guide: ['이용안내', '시설안내', '오시는길', '조직도'],
    notice: ['공지사항', '가정통신문', '채용안내'],
    support: ['후원의손길', '자원봉사'],
    community: ['커뮤니티'],
  };

  const activeClass = pageName == 'guide' ? 'active2' : 'active';

  let useTitleList = subTitle[activeInfo.activePage]; // 부모에서 사용하는 subtitle 리스트

  const settingActiveInfo = (idx) => {
    setActiveInfo({ ...activeInfo, activeIdx: idx });
  };

  // subtitle 리스트 만드는 함수
  const makeSubtitle = () => {
    let result = [];
    if (!useTitleList || useTitleList.length == 0) {
      return ['123'];
    }
    useTitleList.forEach((item, idx) => {
      result.push(
        <li
          onClick={() => settingActiveInfo(idx)}
          className={activeInfo.activeIdx == idx ? activeClass : ''}
          key={idx}
        >
          <span>{item}</span>
        </li>,
      );
    });

    return result;
  };

  useEffect(() => {
    setActiveInfo({
      activePage: pageName,
      activeIdx: 0,
    });
  }, []);

  // 공통: 리코일의 activeIdx 변경감지하여 subtitle 변경
  useEffect(() => {
    const changeRecoil = () => {
      setActiveInfo({
        ...activeInfo,
        activePage: pageName,
      });
    };

    changeRecoil();

    const { activePage: page, activeIdx: idx } = activeInfo;
    setActiveSubtitle(useTitleList[idx]);

    return () => {
      // recoil의 activeInfo 새로고침하기
      setActiveInfo({ ...activeInfo, activeIdx: 0 });
    };
  }, [activeInfo.activeIdx, activeInfo.activePage, pageName]);

  // 공통: 이미지 산출 메소드
  const getImg = () => {
    const targetImg = imgMap[pageName];
    const imgsList = Object.entries(targetImg);

    const [subtitName, url] = imgsList[activeInfo.activeIdx];
    return url;
  };

  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <div className="img-title">
            <h3>{activeSubtitle}</h3>
          </div>
          <img className="main-img" src={getImg()} alt="main-section"></img>

          <div className="sub-nav">
            <ul>
              {/* subtitle영역 시작 */}

              {makeSubtitle()}

              {/* subtitle영역 끝 */}
            </ul>
          </div>
        </div>
      </Section>

      {/* slot영역 시작 */}
      {bodySlot}
      {/* slot영역 끝*/}
      <div className="gap"></div>
      <Footer />
    </div>
  );
};

export default PageLayout;
