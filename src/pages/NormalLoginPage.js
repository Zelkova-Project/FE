import "../css/join.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const NormalLoginPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  // http://49.247.174.109:8080
  const goNormalLogin = async () => {
    let res = await axios.post("http://49.247.174.109:8080/login", {
        loginId: "eora21",
        password: 1234
    });
  };

  return (
    <div className="join-outer-container">
      <Nav />
      <div className="form-container">
        <div className="form-inner-container">
          <div className="form-title">
            <h4 className="join-title">일반로그인</h4>
          </div>

          <div className="join-form-wrapper">
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>아이디</p>
              </div>

              <div className="join-form-subitem2">
                <input></input>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>비밀번호</p>
              </div>

              <div className="join-form-subitem2">
                <input></input>
              </div>
            </div>

            {/* 버튼들 */}
            <div className="join-btns-wrapper">
              <button className="cancel-join-btn" onClick={goBack}>
                취소
              </button>
              <button className="join-btn" onClick={goNormalLogin}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NormalLoginPage;
