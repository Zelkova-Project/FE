import style from '../css/join.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../axios/axiosInstance';
import React, { useEffect, useState, useCallback, useRef } from 'react';

const Join = () => {
  const intervalId = useRef(); // 소셜 로그인

  // 통신사 select
  const [selected, setSelected] = useState(false);
  const [selectVal, setSelectVal] = useState('');

  // 아이디 중복체크 버튼
  const [idCheckBtn, setIdCheckBtn] = useState(false);

  // 아이디,비번 체크메세지(성공,실패)
  const [idFailMessage, setIdFailMessage] = useState('');
  const [idSuccessMessage, setIdSuccessMessage] = useState('');
  const [pwFailMessage, setPwFailMessage] = useState('');
  const [pwSuccessMessage, setPwSuccessMessage] = useState('');
  // 폰 인증
  const [verifyMessage, setVerifyMessage] = useState(''); // 인증번호 발송 메세지
  const [failVerifyMessage, setFailVerifyMessage] = useState(''); // 인증번호 전송버튼 오류시
  const [failVerifyNumMessage, setFailVerifyNumMessage] = useState(''); // 인증번호 확인 오류시
  const [verifyBtn, setVerifyBtn] = useState(false); // 인증번호 전송버튼 클릭체크
  const [verifyNumBtn, setVerifyNumBtn] = useState(false); // 인증번호 확인 클릭체크

  // 타이머
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [isRunning, setIsRunning] = useState(false);
  const [joinInfo, setJoinInfo] = useState({
    login_id: '',
    password: '',
    password_check: '',
    name: '',
    birth: '',
    agency: '',
    phone: '',
    accreditNum: '',
    email1: '',
    email2: '',
    info: '',
    // nickname: 'test',
  });

  const navigate = useNavigate();
  const imgObj = {
    googleLogin: require('../imgs/login/구글로그인.png'),
    kakaoLogin: require('../imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('../imgs/login/카카오로그인아이콘.png'),
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
      birth: joinInfo.birth,
      // agency: '',  보류
      // phone: '', 보류
      // accreditNum: '', 보류
      email: joinInfo.email1 + '@' + joinInfo.email2,
      info: joinInfo.info,
      // nickname: '',
    };

    let entries = Object.entries(joinInfo);

    let msgMap = {
      login_id: '아이디가 비었습니다.',
      password: '비밀번호가 비었습니다.',
      name: '이름이 비었습니다.',
      nickname: '닉네임이 비었습니다.',
      email1: '이메일이 비었습니다.',
    };

    // for (let entry of entries) {
    //   let [key, val] = entry;
    //   if (!val) {
    //     // alert(`${msgMap[key]}`);
    //     return;
    //   }
    //
    //   if (key != 'password_check')
    //     param[key] = val;
    // }
    if (joinInfo.login_id.trim() === '' || joinInfo.login_id.trim() === null) {
      setIdFailMessage('아이디를 입력해주세요.');
      setIdSuccessMessage(null);
      return false;
    }
    if (idCheckBtn === false) {
      setIdFailMessage('아이디 중복확인을 해주세요.');
      setIdSuccessMessage(null);
      return false;
    }
    if (joinInfo.password.trim() === '' || joinInfo.password.trim() === null) {
      setPwFailMessage('비밀번호를 입력해주세요.');
      setPwSuccessMessage(null);
      return false;
    }
    if (joinInfo.password_check.trim() === '' || joinInfo.password_check.trim() === null) {
      setPwFailMessage('비밀번호 확인을 입력해주세요.');
      setPwSuccessMessage(null);
      return false;
    }
    if (joinInfo.name.trim() === '' || joinInfo.name.trim() === null) {
      setFailVerifyMessage('개인 정보가 맞지 않습니다. 다시 입력해 주세요.');
      document.getElementById('join-info-name').style.border = '1px solid #ff8888';
      setVerifyMessage(null);
      return false;
    } else {
      setFailVerifyMessage(null);
      document.getElementById('join-info-name').style.border = '1px solid #f2f2f2';
      setVerifyMessage(null);
    }
    if (joinInfo.birth === '' || joinInfo.birth === null || joinInfo.birth.length !== 8) {
      setFailVerifyMessage('개인 정보가 맞지 않습니다. 다시 입력해 주세요.');
      document.getElementById('join-info-birth').style.border = '1px solid #ff8888';
      setVerifyMessage(null);
      return false;
    } else {
      setFailVerifyMessage(null);
      document.getElementById('join-info-birth').style.border = '1px solid #f2f2f2';
      setVerifyMessage(null);
    }
    if (joinInfo.agency === '' || joinInfo.agency === null) {
      setFailVerifyMessage('개인 정보가 맞지 않습니다. 다시 입력해 주세요.');
      document.getElementById('join-info-agency').style.border = '1px solid #ff8888';
      setVerifyMessage(null);
      return false;
    } else {
      setFailVerifyMessage(null);
      document.getElementById('join-info-agency').style.border = '1px solid #f2f2f2';
      setVerifyMessage(null);
    }
    // if (joinInfo.phone === '' || joinInfo.phone === null) {
    //   setFailVerifyMessage('가입된 전화번호가 아닙니다. 다시 입력해 주세요.');
    //   document.getElementById('join-info-phone').style.border = '1px solid #ff8888';
    //   setVerifyMessage(null);
    //   return false;
    // }else {
    //   setFailVerifyMessage(null);
    //   document.getElementById('join-info-phone').style.border = '1px solid #f2f2f2';
    //   setVerifyMessage(null);
    // }
    // if (joinInfo.accreditNum === '' || joinInfo.accreditNum === null || joinInfo.accreditNum.length !== 4) {
    //   setFailVerifyNumMessage('인증 번호가 맞지 않습니다. 다시 입력해 주세요.');
    //   document.getElementById('accreditNum').style.border = '1px solid #ff8888';
    //   setVerifyMessage(null);
    //   return false;
    // }else {
    //   setFailVerifyNumMessage(null);
    //   document.getElementById('accreditNum').style.border = '1px solid #f2f2f2';
    //   setVerifyMessage(null);
    // }
    if (verifyBtn === false) {
      setFailVerifyMessage('인증번호 전송 버튼을 눌러주세요.');
      setVerifyMessage(null);
      return false;
    }
    if (verifyNumBtn === false) {
      setFailVerifyMessage('인증번호 확인 버튼을 눌러주세요.');
      setVerifyMessage(null);
      return false;
    }

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
    setJoinInfo({ ...joinInfo, agency: index });
  };

  const joinIdInfo = (e) => {
    setJoinInfo({ ...joinInfo, login_id: e.target.value.trim() });
    setIdCheckBtn(false);
  };
  const joinIdCheck = (e) => {
    const idRegex = /^[a-zA-Z](?=.*\d)[a-zA-Z0-9]{6,}$/;
    if (e.target.value.trim() === '') {
      setIdFailMessage('아이디를 입력해주세요.');
      setIdSuccessMessage(null);
      return false;
    } else if (!idRegex.test(e.target.value.trim())) {
      setIdFailMessage('영문, 숫자가 포함된 7자리 이상의 아이디를 만들어 주세요.');
      setIdSuccessMessage(null);
      return false;
    } else {
      setJoinInfo(e.target.value);
      setIdSuccessMessage(null);
      setIdFailMessage(null);
    }
  };
  const idCheck = async () => {
    if (joinInfo.login_id.trim() === '' || joinInfo.login_id.trim() === null) {
      document.getElementById('join-info-id').style.border = '1px solid #ff8888';
      setIdFailMessage('아이디를 입력해주세요.');
      setIdSuccessMessage(null);
      return false;
    }
    const idRegex = /^[a-zA-Z](?=.*\d)[a-zA-Z0-9]{6,}$/;
    if (!idRegex.test(joinInfo.login_id)) {
      document.getElementById('join-info-id').style.border = '1px solid #ff8888';
      setIdFailMessage('영문, 숫자가 포함된 7자리 이상의 아이디를 만들어 주세요.');
      setIdSuccessMessage(null);
      return false;
    }
    let loginParam = {
      loginId: joinInfo.login_id,
    };
    const res = await axios.get(`/accounts/availability?loginId=${loginParam.loginId}`);
    // 성공 핸들링
    try {
      if (res.data.possible === true) {
        document.getElementById('join-info-id').style.border = '1px solid #f2f2f2';
        setIdSuccessMessage('사용가능한 아이디 입니다.');
        setIdFailMessage(null);
        setIdCheckBtn(true);
      } else {
        document.getElementById('join-info-id').style.border = '1px solid #ff8888';
        setIdFailMessage('중복된 아이디입니다.');
        setIdSuccessMessage(null);
        return false;
      }
    } catch (error) {
      console.log(error);
    }
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
  const joinBirthCheck = (e) => {
    // 입력 값이 8자를 초과하지 않도록 제한
    if (e.target.value.length <= 8) {
      setJoinInfo({ ...joinInfo, birth: e.target.value });
    }
  };
  const verifyTransmissionBtn = () => {
    if (joinInfo.phone.trim() === '') {
      document.getElementById('join-info-phone').style.border = '1px solid #ff8888';
      setFailVerifyMessage('가입된 전화번호가 아닙니다. 다시 입력해 주세요.');
      setVerifyMessage(null);
      return false;
    } else {
      document.getElementById('join-info-phone').style.border = '1px solid #f2f2f2';
      setVerifyMessage('인증번호가 오지 않나요?');
      setFailVerifyMessage(null);
      setVerifyBtn(true);
      handleStart();
    }
  };
  const verifyConfirmBtn = () => {
    if (verifyBtn === false) {
      setFailVerifyMessage('인증 번호전송 버튼을 눌러주세요');
    } else if (joinInfo.accreditNum === '' || joinInfo.accreditNum.length !== 4) {
      // 인증번호칸이 빈칸일 경우 + 인증번호가 틀릴시
      setFailVerifyNumMessage('인증 번호가 맞지 않습니다. 다시 입력해 주세요.');
      document.getElementById('accreditNum').style.border = '1px solid #ff8888';
      document.getElementById('accreditNum').focus();
      return false;
    } else {
      document.getElementById('accreditNum').style.border = '1px solid #f2f2f2';
      setIsRunning(false);
      document.getElementById('timer').style.display = 'none';
      setFailVerifyNumMessage(null);
      setFailVerifyMessage(null);
      setVerifyNumBtn(true);
    }
    // 인증번호가 맞을지
    /*setIdFailVerifyNumMessage(null)
        setIdFailVerifyMessage(null);
        setIdVerifyNumBtn(true)
        */
  };
  const verifyLengthChk = (e) => {
    // 인증번호 8자리제한
    if (e.target.value.length <= 4) {
      setJoinInfo({ ...joinInfo, accreditNum: e.target.value });
    }
  };

  // 타이머
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else if (minutes === 0 && seconds === 1) {
          setIsRunning(false);
          document.getElementById('timer').style.display = 'none';
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const handleStart = () => {
    setIsRunning(true);
    document.getElementById('timer').style.display = 'block';
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(1);
    setSeconds(59);
    handleStart();
  };
  return (
    <div className={style['outer-container']}>
      <Nav />
      <div className={style['form-container']}>
        <div className={style['inner-container']}>
          <div className={style['form-title']}>
            <h4 className={style['join-title']}>회원가입</h4>
          </div>

          <div className={style['join-form-wrapper']}>
            {/* 아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem1']}>
                <input
                  value={joinInfo.login_id}
                  placeholder={'아이디'}
                  autoComplete={'off'}
                  id={'join-info-id'}
                  onChange={(e) => {
                    // setJoinInfo({...joinInfo, login_id: e.target.value});
                    joinIdCheck(e);
                    joinIdInfo(e);
                  }}
                />
                <button className={style['join-check']} onClick={idCheck}>
                  중복확인
                </button>
              </div>
            </div>
            <span className={style['id-fail-message']}>{idFailMessage}</span>
            <span className={style['id-success-message']}>{idSuccessMessage}</span>
            {/*<span className={style['regex-message']}>{idBlankMessage}</span>*/}

            {/* 아이템 */}
            <div className={[style['join-form-item'], style['margin-top30']].join(' ')}>
              <div className={style['join-form-subitem2']}>
                <input
                  value={joinInfo.password}
                  placeholder={'비밀번호'}
                  id={'join-info-pw'}
                  type="password"
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
                  onChange={(e) => {
                    joinPwReCheck(e);
                    setJoinInfo({ ...joinInfo, password_check: e.target.value.trim() });
                  }}
                />
              </div>
              <span className={style['pw-fail-message']}>{pwFailMessage}</span>
              <span className={style['pw-success-message']}>{pwSuccessMessage}</span>
            </div>
            {/* 아이템 */}
            <div className={[style['join-form-item'], style['margin-top50']].join(' ')}>
              <div className={style['join-form-subitem2']}>
                <input
                  type={'text'}
                  value={joinInfo.name}
                  placeholder={'이름'}
                  autoComplete={'off'}
                  id={'join-info-name'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, name: e.target.value.trim() })}
                />
              </div>
            </div>

            {/*아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem2']}>
                <input
                  type={'number'}
                  placeholder={'생년월일(YYYYMMDD)'}
                  id={'join-info-birth'}
                  autoComplete={'off'}
                  value={joinInfo.birth}
                  onChange={joinBirthCheck}
                  maxLength={8}
                />
              </div>
            </div>
            {/*아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem2']}>
                <input
                  type={'text'}
                  placeholder={'통신사 선택'}
                  value={selectVal}
                  autoComplete={'off'}
                  className={style['join-form-select']}
                  id={'join-info-agency'}
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
                {selected ? (
                  <ul className={style['join-form-option']}>
                    <li className={style['option']} onClick={() => selectValue('SKT')}>
                      SKT
                    </li>
                    <li className={style['option']} onClick={() => selectValue('KT')}>
                      KT
                    </li>
                    <li className={style['option']} onClick={() => selectValue('LG U+')}>
                      LG U+
                    </li>
                    <li className={style['option']} onClick={() => selectValue('SKT 알뜰폰')}>
                      SKT 알뜰폰
                    </li>
                    <li className={style['option']} onClick={() => selectValue('KT 알뜰폰')}>
                      KT 알뜰폰
                    </li>
                    <li className={style['option']} onClick={() => selectValue('LG U+ 알뜰폰')}>
                      LG U+ 알뜰폰
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>

            {/* 아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem1']}>
                <input
                  value={joinInfo.phone}
                  placeholder={'전화번호 입력'}
                  id={'join-info-phone'}
                  autoComplete={'off'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, phone: e.target.value.trim() })}
                />
                <button className={style['join-check']} onClick={() => verifyTransmissionBtn()}>
                  인증번호 전송
                </button>
              </div>
            </div>
            {/* 아이템 */}
            <div>
              <div className={style['join-form-item']}>
                <div className={style['join-form-subitem1']}>
                  <input
                    value={joinInfo.accreditNum}
                    placeholder={'인증번호 4자리 입력'}
                    type={'number'}
                    id={'accreditNum'}
                    autoComplete={'off'}
                    onChange={(e) => verifyLengthChk(e)}
                    maxLength={4}
                  />
                  <div className={style['timer']} id={'timer'}>
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                  </div>
                  <button className={style['join-check']} onClick={verifyConfirmBtn}>
                    확인
                  </button>
                </div>
              </div>
              <div className={style['message']}>
                <span className={style['verify-message']} onClick={handleReset}>
                  {verifyMessage}
                </span>
                <span className={style['fail-verify-message']}>{failVerifyMessage}</span>
                <span className={style['fail-verify-num-message']}>{failVerifyNumMessage}</span>
              </div>
            </div>
            {/* 아이템 */}
            <div className={[style['join-form-item'], style['margin-top50']].join(' ')}>
              <div className={style['join-form-subitem3']}>
                <input
                  value={joinInfo.email1}
                  type="text"
                  autoComplete={'off'}
                  placeholder={'이메일 (선택사항)'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, email1: e.target.value.trim() })}
                />
                @
                <input
                  value={joinInfo.email2}
                  type="text"
                  autoComplete={'off'}
                  placeholder={'이메일 (선택사항)'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, email2: e.target.value.trim() })}
                />
              </div>
            </div>
            {/* 아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem4']}>
                <textarea
                  cols="30"
                  rows="300"
                  placeholder={'학생 소개를 간단히 작성해주세요.'}
                  autoComplete={'off'}
                  value={joinInfo.info}
                  onChange={(e) => setJoinInfo({ ...joinInfo, info: e.target.value })}
                ></textarea>
              </div>
            </div>

            {/* 버튼들 */}
            <div className={style['join-btns-wrapper']}>
              {/*<button className="cancel-join-btn" onClick={goBack}>*/}
              {/*  취소*/}
              {/*</button>*/}
              <button className={style['join-btn']} onClick={goJoin}>
                확인
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
                  <li onClick={() => navigate('/chat')}>문의하기</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Join;
