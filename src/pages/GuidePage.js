import "../css/guide.css";
import Nav from "../components/Nav";
import Section from "../components/Section";
<<<<<<< HEAD
import GuideComponent1 from "../components/GuideComponent1";
import GuideComponent2 from "../components/GuideComponent2";
import GuideComponent3 from "../components/GuideComponent3";
import GuideComponent4 from "../components/GuideComponent4";

import Footer from "../components/Footer";
import React, { useState } from "react";

const Guide = () => {

  const [activeIdx, setActiveIdx] = useState(0);
  const [보여줄컴포넌트, setComponent] = useState(<GuideComponent1/>);
  
  let 컴포넌트들 = [<GuideComponent1/>, <GuideComponent2/>, <GuideComponent3/>, <GuideComponent4/>];

  const activeHandler = (idx) => {
    setActiveIdx(idx);
    setComponent(컴포넌트들[idx]);
  };

=======
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
>>>>>>> 76398b156c95c624d6be8a0c31ced33fd9886977

  return (

    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <img className="main-img" src="이용안내.png" alt="main-section"></img>

          <div className="sub-nav">
            <ul>
              <li>
<<<<<<< HEAD
                <span className={`${activeIdx == 0 ? "active" : ""}`} onClick={() => activeHandler(0)}>
                  이용안내
                </span>
              </li>
              <li>
                <span className={`${activeIdx == 1 ? "active" : ""}`} onClick={() => activeHandler(1)}>
                  시설안내
                  </span>
              </li>
              <li>
                <span className={`${activeIdx == 2 ? "active" : ""}`} onClick={() => activeHandler(2)}>
                  오시는길
                </span>
              </li>
              <li>
                <span className={`${activeIdx == 3 ? "active" : ""}`} onClick={() => activeHandler(3)}>
                  조직도
                </span>
=======
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
>>>>>>> 76398b156c95c624d6be8a0c31ced33fd9886977
              </li>
            </ul>
          </div>
        </div>
      </Section>
      
<<<<<<< HEAD
      {보여줄컴포넌트}
=======
      { activeComponent }

>>>>>>> 76398b156c95c624d6be8a0c31ced33fd9886977

      <div className="gap"></div>
      <Footer />
    </div>
  );
};

export default Guide;
