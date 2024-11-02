import {Link, useNavigate} from "react-router-dom";
import React from "react";
import '@/mobile/css/mLogin.css';
import '@/mobile/css/mMain.css';

const MMainPage = () => {
  const navigate = useNavigate();


  const imgObj = {
    googleLogin: require('@/common/imgs/login/구글로그인.png'),
    kakaoLogin: require('@/common/imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('@/common/imgs/login/카카오로그인아이콘.png'),
  };

    return (
      <>
        <div className="main-background" >

          {/*타이틀*/}
          <div className="main-title">
            <p>
              더불어 살아가는
              <br />
              <span>
                느티나무
                <br />
                복지관입니다
              </span>
            </p>
          </div>

          {/*로그인*/}
          <div className="main-login">
            <div className={'normal-login'}>
              <button className="normal-login-btn" onClick={() => navigate('/mo/login')}>
                로그인
              </button>
            </div>

            <div className="other-login">
              <p>다른 방법으로 로그인</p>
            </div>

            <div className="social-login">
              <div className="">
                  <img src={imgObj.kakaoLoginIcon} alt={'카카오 로그인'} />
              </div>
              <div className="">
                <img src={imgObj.googleLogin} alt={'구글 로그인'} />
              </div>
            </div>

            <div className="login-options">
              <ul className="options-ul">
                <li onClick={() => navigate('/mo/Join')}>회원가입</li>
                <li onClick={() => navigate('/mo/memberFind')}>아이디 찾기 / 비밀번호 바꾸기</li>
                <li onClick={() => navigate('/mo/chat')}>문의하기</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="main-background-img" style={{
          backgroundImage: `url('/mobile-main-bg-img.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          overflow: 'hidden', }}>
        </div>
      </>
    )
}

export default MMainPage;