import { Link } from 'react-router-dom';
import '../css/login.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios/axiosInstance';
import React, { useState } from 'react';
import {useRecoilState} from 'recoil';
import {loginState} from '../recoilState/recoil';

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(loginState); 
  const [isNormalLogin, setIsNormalLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState({loginId: '', password: ''});

  const joinMember = async () => {
    let param = {
      loginId: 'tomhoon1234',
      password: 'pwd12341234',
      name: '테스트용',
      nickname: 'test_nickname',
      email: 'ggggg@naver.com'
    };
    let { status } = await axios.post('/signup', param);
    let { status2 } = await axios.get('/posts', {
      page: 1,
      size: 10
    });
  }


  const normalLogin = () => {
    navigate(`/normalLogin`);
  };

  let Rest_api_key = '41d2a43168a7edd9f941329667a65ef4';
  let redirect_uri = 'http://localhost:3000/oauth';
  let url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

	const imgObj = {
		googleLogin: require('../imgs/login/구글로그인.png'),
		kakaoLogin: require('../imgs/login/카카오로그인.png'),
		kakaoLoginIcon: require('../imgs/login/카카오로그인아이콘.png'),
	};

  const dynamicHandler = (param)  => {
    setIsNormalLogin(param);
  }
  const isDev = process.env.NODE_ENV == 'development';
  let loginUrl = isDev ? '/login' : '/api/login';

  const goNormalLogin = async () => {
    let formData = new FormData(); 
    formData.append('loginId',loginInfo.loginId); 
    formData.append('password',loginInfo.password);

    let { status, message, error } = await axios.post(loginUrl, formData);

    if (!error) {
      navigate('/');
      setLogin(true);
    } else {
      let [key, val] = Object.entries(message)[0];
      let msgMap = {
        NOT_EXIST_LOGIN_ID: '존재하지 않은 아이디입니다.',
        WRONG_PASSWORD: '비밀번호가 맞지 않습니다.',
        ACCOUNT_PROBLEM: '계정이 올바르지 않습니다.',
      }
      alert(msgMap[val]);
    }


  };
  const activeEnter = (e) => {
    if(e.key == "Enter") {
      goNormalLogin();
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="img-box">
          <img src="logo72.png" />
        </div>

        {/* 초기로그인진입시작 */}
        {!isNormalLogin && 
        <>
          <div className="title">
            <p>
              더불어 살아가는
              <br />
              <span>느티나무 복지관입니다</span>
            </p>
          </div>

          <div className="normal-login">
            <button className='normal-login-btn' onClick={() => dynamicHandler('goLogin')}>
              로그인
            </button>
          </div>
        </>
        }
       {/* 초기로그인진입끝 */}

        {/* 일반로그인영역시작 */}
        {isNormalLogin && 
        <>
          <div className="login-title">
            <h3 onClick={() => dynamicHandler(true)}>로그인</h3>
          </div>

          <div className="login-form">
            <div className='login-form-id'>
              <label for="user-id">아이디</label>
              <input 
                id="user-id"
                onChange={(e) => setLoginInfo({...loginInfo, loginId: e.target.value})}
              >

              </input>
            </div>

            <div className='login-form-pw'>
              <div className='login-form-pw'>
                <label for="user-pw">비밀번호</label>
                <input 
                  id="user-pw" 
                  type='password' 
                  onKeyDown={(e) => activeEnter(e)}
                  onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})}
                >
                </input>
              </div>
            </div>
          </div> 
        </>
        }

        {/* 일반로그인영역끝 */}


        <div className="other-login">
          <p>다른 방법으로 로그인</p>
        </div>

        <div className="social-login">
          <div className="">
            <img src={imgObj.kakaoLoginIcon} />
          </div>
          <div className="">
            <img src={imgObj.googleLogin} />
          </div>
        </div>

        <div className='login-options'>
          <ul className='options-ul'>
            <li onClick={() => navigate('/join')}>회원가입</li>
            <li>아이디 / 비밀번호 찾기</li>
            <li onClick={() => navigate('/chat')}>문의하기</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
