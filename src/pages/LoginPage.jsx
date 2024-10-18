import { Link } from 'react-router-dom';
import '../css/login.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios/axiosInstance';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { loginState, userInfoState } from '../recoilState/recoil';

import { getKakaoLoginLink } from '../api/kakaoAPi';

import { deleteAllCookies, putCookie } from '../utils/loginUtil';

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(loginState);
  const isDev = process.env.NODE_ENV == 'development';

  const intervalId = useRef();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isNormalLogin, setIsNormalLogin] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const joinMember = async () => {
    let param = {
      loginId: 'tomhoon1234',
      password: 'pwd12341234',
      name: '테스트용',
      nickname: 'test_nickname',
      email: 'ggggg@naver.com',
    };
    let { status } = await axios.post('/signup', param);
    let { status2 } = await axios.get('/posts/board', {
      page: 1,
      size: 10,
    });
  };

  const normalLogin = () => {
    navigate(`/normalLogin`);
  };

  // 카카오 BE_r1 방식
  const kakaoLoginR1 = () => {
    location.href = getKakaoLoginLink();
  };

  // 카카오 로그인
  const kakaoLogin = async () => {
    const width = 500; // 팝업의 가로 길이: 500
    const height = 640; // 팝업의 세로 길이 : 500
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    let _kakaowindow = window.open(
      'localhost:8080/api/oauth2/authorization/kakao',
      // '/api/oauth2/authorization/kakao',
      // 'https://namu0005.or.kr/api/oauth2/authorization/kakao',
      'kakako-',
      `width=${width},height=${height},left=${left},top=${top}`,
    );

    intervalId.current = setInterval(() => {
      if (!_kakaowindow?.document) return;

      const childcookie = _kakaowindow.document.cookie;
      const parentcookie = document.cookie;

      const [_key1, val1] = childcookie.split('=');
      const [_key2, val2] = parentcookie.split('=');

      if (val1 === val2) {
        setLogin(true);
        navigate('/');
        _kakaowindow.close();
      }
    }, 4000);
  };

  useEffect(() => {
    // 테스트코드 영역
    const testLogin = async () => {
      let formData = new FormData();
      formData.append('username', 'user0@gmail.com');
      formData.append('password', '0000');
  
      const { data } = await axios.post('/member/login', formData);
      if (!data.ERROR) {
        deleteAllCookies();

        navigate('/');
        setLogin(true);
        setUserInfo(data);

        putCookie(data.accessToken);
      } else {
        // let [key, val] = Object.entries(message)[0];
        // let msgMap = {
        //   NOT_EXIST_LOGIN_ID: '존재하지 않은 아이디입니다.',
        //   WRONG_PASSWORD: '비밀번호가 맞지 않습니다.',
        //   ACCOUNT_PROBLEM: '계정이 올바르지 않습니다.',
        // };
        alert(data.ERROR);
      }
    }

    window.testLogin = testLogin;
    // 테스트코드 영역
    return () => clearInterval(intervalId.current);
  }, []);

  const imgObj = {
    googleLogin: require('../imgs/login/구글로그인.png'),
    kakaoLogin: require('../imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('../imgs/login/카카오로그인아이콘.png'),
  };

  const dynamicHandler = (param) => {
    setIsNormalLogin(param);
  };
  const goNormalLogin = async () => {
    let formData = new FormData();
    formData.append('username', loginId);
    formData.append('password', loginPw);

    const { data } = await axios.post('/member/login', formData);
    if (!data.ERROR) {
      deleteAllCookies();
      navigate('/');
      setLogin(true);
      setUserInfo(data);
      putCookie(data.accessToken);
    } else {
      // let [key, val] = Object.entries(message)[0];
      // let msgMap = {
      //   NOT_EXIST_LOGIN_ID: '존재하지 않은 아이디입니다.',
      //   WRONG_PASSWORD: '비밀번호가 맞지 않습니다.',
      //   ACCOUNT_PROBLEM: '계정이 올바르지 않습니다.',
      // };
      alert(data.ERROR);
    }
  };
  const activeEnter = (e) => {
    if (e.key == 'Enter') {
      goNormalLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="img-box">
          <img src="logo72.png" />
        </div>

        {/* 초기로그인진입시작 */}
        {!isNormalLogin && (
          <>
            <div className="title">
              <p>
                더불어 살아가는
                <br />
                <span>느티나무 복지관입니다</span>
              </p>
            </div>

            <div className="early-login">
              <button className="early-login-btn" onClick={() => dynamicHandler('goLogin')}>
                로그인
              </button>
            </div>
          </>
        )}
        {/* 초기로그인진입끝 */}

        {/* 일반로그인영역시작 */}
        {isNormalLogin && (
          <>
            {/*<div className="login-title">*/}
            {/*  <h3 onClick={() => dynamicHandler(true)}>로그인</h3>*/}
            {/*</div>*/}

            <div className="login-form">
              <div className="login-form-id">
                <input
                  type={'text'}
                  id={'user-id'}
                  value={loginId}
                  className={'user-id'}
                  autoComplete={'off'}
                  onChange={(e) => setLoginId(e.target.value.trim())}
                  placeholder={'아이디'}
                />
              </div>

              <div className="login-form-pw">
                <div className="login-form-pw">
                  <input
                    id="user-pw"
                    className={'user-pw'}
                    value={loginPw}
                    type="password"
                    onKeyDown={(e) => activeEnter(e)}
                    onChange={(e) => setLoginPw(e.target.value.trim())}
                    placeholder={'비밀번호'}
                  />
                </div>
              </div>
              <div className={'normal-login'}>
                <button className="normal-login-btn" onClick={() => goNormalLogin()}>
                  로그인
                </button>
              </div>
            </div>
          </>
        )}

        {/* 일반로그인영역끝 */}

        <div className="other-login">
          <p>다른 방법으로 로그인</p>
        </div>

        <div className="social-login">
          <div className="">
            <Link to={getKakaoLoginLink()}>
              {/* <img src={imgObj.kakaoLoginIcon} onClick={() => kakaoLogin()} alt={'카카오 로그인'} /> */}
              <img src={imgObj.kakaoLoginIcon} alt={'카카오 로그인'} />
            </Link>
          </div>
          <div className="">
            <img src={imgObj.googleLogin} alt={'구글 로그인'} />
          </div>
        </div>

        <div className="login-options">
          <ul className="options-ul">
            <li onClick={() => navigate('/join')}>회원가입</li>
            <li onClick={() => navigate('/memberFind')}>아이디 찾기 / 비밀번호 바꾸기</li>
            <li onClick={() => navigate('/chat')}>문의하기</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
