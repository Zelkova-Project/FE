import "../css/guide.css";
import Nav from "../components/Nav";
import Section from "../components/Section";
import Guide1 from "../components/guide/Guide1";
import Guide2 from "../components/guide/Guide2";
import Guide3 from "../components/guide/Guide3";
import Guide4 from "../components/guide/Guide4";
import Footer from "../components/Footer";
import React, { useState } from 'react';

const Guide = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeComponent, setActiveComponent] = useState(<Guide1/>);

  const activeHandler = (idx) => {
    console.log('>>> idx ', idx);
    setActiveIdx(idx);
    const comp = [<Guide1/>, <Guide2/>, <Guide3/>, <Guide4/>][idx];
    setActiveComponent(comp);
  }

  return (

    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <img className="main-img" src="이용안내.png" alt="main-section"></img>

          <div className="sub-nav">
            <ul>
              <li>
                <span onClick={() => activeHandler(0)} className={activeIdx == 0 ? 'active' : ''}>이용안내</span>
              </li>
              <li>
                <span onClick={() => activeHandler(1)} className={activeIdx == 1 ? 'active' : ''}>시설안내</span>
              </li>
              <li>
                <span onClick={() => activeHandler(2)} className={activeIdx == 2 ? 'active' : ''}>오시는길</span>
              </li>
              <li>
                <span onClick={() => activeHandler(3)} className={activeIdx == 3 ? 'active' : ''}>조직도</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
      
      { activeComponent }


      <div className="gap"></div>
      <Footer />
    </div>
  );
};

export default Guide;
