import style from '@/pc/css/join.module.css';
import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import { useNavigate, useParams } from 'react-router';

import useAxiosInsance from '@/common/axios/axiosInstance';
import React, { useEffect, useState, useCallback, useRef } from 'react';

const Join = () => {
  const axios = useAxiosInsance();
  const intervalId = useRef(); // 소셜 로그인

  // 통신사 select
  const [selected, setSelected] = useState(false);
  const [selectVal, setSelectVal] = useState('');
  const [etcInput, setEtcInput] = useState(false);

  // 아이디,비번 체크메세지(성공,실패)
  const [emailFailMessage, setEmailFailMessage] = useState('');
  const [pwFailMessage, setPwFailMessage] = useState('');
  const [pwSuccessMessage, setPwSuccessMessage] = useState('');
  const [failVerifyMessage, setFailVerifyMessage] = useState('');

  const [joinInfo, setJoinInfo] = useState({
    email1: '',
    email2: '',
    password: '',
    password_check: '',
    name: '',
    nickname: '',
  });

  const navigate = useNavigate();
  const imgObj = {
    googleLogin: require('@/common/imgs/login/구글로그인.png'),
    kakaoLogin: require('@/common/imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('@/common/imgs/login/카카오로그인아이콘.png'),
    // select: require('/select.png'),
  };

  // 카카오 로그인
  const kakaoLogin = async () => {
    const width = 500; // 팝업의 가로 길이: 500
    const height = 640; // 팝업의 세로 길이 : 500
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    let _kakaowindow = window.open(
      '/api/oauth2/authorization/kakao',
      'kakako-',
      `width=${width},height=${height},left=${left},top=${top}`,
    );

    intervalId.current = setInterval(() => {
      if (!_kakaowindow?.document) return;

      const childcookie = _kakaowindow.document.cookie;
      const parentcookie = document.cookie;

      const [_key1, val1] = childcookie.split('=');
      const [_key2, val2] = parentcookie.split('=');

      if (val1 == val2) {
        navigate('/');
        _kakaowindow.close();
      }
    }, 4000);
  };

  useEffect(() => {
    return () => clearInterval(intervalId.current);
  });

  const goBack = () => {
    navigate(-1);
  };
  //TODO: 유효성검사
  const goJoin = async () => {
    let param = {
      login_id: joinInfo.login_id,
      password: joinInfo.password,
      name: joinInfo.name,
      nickname: joinInfo.nickname,
      email: joinInfo.email1 + '@' + joinInfo.email2,
    };

    let entries = Object.entries(joinInfo);

    let msgMap = {
      login_id: '아이디가 비었습니다.',
      password: '비밀번호가 비었습니다.',
      name: '이름이 비었습니다.',
      nickname: '닉네임이 비었습니다.',
      email1: '이메일이 비었습니다.',
    };

    if(joinInfo.email1.trim() === '' || joinInfo.email1.trim() === null) {
      setEmailFailMessage('이메일을 입력해주세요.');
      document.getElementById('join-info-email1').style.border = '1px solid #ff8888';
      return false;
    }else {
      setEmailFailMessage(null);
      document.getElementById('join-info-email1').style.border = '1px solid #f2f2f2';
    }
    if(joinInfo.email2.trim() === '' || joinInfo.email2.trim() === null) {
      setEmailFailMessage('이메일을 입력해주세요.');
      document.getElementById('join-info-email2').style.border = '1px solid #ff8888';
      return false;
    }else {
      setEmailFailMessage(null);
      document.getElementById('join-info-email2').style.border = '1px solid #f2f2f2';
    }
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*+#?&])[a-zA-Z0-9@$!%*+#?&]{7,}$/;
    if (joinInfo.password.trim() === '' || joinInfo.password.trim() === null) {
      setPwFailMessage('비밀번호를 입력해주세요.');
      document.getElementById('join-info-pw').style.border = '1px solid #ff8888';
      setPwSuccessMessage(null);
      return false;
    }else if (!pwRegex.test(joinInfo.password)) {
      document.getElementById('join-info-pw').style.border = '1px solid #ff8888';
      setPwFailMessage('영문,숫자,특수기호가 포함된 7자리 이상의 비밀번호를 만들어 주세요.');
      setPwSuccessMessage(null);
      return false;
    }if (joinInfo.password_check.trim() === '' || joinInfo.password_check.trim() === null) {
      setPwFailMessage('비밀번호 확인을 입력해주세요.');
      document.getElementById('join-info-re-pw').style.border = '1px solid #ff8888';
      setPwSuccessMessage(null);
      return false;
    } else if (
        joinInfo.password.trim() !== joinInfo.password_check.trim() &&
        joinInfo.password_check.trim() !== ''
    ) {
      document.getElementById('join-info-pw').style.border = '1px solid #ff8888';
      setPwFailMessage('비밀번호 확인이 일치하지 않습니다.');
      setPwSuccessMessage(null);
      return false;
    } else if (joinInfo.password.trim() !== joinInfo.password_check.trim() &&
        joinInfo.password_check.trim() === '')
    {
      document.getElementById('join-info-pw').style.border = '1px solid #f2f2f2';
      setPwFailMessage(null);
      setPwSuccessMessage(null);
      return false;
    }
    if (joinInfo.name.trim() === '' || joinInfo.name.trim() === null) {
      setFailVerifyMessage('개인 정보가 맞지 않습니다. 다시 입력해 주세요.');
      document.getElementById('join-info-name').style.border = '1px solid #ff8888';
      return false;
    } else {
      document.getElementById('join-info-name').style.border = '1px solid #f2f2f2';
      setFailVerifyMessage(null);
    }
    if (joinInfo.nickname.trim() === '' || joinInfo.nickname.trim() === null) {
      setFailVerifyMessage('개인 정보가 맞지 않습니다. 다시 입력해 주세요.');
      document.getElementById('join-info-nickname').style.border = '1px solid #ff8888';
      return false;
    } else {
      document.getElementById('join-info-nickname').style.border = '1px solid #f2f2f2';
      setFailVerifyMessage(null);
    }
      console.log(joinInfo);
    let { status, message } = await axios.post('/signup', param);

    if (status === 200 || status === 201) {
      navigate('/');
    } else {
      // alert(message);
    }
  };
  const selectValue = (index) => {
    setSelectVal(index);
    setSelected(!selected);
    setJoinInfo({ ...joinInfo, email2: index });
  };
  const emailEct = () => {
    setEtcInput(true);
    selectValue('');
  };

  const joinPwCheck = (e) => {
    // const pwRegex =  /^[a-zA-Z0-9](?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{6,}$/
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*+#?&])[a-zA-Z0-9@$!%*+#?&]{7,}$/;
    if (!pwRegex.test(e.target.value)) {
      document.getElementById('join-info-pw').style.border = '1px solid #ff8888';
      setPwFailMessage('영문,숫자,특수기호가 포함된 7자리 이상의 비밀번호를 만들어 주세요.');
      setPwSuccessMessage(null);
      return false;
    } else if (
      e.target.value.trim() !== joinInfo.password_check.trim() &&
      joinInfo.password_check.trim() !== ''
    ) {
      document.getElementById('join-info-pw').style.border = '1px solid #ff8888';
      setPwFailMessage('비밀번호 확인이 일치하지 않습니다.');
      setPwSuccessMessage(null);
      return false;
    } else if (
      e.target.value.trim() !== joinInfo.password_check.trim() &&
      joinInfo.password_check.trim() === ''
    ) {
      document.getElementById('join-info-pw').style.border = '1px solid #f2f2f2';
      setPwFailMessage(null);
      setPwSuccessMessage(null);
      return false;
    } else if (
      pwRegex.test(e.target.value) &&
      e.target.value.trim() === joinInfo.password_check.trim()
    ) {
      document.getElementById('join-info-pw').style.border = '1px solid #f2f2f2';
      document.getElementById('join-info-re-pw').style.border = '1px solid #f2f2f2';
      setPwFailMessage(null);
      setPwSuccessMessage('사용가능한 비밀번호 입니다.');
      setJoinInfo({ ...joinInfo, password: e.target.value });
    }
  };
  const joinPwReCheck = (e) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*+#?&])[a-zA-Z0-9@$!%*+#?&]{7,}$/;
    if (!pwRegex.test(e.target.value)) {
      document.getElementById('join-info-re-pw').style.border = '1px solid #ff8888';
      setPwFailMessage('영문,숫자,특수기호가 포함된 7자리 이상의 비밀번호를 만들어 주세요.');
      setPwSuccessMessage(null);
      return false;
    } else if (e.target.value.trim() !== joinInfo.password.trim()) {
      document.getElementById('join-info-re-pw').style.border = '1px solid #ff8888';
      setPwFailMessage('비밀번호 확인이 일치하지 않습니다.');
      setPwSuccessMessage(null);
      return false;
    } else {
      document.getElementById('join-info-pw').style.border = '1px solid #f2f2f2';
      document.getElementById('join-info-re-pw').style.border = '1px solid #f2f2f2';
      setPwFailMessage(null);
      setPwSuccessMessage('사용가능한 비밀번호 입니다.');
    }
  };

  return (
    <div className={style['outer-container']}>
      <div className={style['nav']}>
        <Nav />
      </div>
      <div className={style['form-container']}>
        <div className={style['inner-container']}>
          <div className={style['form-title']}>
            <h4 className={style['join-title']}>회원가입</h4>
          </div>
          <div className={style['join-form-wrapper']}>
            {/* 아이템 */}
            <div className={[style['join-form-item1'], style['margin-top50']].join(' ')}>
              <div className={style['join-form-subitem1']}>
                <input
                    value={joinInfo.email1}
                    type="text"
                    autoComplete={'off'}
                    id={'join-info-email1'}
                    placeholder={'이메일'}
                    onChange={(e) => setJoinInfo({...joinInfo, email1: e.target.value.trim()})}
                />
              </div>
              @
              {(!etcInput ?
                  <div className={style['join-form-subitem1']}>
                    <input
                        type={'text'}
                        placeholder={'선택'}
                        value={selectVal}
                        autoComplete={'off'}
                        className={style['join-form-select']}
                        id={'join-info-email2'}
                        onClick={() => {
                          setSelected(!selected);
                        }}
                    ></input>
                    <img
                        src={'/select.png'}
                        alt={'select'}
                        className={style['join-form-select-img']}
                        onClick={() => {
                          setSelected(!selected);
                        }}
                    />
                    <div className={style['join-form-subitem1']}>
                    {selected ? (
                        <ul className={style['join-form-option']}>
                          <li className={style['option']} onClick={() => selectValue('naver.com')}>
                            naver.com
                          </li>
                          <li className={style['option']} onClick={() => selectValue('gmail.com')}>
                            gmail.com
                          </li>
                          <li className={style['option']} onClick={() => selectValue('nate.com')}>
                            nate.com
                          </li>
                          <li className={style['option']} onClick={() => selectValue('hanmail.net')}>
                            hanmail.net
                          </li>
                          <li className={style['option']} onClick={() => selectValue('daum.net')}>
                            daum.net
                          </li>
                          <li className={style['option']} onClick={() => emailEct()}>
                            기타
                          </li>
                        </ul>
                    ) : null}
                    </div>
                  </div> :
                  <div className={style['join-form-subitem1']}>
                    <input
                        value={joinInfo.email2}
                        type="text"
                        autoComplete={'off'}
                        id={'join-info-email2'}
                        placeholder={'이메일'}
                        onChange={(e) => setJoinInfo({...joinInfo, email2: e.target.value.trim()})}
                    />
                  </div>)}
              <span className={style['fail-message']}>{emailFailMessage}</span>
            </div>
            {/* 아이템 */}
            <div className={[style['join-form-item'], style['margin-top30']].join(' ')}>
              <div className={style['join-form-subitem2']}>
                <input
                    value={joinInfo.password}
                    placeholder={'비밀번호'}
                    id={'join-info-pw'}
                    type="password"
                    maxLength={20}
                  onChange={(e) => {
                    joinPwCheck(e);
                    setJoinInfo({ ...joinInfo, password: e.target.value.trim() });
                  }}
                />
              </div>
            </div>
            {/* 아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem2']}>
                <input
                  value={joinInfo.password_check}
                  placeholder={'비밀번호 확인'}
                  id={'join-info-re-pw'}
                  type="password"
                  maxLength={20}
                  onChange={(e) => {
                    joinPwReCheck(e);
                    setJoinInfo({ ...joinInfo, password_check: e.target.value.trim() });
                  }}
                />
              </div>
              <span className={style['fail-message']}>{pwFailMessage}</span>
              <span className={style['success-message']}>{pwSuccessMessage}</span>
            </div>
            {/* 아이템 */}
            <div className={[style['join-form-item'], style['margin-top50']].join(' ')}>
              <div className={style['join-form-subitem2']}>
                <input
                  type={'text'}
                  value={joinInfo.name}
                  placeholder={'이름'}
                  maxLength={10}
                  autoComplete={'off'}
                  id={'join-info-name'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, name: e.target.value.trim() })}
                />
              </div>
            </div>
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem2']}>
                <input
                    type={'text'}
                    value={joinInfo.nickname}
                    placeholder={'닉네임'}
                    autoComplete={'off'}
                    maxLength={15}
                    id={'join-info-nickname'}
                    onChange={(e) => setJoinInfo({...joinInfo, nickname: e.target.value.trim()})}
                />
              </div>
              <span className={style['fail-message']}>{failVerifyMessage}</span>
            </div>
            {/* 버튼들 */}
            <div className={style['join-btns-wrapper']}>
              <button className={style['join-btn']} onClick={goJoin}>
              회원가입
              </button>
            </div>
            <div className={style['other-join-form']}>
              <div className={style['other-join']}>
                <p>다른 방법으로 로그인</p>
              </div>
              <div className={style['social-join']}>
                <div>
                  <img
                    src={imgObj.kakaoLoginIcon}
                    onClick={() => kakaoLogin()}
                    alt={'카카오 로그인'}
                  />
                </div>
                <div>
                  <img src={imgObj.googleLogin} alt={'구글 로그인'} />
                </div>
              </div>
              <div className={style['join-options']}>
                <ul className={style['options-ul']}>
                  <li>회원가입</li>
                  <li onClick={() => navigate('/memberFind')}>아이디 찾기 / 비밀번호 바꾸기</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style['footer']}>
      <Footer />
      </div>
    </div>
  );
};

export default Join;

