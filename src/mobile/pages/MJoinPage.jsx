import React, {useEffect, useRef, useState} from "react";
import style from '@/mobile/css/mJoin.css';
import {useNavigate} from "react-router-dom";

const MJoinPage = () => {

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


  return (
    <>
      <div className="join">
        {/*타이틀*/}
        <div className="join-title">
          <h4>회원가입</h4>
        </div>

        {/*로그인 form*/}
        <div className="join-form">
          <div className="join-form-wrapper">
            {/*아이디*/}
            <div className="join-form-item">
              <div className="join-form-subitem1">
                <input
                  value={joinInfo.login_id}
                  placeholder={'아이디'}
                  autoComplete={'off'}
                  id={'join-info-id'}
                  onChange={(e) => {
                    joinIdCheck(e); /**/
                    joinIdInfo(e);
                  }}
                />
                <button className='join-check1' onClick={idCheck}>
                  중복확인
                </button>
              </div>
              <span className='id-fail-message'>{idFailMessage}</span>
              <span className='id-success-message'>{idSuccessMessage}</span>
            </div>

            {/*비밀번호*/}
            <div className="join-form-subitem2 margin-top30">
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

            {/*비밀번호확인*/}
            <div className="join-form-item">
              <div className="join-form-subitem2">
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
              <span className="pw-fail-message">{pwFailMessage}</span>
              <span className="pw-success-message">{pwSuccessMessage}</span>
            </div>

            {/*이름*/}
            <div className="join-form-item margin-top50">
              <div className="join-form-subitem2">
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

            {/*생년월일*/}
            <div className="join-form-item">
              <div className="join-form-subitem2">
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

            {/*통신사*/}
            <div className="join-form-item">
              <div className="join-form-subitem2">
                <input
                  type={'text'}
                  placeholder={'통신사 선택'}
                  value={selectVal}
                  autoComplete={'off'}
                  className='join-form-select'
                  id={'join-info-agency'}
                  onClick={() => {
                    setSelected(!selected);
                  }}
                />
                <br/>
                <img
                  src={'/select.png'}
                  alt={'select'}
                  className='join-form-select-img'
                  onClick={() => {
                    setSelected(!selected);
                  }}
                />
                {selected ? (
                  <ul className='join-form-option'>
                    <li className='option' onClick={() => selectValue('SKT')}>
                      SKT
                    </li>
                    <li className='option' onClick={() => selectValue('KT')}>
                      KT
                    </li>
                    <li className='option' onClick={() => selectValue('LG U+')}>
                      LG U+
                    </li>
                    <li className='option' onClick={() => selectValue('SKT 알뜰폰')}>
                      SKT 알뜰폰
                    </li>
                    <li className='option' onClick={() => selectValue('KT 알뜰폰')}>
                      KT 알뜰폰
                    </li>
                    <li className='option' onClick={() => selectValue('LG U+ 알뜰폰')}>
                      LG U+ 알뜰폰
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>

            {/*전화번호*/}
            <div className="join-form-item">
              <div className="join-form-subitem5">
                <input
                  value={joinInfo.phone}
                  placeholder={'전화번호 입력'}
                  id={'join-info-phone'}
                  autoComplete={'off'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, phone: e.target.value.trim() })}
                />
                <button className='join-check2' onClick={() => verifyTransmissionBtn()}>
                  인증번호 전송
                </button>
              </div>
            </div>

            {/*인증번호*/}
            <div className="join-form-item">
              <div className="join-form-subitem5">
                <input
                  value={joinInfo.accreditNum}
                  placeholder={'인증번호 4자리 입력'}
                  type={'number'}
                  id={'accreditNum'}
                  autoComplete={'off'}
                  onChange={(e) => verifyLengthChk(e)}
                  maxLength={4}
                />
                <div className='timer' id={'timer'}>
                  {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </div>
                <button className='join-check2' onClick={verifyConfirmBtn}>
                  확인
                </button>
              </div>
            </div>

            {/*이메일*/}
            <div className="join-form-item margin-top50">
              <div className="join-form-subitem3">
                <input
                  value={joinInfo.email1}
                  type="text"
                  autoComplete={'off'}
                  placeholder={'이메일 (선택사항)'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, email1: e.target.value.trim() })}
                />
                <spanp>@</spanp>
                <input
                  value={joinInfo.email2}
                  type="text"
                  autoComplete={'off'}
                  placeholder={'이메일 (선택사항)'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, email2: e.target.value.trim() })}
                />
              </div>
            </div>

            {/*인증번호*/}
            <div className="join-form-item">
              <div className="join-form-subitem4">
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
          </div>




          <div className={'normal-join margin-top30'}>
            <button className="normal-join-btn" onClick={goJoin}>
              확인
            </button>
          </div>
        </div>
        
        {/*다른 방법으로 로그인*/}
        <div className="other-login-div margin-top50">
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
              <li onClick={() => navigate('/mo/memberFind')}>아이디 찾기 / 비밀번호 바꾸기</li>
              <li onClick={() => navigate('/mo/chat')}>문의하기</li>
            </ul>
          </div>
        </div>
      </div>
    </>
    )
}

export default MJoinPage;
