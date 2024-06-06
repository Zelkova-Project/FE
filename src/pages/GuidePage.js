import '../css/guide.css';
import Nav from '../components/Nav';
import Section from '../components/Section';
import Guide1 from '../components/guide/Guide1';
import Guide2 from '../components/guide/Guide2';
import Guide3 from '../components/guide/Guide3';
import Guide4 from '../components/guide/Guide4';
import Footer from '../components/Footer';
import React, { useState } from 'react';

const Guide = () => {
  const imgObj = {
    이용안내: require('../imgs/guide/이용안내.png'),
    시설안내: require('../imgs/guide/시설안내main.png'),
    오시는길: require('../imgs/guide/오시는길main.png'),
    조직도: require('../imgs/notice/채용안내main.png')
  };

  const [activeIdx, setActiveIdx] = useState(0);
  const [activeComponent, setActiveComponent] = useState(<Guide1 />);
  const [activeSubtit, setActiveSubtit] = useState('이용안내');
  
  const activeHandler = (idx) => {
    setActiveIdx(idx);
    const comp = [<Guide1 />, <Guide2 />, <Guide3 />, <Guide4 />][idx];
    const subtit = ['이용안내', '시설안내', '오시는길', '조직도'][idx];
    setActiveComponent(comp);
    setActiveSubtit(subtit);
  };

  const getImg = () => {
    const mainImg = [imgObj.이용안내, imgObj.시설안내, imgObj.오시는길, imgObj.조직도][activeIdx];
    return mainImg;
  }

  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <div className='img-title'>
            <h3>{activeSubtit}</h3>
          </div>
          <img className="main-img" src={getImg()} alt="main-section"></img>

          <div className="sub-nav">
            <ul>
              <li>
                <span onClick={() => activeHandler(0)} className={activeIdx == 0 ? 'active2' : ''}>
                  이용안내
                </span>
              </li>
              <li>
                <span onClick={() => activeHandler(1)} className={activeIdx == 1 ? 'active2' : ''}>
                  시설안내
                </span>
              </li>
              <li>
                <span onClick={() => activeHandler(2)} className={activeIdx == 2 ? 'active2' : ''}>
                  오시는길
                </span>
              </li>
              <li>
                <span onClick={() => activeHandler(3)} className={activeIdx == 3 ? 'active2' : ''}>
                  조직도
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {activeComponent}

      <div className="gap"></div>
      <Footer />
    </div>
  );
};

export default Guide;
