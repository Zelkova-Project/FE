import React, {useState} from "react";
import '@/mobile/css/mLogin.css';
import {useNavigate} from "react-router-dom";
import axios from '@/common/axios/axiosInstance';
import { loginState, userInfoState } from '@/common/recoilState/recoil';
import {useRecoilState} from "recoil";

const MLoginPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');


  const goNormalLogin = async () => {
    let formData = new FormData();
    formData.append('username', loginId);
    formData.append('password', loginPw);

    const { data } = await axios.post('/member/login', formData);
    if (!data.ERROR) {
      deleteAllCookies();
      navigate('/mo/main');
      setLogin(true);
      setUserInfo(data);
      putCookie(data.accessToken);
    } else {
      // TODO : 메시지별 인풋 아래 경고표시
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

  const imgObj = {
    googleLogin: require('@/common/imgs/login/구글로그인.png'),
    kakaoLogin: require('@/common/imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('@/common/imgs/login/카카오로그인아이콘.png'),
  };
  
    return (
        <>
          <div className="login">
            {/*나무이미지, 타이틀*/}
            <div className="login-title">

              <div className="img-box">
                <img src="/logo72.png" alt="tree" />
              </div>

              <div className="title">
                <p>
                  더불어 살아가는
                  <br />
                  <span>느티나무 복지관입니다</span>
                </p>
              </div>
            </div>

            {/*로그인*/}
            <div>
              {/*일반 로그인*/}
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


              {/*api 로그인*/}
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
        </>
    )
}

export default MLoginPage;