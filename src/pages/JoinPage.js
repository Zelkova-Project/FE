import "../css/join.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';

const Join = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  //TODO: 유효성검사
  const goJoin = () => {
      // const fetchData = async() => {
      //   const res = await axios.get('https://jsonplaceholder.typicode.com/news');
      //   return res.data;
      // }	
          
      // fetchData().then(res => res);
    goBack();
  }

  return (
    <div className="join-outer-container">
      <Nav />
      <div className="form-container">
        <div className="form-inner-container">
          <div className="form-title">
            <h4 className="join-title">회원가입</h4>
          </div>

          <div className="join-form-wrapper">
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>이름</p>
              </div>

              <div className="join-form-subitem2">
                <input></input>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>생년월일</p>
              </div>

              <div className="join-form-subitem2">
                <input></input>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>전화번호</p>
              </div>

              <div className="join-form-subitem2">
                <input></input>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>이메일</p>
              </div>

              <div className="join-form-subitem2">
                <input></input>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>주소</p>
              </div>

              <div className="join-form-subitem2">
                <input></input>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>자기소개</p>
              </div>

              <div className="join-form-subitem2">
                <textarea cols="30" rows="300"></textarea>
              </div>
            </div>

            {/* 버튼들 */}
            <div className="join-btns-wrapper">
              <button className="cancel-join-btn" onClick={goBack}>
                취소
              </button>
              <button className="join-btn" onClick={goJoin}>완료</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Join;
