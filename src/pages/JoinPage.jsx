import '../css/join.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../axios/axiosInstance';
import React, { useState } from 'react';

const Join = () => {
  const [joinInfo, setJoinInfo] = useState({
    login_id: '',
    password: '',
    password_check: '',
    name: '',
    nickname: 'test',
    email: '',
  })

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  //TODO: 유효성검사
  const goJoin = async () => {
    let param = {
      login_id: '',
      password: '',
      name: '',
      nickname: '',
      email: ''
    };

    let entries = Object.entries(joinInfo);

    let msgMap = {
      login_id: '아이디가 비었습니다.',
      password: '비밀번호가 비었습니다.',
      name: '이름이 비었습니다.',
      nickname: '닉네임이 비었습니다.',
      email: '이메일이 비었습니다.',
    };

    for (let entry of entries) {
      let [key, val] = entry;
      if (!val) {
        alert(`${msgMap[key]}`);
        return;
      }

      if (key != 'password_check')
        param[key] = val;
    }

    const isDev = process.env.NODE_ENV == 'development';
    let url = isDev ? '/signup' : '/api/signup';

    let {status, message} = await axios.post(url, param);
    

    if (status == 200 || status == 201) {
      navigate('/');
    } else {
      alert(message);
    }
  };

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
                <p>아이디</p>
              </div>

              <div className="join-form-subitem2">
                <input 
                  value={joinInfo.loginId}
                  onChange={(e) => setJoinInfo({...joinInfo, login_id:e.target.value})}
                >
                </input>
              </div>
            </div>

            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>비밀번호</p>
              </div>

              <div className="join-form-subitem2">
                <input 
                  value={joinInfo.password}
                  type='password'
                  onChange={(e) => setJoinInfo({...joinInfo, password:e.target.value})}
                >
                </input>
              </div>
            </div>

            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>비밀번호 확인</p>
              </div>

              <div className="join-form-subitem2">
                <input
                 value={joinInfo.password_check}
                 type='password'
                 onChange={(e) => setJoinInfo({...joinInfo, password_check:e.target.value})}
                >
                </input>
              </div>
            </div>

            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>이름</p>
              </div>

              <div className="join-form-subitem2">
                <input 
                  value={joinInfo.name} 
                  onChange={(e) => setJoinInfo({...joinInfo, name:e.target.value})}
                ></input>
              </div>
            </div>

            {/* 아이템 */}
            {/* <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>생년월일</p>
              </div>

              <div className="join-form-subitem2">
                <input value={joinInfo.birth}></input>
              </div>
            </div> */}

            {/* 아이템 */}
            {/* <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>전화번호</p>
              </div>

              <div className="join-form-subitem2">
                <input value={joinInfo.phone}></input>
              </div>
            </div> */}
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>이메일</p>
              </div>

              <div className="join-form-subitem2">
                <input 
                  value={joinInfo.email}
                  type="email"
                  onChange={(e) => setJoinInfo({...joinInfo, email:e.target.value})}
                >

                </input>
              </div>
            </div>
            {/* 아이템 */}
            {/* <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>주소</p>
              </div>

              <div className="join-form-subitem2">
                <input></input>
              </div>
            </div> */}
            {/* 아이템 */}
            {/* <div className="join-form-item">
              <div className="join-form-subitem1">
                <p>자기소개</p>
              </div>

              <div className="join-form-subitem2">
                <textarea cols="30" rows="300"></textarea>
              </div>
            </div> */}

            {/* 버튼들 */}
            <div className="join-btns-wrapper">
              <button className="cancel-join-btn" onClick={goBack}>
                취소
              </button>
              <button className="join-btn" onClick={goJoin}>
                완료
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Join;
