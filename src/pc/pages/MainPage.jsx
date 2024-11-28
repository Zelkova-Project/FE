import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import Section from '@/pc/components/Section';
import Kakao from '@/pc/components/Kakao';
import '@/pc/css/main.css';
import '@/common/fonts/font.css';

const MainPage = () => {
  return (
    <div className="main-container">
      <Nav />

      <Section isMain={true}>
        <img className="main-img wd100 " src="guide/main-img.jpg" alt="main-section"></img>
      </Section>

      <Section>
        <div>
          <h5 className="subtit">공지사항</h5>
        </div>
        <div className="section-img-container">
          <ul>
            <li>
              <div className="img-subtit">
                <span>공지사항</span>
                <p>느티나무 복지관의 공지사항을 지금 바로 확인하세요.</p>
              </div>
              <div className="img-container1 main-img1 set2-setting">
                {/* <img src="middle-section.png" alt="main-section"></img> */}
              </div>
            </li>
            <li>
              <div className="img-subtit">
                <span>가정통신문</span>
                <p>화목한 느티나무 복지관의 소식을 간단하게 받아보세요.</p>
              </div>
              <div className="img-container2 main-img2 set2-setting">
                {/* <img src="middle-section2.png" alt="main-section"></img> */}
              </div>
            </li>
          </ul>
        </div>
      </Section>

      <Section>
        <div>
          <h5 className="subtit">이용안내</h5>
        </div>
        <div className="section-img-container">
          <ul className="set3-gap">
            <li>
              <div className="img-subtit set3-top">
                <span>이용시간</span>
                <p>느티나무 복지관의 이용시간에 대해 안내드립니다.</p>
              </div>
              <div className="img-container1 set3-setting 이용안내-img1">
                {/* <img src="middle-section.png" alt="main-section"></img> */}
              </div>
            </li>
            <li>
              <div className="img-subtit set3-top">
                <span>이용금액</span>
                <p>느티나무 복지관의 이용 금액에 대해 안내드립니다.</p>
              </div>
              <div className="img-container2 set3-setting 이용안내-img2">
                {/* <img src="middle-section2.png" alt="main-section"></img> */}
              </div>
            </li>
            <li>
              <div className="img-subtit set3-top">
                <span>이용절차&구비서류</span>
                <p>느티나무 복지관을 이용하기 위한 절차와 구비하실 서류를 안내드립니다.</p>
              </div>
              <div className="img-container2 set3-setting 이용안내-img3">
                {/* <img src="middle-section2.png" alt="main-section"></img> */}
              </div>
            </li>
          </ul>
        </div>
      </Section>

      <Section>
        <div>
          <h5 className="subtit">시설안내</h5>
        </div>
        <div className="section-img-container">
          <ul className="set3-gap">
            <li>
              <div className="img-subtit set3-top">
                <span>시설소개</span>
                <p>느티나무 복지관에 대하여 소개합니다.</p>
              </div>
              <div className="img-container1 set3-setting 시설안내-img1">
                {/* <img src="middle-section.png" alt="main-section"></img> */}
              </div>
            </li>
            <li>
              <div className="img-subtit set3-top">
                <span>시설현황</span>
                <p>느티나무 복지관의 직원 및 시설을 안내해드립니다.</p>
              </div>
              <div className="img-container2 set3-setting 시설안내-img2">
                {/* <img src="middle-section2.png" alt="main-section"></img> */}
              </div>
            </li>
            <li>
              <div className="img-subtit set3-top">
                <span>실내모습&프로그램</span>
                <p>느티나무 복지관의 실내모습과 프로그램에 대하여 안내해드립니다,.</p>
              </div>
              <div className="img-container2 set3-setting 시설안내-img3">
                {/* <img src="middle-section2.png" alt="main-section"></img> */}
              </div>
            </li>
          </ul>
        </div>
      </Section>

      <Section isLast={true}>
        <div>
          <h5 className="subtit">오시는 길</h5>
        </div>
        <div className="kakao-map-container" style={{ background: '#FDFCF8' }}>
          <Kakao />
          <div className="guide">
            <ul>
              <li>
                <h4>오시는 길</h4>
              </li>
              <li>
                <div className="juso">
                  <h4>주소</h4>
                  <p>경기도 하남시 덕풍동로 53 (12936)</p>
                </div>
              </li>
              <li>
                <div className="tel">
                  <h4>전화번호</h4>
                  <p>031-796-0005</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default MainPage;
