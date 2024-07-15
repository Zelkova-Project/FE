import '../css/footer.css';

const Footer = () => {
  let logo = require('../imgs/logo.png');
  return (
    <div className="footer-wrapper">
      <footer className="footer-container">
        <div className="footer-title">
          <div>
            <img src={logo} />
          </div>
          <h3 className="footer-title-name">느티나무마을 복지관</h3>
        </div>
        <div className="footer-info">
          <div className="footer-left-info">
            <ul>
              <li>
                <div className="left-li">
                  <h4>주소</h4>
                  <p>경기도 하남시 덕풍동로 53 (12936)</p>
                </div>
              </li>
              <li>
                <div className="left-li">
                  <h4>전화번호</h4>
                  <p>031-796-0005</p>
                </div>
              </li>
              <li>
                <div className="left-li">
                  <h4>팩스</h4>
                  <p>031-796-0005</p>
                </div>
              </li>
              <li>
                <div className="left-li">
                  <h4>이메일</h4>
                  <p>skan0005@naver.com</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-right-info">
            <ul>
              <li>
                <div className="right-li">
                  <h4>이사장</h4>
                  <p>방성일 담임목사</p>
                </div>
              </li>
              <li>
                <div className="right-li">
                  <h4>후원계좌</h4>
                  <p>(12936) 경기도 하남시 덕풍동로 53</p>
                </div>
              </li>
              <li>
                <div className="right-li">
                  <h4>후원문의</h4>
                  <p>031-796-0005</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
