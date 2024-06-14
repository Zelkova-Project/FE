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
  const imgObj = {
    googleLogin: require('../imgs/login/구글로그인.png'),
    kakaoLogin: require('../imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('../imgs/login/카카오로그인아이콘.png'),
  };
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

    let {status, message} = await axios.post('/signup', param);
    

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
                <input
                    value={joinInfo.loginId} placeholder={'아이디'}
                    onChange={(e) => setJoinInfo({...joinInfo, login_id: e.target.value})}
                >
                </input>
                <button className={'join-check'}>중복확인</button>
              </div>
            </div>

            {/* 아이템 */}
            <div className="join-form-item margin-top30">
              <div className="join-form-subitem2">
                <input
                    value={joinInfo.password} placeholder={'비밀번호'}
                    type='password'
                    onChange={(e) => setJoinInfo({...joinInfo, password: e.target.value})}
                >
                </input>
              </div>
            </div>

            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem2">
                <input
                    value={joinInfo.password_check} placeholder={'비밀번호 확인'}
                    type='password'
                    onChange={(e) => setJoinInfo({...joinInfo, password_check: e.target.value})}
                >
                </input>
              </div>
            </div>

            {/* 아이템 */}
            <div className="join-form-item margin-top50">
              <div className="join-form-subitem2">
                <input
                    value={joinInfo.name} placeholder={'이름'}
                    onChange={(e) => setJoinInfo({...joinInfo, name: e.target.value})}
                ></input>
              </div>
            </div>

            {/*아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem2">
                <input value={joinInfo.birth} placeholder={'생년월일(YYYY/MM/DD)'}>

                </input>
              </div>
            </div>

            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <input value={joinInfo.phone} placeholder={'전화번호 입력'}>

                </input>
                <button className={'join-check'}>인증번호 전송</button>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <input value={joinInfo.accreditNum} placeholder={'인증번호 4자리 입력'}>

                </input>
                <button className={'join-check'}>확인</button>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item margin-top50">
              <div className="join-form-subitem2">
                <input value={joinInfo.address} placeholder={'주소'}>

                </input>
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem3">
                <input
                    value={joinInfo.email}
                    type="email" placeholder={'이메일 (선택사항)'}
                    onChange={(e) => setJoinInfo({...joinInfo, email: e.target.value})}
                /> @ <input
                  value={joinInfo.email}
                  type="email" placeholder={'이메일 (선택사항)'}
                  onChange={(e) => setJoinInfo({...joinInfo, email: e.target.value})}
              />
              </div>
            </div>
            {/* 아이템 */}
            <div className="join-form-item">
              <div className="join-form-subitem4">
                <textarea cols="30" rows="300" placeholder={'학생 소개를 간단히 작성해주세요'}></textarea>
              </div>
            </div>

            {/* 버튼들 */}
            <div className="join-btns-wrapper">
              {/*<button className="cancel-join-btn" onClick={goBack}>*/}
              {/*  취소*/}
              {/*</button>*/}
              <button className="join-btn" onClick={goJoin}>
                확인
              </button>
            </div>
            <div className="other-join">
              <p>다른 방법으로 로그인</p>
            </div>

            <div className="social-join">
              <div className="">
                <img src={imgObj.kakaoLoginIcon}/>
              </div>
              <div className="">
                <img src={imgObj.googleLogin}/>
              </div>
            </div>

            <div className='join-options'>
              <ul className='options-ul'>
                <li onClick={() => navigate('/join')}>회원가입</li>
                <li>아이디 / 비밀번호 찾기</li>
                <li onClick={() => navigate('/chat')}>문의하기</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Join;
