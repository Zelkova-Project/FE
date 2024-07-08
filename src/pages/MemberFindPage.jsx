import style from '../css/memberFind.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from '../axios/axiosInstance';
import React, { useEffect, useRef, useState } from 'react';
import PwUpdatePage from './PwUpdatePage';

const MemberFindPage = () => {
  const navigate = useNavigate();
  const intervalId = useRef(); // 소셜 로그인

  const [findSelect, setFindSelect] = useState(false); // false : 아이디 찾기, true : 비밀번호 찾기

  const [idSelected, setIdSelected] = useState(false); //아이디 찾기 - 통신사 메뉴창
  const [idSelectVal, setIdSelectVal] = useState(''); // 아이디 찾기 - 통신사 값
  const [idVerifyMessage, setIdVerifyMessage] = useState(''); // 아이디 찾기 - 인증번호 발송 메세지
  const [idFailVerifyMessage, setIdFailVerifyMessage] = useState(''); // 아이디 찾기 - 인증번호 전송버튼 오류시
  const [idFailVerifyNumMessage, setIdFailVerifyNumMessage] = useState(''); // 아이디 찾기 - 인증번호 확인 오류시
  const [idVerifyBtn, setIdVerifyBtn] = useState(false); // 아이디 찾기 - 인증번호 전송버튼 클릭체크
  const [idVerifyNumBtn, setIdVerifyNumBtn] = useState(false); // 아이디 찾기 - 인증번호 확인 클릭체크

  const [pwSelected, setPwSelected] = useState(false); // 비밀번호 찾기 - 통신사 메뉴창
  const [pwSelectVal, setPwSelectVal] = useState(''); // 비밀번호 찾기 - 통신사 값
  const [pwIdFailMessage, setPwIdFailMessage] = useState(''); // 비밀번호 찾기 - 아이디 빈칸시
  const [pwVerifyMessage, setPwVerifyMessage] = useState(''); // 비밀번호 찾기 - 인증번호 발송 메세지
  const [pwFailVerifyMessage, setPwFailVerifyMessage] = useState(''); // 비밀번호 찾기 - 인증번호 전송버튼 오류시
  const [pwFailVerifyNumMessage, setPwFailVerifyNumMessage] = useState(''); // 비밀번호 찾기 - 인증번호 확인 오류시
  const [pwVerifyBtn, setPwVerifyBtn] = useState(false); // 비밀번호 찾기 - 인증번호 전송버튼 클릭체크
  const [pwVerifyNumBtn, setPwVerifyNumBtn] = useState(false); // 비밀번호 찾기 - 인증번호 확인 클릭체크
  const [pwUpdate, setPwUpdate] = useState(false); // 새 비밀번호 변경

  const [idFindModalOpen, setIdFindModalOpen] = useState(false); // 아이디 찾기 모달
  const [pwFindModalOpen, setPwFindModalOpen] = useState(false); // 비밀번호 찾기 모달
  // 타이머
  const [idMinutes, setIdMinutes] = useState(1);
  const [idSeconds, setIdSeconds] = useState(59);
  const [isIdRunning, setIsIdRunning] = useState(false);
  const [pwMinutes, setPwMinutes] = useState(1);
  const [pwSeconds, setPwSeconds] = useState(59);
  const [isPwRunning, setIsPwRunning] = useState(false);
  const [idFindInfo, setIdFindInfo] = useState({
    name: '',
    agency: '',
    birth: '',
    phone: '',
    verify: '',
  });
  const [pwFindInfo, setPwFindInfo] = useState({
    id: '',
    name: '',
    phone: '',
    agency: '',
    birth: '',
    verify: '',
  });
  sessionStorage.setItem('name', pwFindInfo.name);

  const imgObj = {
    googleLogin: require('../imgs/login/구글로그인.png'),
    kakaoLogin: require('../imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('../imgs/login/카카오로그인아이콘.png'),
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

  // 리뷰쓰기 Modal1 스타일
  const idModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: '100',
    },
    content: {
      width: '380px',
      height: '200px',
      margin: 'auto',
      WebkitOverflowScrolling: 'touch',
      background: '#fff',
      borderRadius: '10px',
      outline: 'none',
      padding: '20px',
      overflow: 'auto',
      zIndex: '102',
    },
  };

  const idSelectValue = (index) => {
    setIdSelectVal(index);
    setIdSelected(!idSelected);
    setIdFindInfo({ ...idFindInfo, agency: index.value });
  };
  const birthLengthChk = (e) => {
    // 아이디 찾기 - 생일 8자리제한
    if (e.target.value.length <= 8) {
      setIdFindInfo({ ...idFindInfo, birth: e.target.value });
    }
  };
  const pwBirthLengthChk = (e) => {
    // 비밀번호 찾기 - 생일 8자리제한
    if (e.target.value.length <= 8) {
      setPwFindInfo({ ...pwFindInfo, birth: e.target.value });
    }
  };
  const idVerifyLengthChk = (e) => {
    // 아이디 찾기 - 인증번호 4자리제한
    if (e.target.value.length <= 4) {
      setIdFindInfo({ ...idFindInfo, verify: e.target.value });
    }
  };
  const pwVerifyLengthChk = (e) => {
    // 비밀번호 찾기 - 인증번호 4자리제한
    if (e.target.value.length <= 4) {
      setPwFindInfo({ ...pwFindInfo, verify: e.target.value });
    }
  };
  const idVerifyTransmissionBtn = () => {
    if (idFindInfo.phone === '') {
      document.getElementById('id-phone').style.border = '1px solid #ff8888';
      setIdFailVerifyMessage('가입된 전화번호가 아닙니다. 다시 입력해 주세요.');
      setIdVerifyMessage(null);
      return false;
    } else {
      document.getElementById('id-phone').style.border = '1px solid #f2f2f2';
      setIdVerifyMessage('인증번호가 오지 않나요?');
      setIdFailVerifyMessage(null);
      setIdVerifyBtn(true);
      idTimerStart();
    }
  };
  const idVerifyConfirmBtn = () => {
    if (idFindInfo.verify === '' || idFindInfo.verify.length !== 4) {
      // 인증번호칸이 빈칸일 경우 + 인증번호가 틀릴시
      document.getElementById('id-verify').style.border = '1px solid #ff8888';
      setIdFailVerifyNumMessage('인증번호가 맞지 않습니다. 다시 입력해 주세요.');
      return false;
    } else {
      setIsIdRunning(false);
      document.getElementById('id-timer').style.display = 'none';
      document.getElementById('id-verify').style.border = '1px solid #f2f2f2';
      setIdFailVerifyNumMessage(null);
      setIdFailVerifyMessage(null);
      setIdVerifyNumBtn(true);
    }
    // 인증번호가 맞을지
    /*setIdFailVerifyNumMessage(null)
        setIdFailVerifyMessage(null);
        setIdVerifyNumBtn(true)
        */
  };

  const goIdFind = () => {
    if (idFindInfo.name === '') {
      document.getElementById('id-name').focus();
      return false;
    }
    if (idFindInfo.birth === '' || idFindInfo.birth.length !== 8) {
      document.getElementById('id-birth').focus();
      return false;
    }
    if (idFindInfo.agency === '') {
      document.getElementById('id-agency').focus();
      return false;
    }
    if (idFindInfo.phone === '') {
      document.getElementById('id-phone').focus();
      return false;
    }
    if (idFindInfo.verify === '') {
      document.getElementById('id-verify').focus();
      return false;
    }
    if (idVerifyBtn === false) {
      setIdFailVerifyMessage('인증번호 전송 버튼을 눌러주세요.');
      return false;
    }
    if (idVerifyNumBtn === false) {
      setIdFailVerifyNumMessage('인증번호가 맞지 않습니다. 다시 입력해 주세요.');
      return false;
    } else if (idVerifyBtn === true && idVerifyNumBtn === true) {
      setIdFindModalOpen(true);
    }
  };
  const modalClose = () => {
    setIdFindModalOpen(false);
  };
  const modalLogin = () => {
    navigate('/login');
  };

  const pwSelectValue = (index) => {
    setPwSelectVal(index);
    setPwSelected(!pwSelected);
    setPwFindInfo({ ...pwFindInfo, agency: index.value });
  };
  const pwVerifyTransmissionBtn = () => {
    if (pwFindInfo.phone === '') {
      document.getElementById('pw-phone').style.border = '1px solid #ff8888';
      setPwFailVerifyMessage('가입된 전화번호가 아닙니다. 다시 입력해 주세요.');
      setPwVerifyMessage(null);
      return false;
    } else {
      document.getElementById('pw-phone').style.border = '1px solid #f2f2f2';
      setPwVerifyMessage('인증번호가 오지 않나요?');
      setPwFailVerifyMessage(null);
      setPwVerifyBtn(true);
      pwTimerStart();
    }
  };
  const pwVerifyConfirmBtn = () => {
    if (pwFindInfo.verify === '' || pwFindInfo.verify.length !== 4) {
      // 인증번호칸이 빈칸일 경우 + 인증번호가 틀릴시
      document.getElementById('pw-verify').style.border = '1px solid #ff8888';
      setPwFailVerifyNumMessage('인증번호가 맞지 않습니다. 다시 입력해 주세요.');
      return false;
    } else {
      setIsPwRunning(false);
      document.getElementById('pw-timer').style.display = 'none';
      document.getElementById('pw-verify').style.border = '1px solid #f2f2f2';
      setPwFailVerifyNumMessage(null);
      setPwFailVerifyMessage(null);
      setPwVerifyNumBtn(true);
    }
    // 인증번호가 맞을지
    /*setIdFailVerifyNumMessage(null)
        setIdFailVerifyMessage(null);
        setIdVerifyNumBtn(true)
        */
  };
  const goPwFind = async () => {
    if (pwFindInfo.id === '') {
      setPwIdFailMessage('가입된 아이디가 아닙니다. 다시 입력해 주세요.');
      document.getElementById('pw-id').style.border = '1px solid #ff8888';
      document.getElementById('pw-id').focus();
      return false;
    }
    let pwFindParam = {
      loginId: pwFindInfo.id,
    };
    const res = await axios.get(`/accounts/availability?loginId=${pwFindParam.loginId}`);
    // 성공 핸들링
    try {
      if (res.data.possible === true) {
        setPwIdFailMessage('가입된 아이디가 아닙니다. 다시 입력해 주세요.');
        document.getElementById('pw-id').style.border = '1px solid #ff8888';
        return false;
      } else {
        document.getElementById('pw-id').style.border = '1px solid #f2f2f2';
        setPwIdFailMessage(null);
      }
    } catch (error) {
      // 에러 핸들링
      console.log('error : ', error);
    }
    if (pwFindInfo.name === '') {
      // document.getElementById('pw-name').focus();
      return false;
    }
    if (pwFindInfo.birth === '' || pwFindInfo.birth.length !== 8) {
      document.getElementById('pw-birth').focus();
      return false;
    }
    if (pwFindInfo.agency === '') {
      document.getElementById('pw-agency').focus();
      return false;
    }
    if (pwFindInfo.phone === '') {
      document.getElementById('pw-phone').focus();
      return false;
    }
    if (pwFindInfo.verify === '') {
      document.getElementById('pw-verify').focus();
      return false;
    }
    if (pwVerifyBtn === false) {
      setPwFailVerifyMessage('인증번호 전송 버튼을 눌러주세요.');
      return false;
    }
    if (pwVerifyNumBtn === false) {
      setPwFailVerifyNumMessage('인증번호가 맞지 않습니다. 다시 입력해 주세요.');
      return false;
    } else if (pwVerifyBtn === true && pwVerifyNumBtn === true) {
      setPwFindModalOpen(true);
    }
  };
  const modalPwUpdate = () => {
    setPwUpdate(true);
    setPwFindModalOpen(false);
  };

  // 타이머
  useEffect(() => {
    let interval;
    if (isIdRunning) {
      interval = setInterval(() => {
        if (idSeconds === 0) {
          setIdMinutes((prevIdMinutes) => prevIdMinutes - 1);
          setIdSeconds(59);
        } else if (idMinutes === 0 && idSeconds === 1) {
          setIsIdRunning(false);
          document.getElementById('id-timer').style.display = 'none';
        } else {
          setIdSeconds((prevIdSeconds) => prevIdSeconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isIdRunning, idSeconds]);

  useEffect(() => {
    let interval;
    if (isPwRunning) {
      interval = setInterval(() => {
        if (pwSeconds === 0) {
          setPwMinutes((prevPwMinutes) => prevPwMinutes - 1);
          setPwSeconds(59);
        } else if (pwMinutes === 0 && pwSeconds === 1) {
          setIsPwRunning(false);
          document.getElementById('pw-timer').style.display = 'none';
        } else {
          setPwSeconds((prevPwSeconds) => prevPwSeconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPwRunning, pwSeconds]);

  const idTimerStart = () => {
    setIsIdRunning(true);
    document.getElementById('id-timer').style.display = 'block';
  };

  const idTimerReset = () => {
    setIsIdRunning(false);
    setIdMinutes(1);
    setIdSeconds(59);
    idTimerStart();
  };
  const pwTimerStart = () => {
    setIsPwRunning(true);
    document.getElementById('pw-timer').style.display = 'block';
  };

  const pwTimerReset = () => {
    setIsPwRunning(false);
    setPwMinutes(1);
    setPwSeconds(59);
    pwTimerStart();
  };

  return (
    <div className={style['container']}>
      <Nav />
      {!findSelect ? (
        // 아이디 찾기
        <div className={style['wrap']}>
          <div className={style['main-title']}>
            <div className={style['title-id-find1']}>아이디 찾기</div>
            <div className={style['title-pw-find1']} onClick={() => setFindSelect(true)}>
              비밀번호 바꾸기
            </div>
          </div>
          <div className={style['find-form']}>
            <div className={style['sub-title']}>가입하신 전화번호를 입력해주세요.</div>
            <div className={style['find-item']}>
              <div className={style['find-sub-item']}>
                <input
                  type={'text'}
                  placeholder={'이름'}
                  id={'id-name'}
                  autoComplete={'off'}
                  value={idFindInfo.name}
                  onChange={(e) => setIdFindInfo({ ...idFindInfo, name: e.target.value.trim() })}
                />
              </div>
            </div>
            <div className={style['find-item']}>
              <div className={style['find-sub-item']}>
                <input
                  type={'number'}
                  placeholder={'생년월일(YYYYMMDD)'}
                  id={'id-birth'}
                  autoComplete={'off'}
                  value={idFindInfo.birth}
                  onChange={(e) => birthLengthChk(e)}
                  maxLength={8}
                />
              </div>
            </div>
            <div className={style['find-item']}>
              <div className={style['find-sub-item']}>
                <input
                  type={'text'}
                  placeholder={'통신사 선택'}
                  value={idSelectVal}
                  id={'id-agency'}
                  autoComplete={'off'}
                  className={style['find-select']}
                  onClick={() => {
                    setIdSelected(!idSelected);
                  }}
                ></input>
                <img
                  src={'/select.png'}
                  alt={'select'}
                  className={style['find-select-img']}
                  onClick={() => {
                    setIdSelected(!idSelected);
                  }}
                />
                {idSelected ? (
                  <ul className={style['find-option']}>
                    <li className={style['option']} onClick={() => idSelectValue('SKT')}>
                      SKT
                    </li>
                    <li className={style['option']} onClick={() => idSelectValue('KT')}>
                      KT
                    </li>
                    <li className={style['option']} onClick={() => idSelectValue('LG U+')}>
                      LG U+
                    </li>
                    <li className={style['option']} onClick={() => idSelectValue('SKT 알뜰폰')}>
                      SKT 알뜰폰
                    </li>
                    <li className={style['option']} onClick={() => idSelectValue('KT 알뜰폰')}>
                      KT 알뜰폰
                    </li>
                    <li className={style['option']} onClick={() => idSelectValue('LG U+ 알뜰폰')}>
                      LG U+ 알뜰폰
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
            <div className={style['find-item1']}>
              <div className={style['find-sub-item2']}>
                <input
                  type={'text'}
                  placeholder={'전화번호 입력'}
                  autoComplete={'off'}
                  id={'id-phone'}
                  value={idFindInfo.phone}
                  onChange={(e) => setIdFindInfo({ ...idFindInfo, phone: e.target.value.trim() })}
                />
                <button className={style['find-button']} onClick={idVerifyTransmissionBtn}>
                  인증번호 전송
                </button>
              </div>
            </div>
            <div className={style['find-item1']}>
              <div className={style['find-sub-item2']}>
                <input
                  type={'number'}
                  placeholder={'인증번호 4자리 입력'}
                  autoComplete={'off'}
                  onChange={(e) => idVerifyLengthChk(e)}
                  id={'id-verify'}
                  maxLength={4}
                  value={idFindInfo.verify}
                />
                <div className={style['id-timer']} id={'id-timer'}>
                  {idMinutes.toString().padStart(2, '0')}:{idSeconds.toString().padStart(2, '0')}
                </div>
                <button className={style['find-button']} onClick={idVerifyConfirmBtn}>
                  확인
                </button>
              </div>
            </div>
          </div>
          <span className={style['id-verify-message']} onClick={idTimerReset}>
            {idVerifyMessage}
          </span>
          <span className={style['id-fail-verify-message']}>{idFailVerifyMessage}</span>
          <span className={style['id-fail-verify-num-message']}>{idFailVerifyNumMessage}</span>

          <div className={style['find-btn-wrap']}>
            <button className={style['find-btn']} onClick={() => goIdFind()}>
              확인
            </button>
          </div>
          <Modal isOpen={idFindModalOpen} ariaHideApp={false} style={idModalStyle}>
            <div className={style['modal-wrap']}>
              <div className={style['modal-title']}>아이디 찾기</div>
              <div className={style['modal-text1']}>{idFindInfo.name}님의 아이디는 </div>
              <div className={style['modal-text2']}>
                <span>test11</span> 입니다.
              </div>
              <div className={style['modal-button-wrap']}>
                <button className={style['modal-close']} onClick={modalClose}>
                  닫기
                </button>
                <button className={style['modal-login']} onClick={modalLogin}>
                  로그인
                </button>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        // 비밀번호 찾기
        <div className={style['wrap']}>
          <div className={style['main-title']}>
            <div className={style['title-id-find2']} onClick={() => setFindSelect(false)}>
              아이디 찾기
            </div>
            <div className={style['title-pw-find2']}>비밀번호 바꾸기</div>
          </div>
          {!pwUpdate ? (
            <div>
              <div className={style['find-form']}>
                <div className={style['sub-title']}>가입하신 아이디, 전화번호를 입력해주세요.</div>
                <div className={style['find-item']}>
                  <div className={style['find-sub-item']}>
                    <input
                      type={'text'}
                      placeholder={'아이디'}
                      autoComplete={'off'}
                      id={'pw-id'}
                      value={pwFindInfo.id}
                      onChange={(e) => setPwFindInfo({ ...pwFindInfo, id: e.target.value.trim() })}
                    />
                  </div>
                  <span className={style['fail-message']}>{pwIdFailMessage}</span>
                </div>
                <div className={style['find-item']}>
                  <div className={style['find-sub-item']}>
                    <input
                      type={'text'}
                      placeholder={'이름'}
                      id={'pw-name'}
                      autoComplete={'off'}
                      className={style['find-name']}
                      value={pwFindInfo.name}
                      onChange={(e) => setPwFindInfo({ ...pwFindInfo, name: e.target.value.trim() })}
                    />
                  </div>
                </div>
                <div className={style['find-item']}>
                  <div className={style['find-sub-item']}>
                    <input
                      type={'number'}
                      placeholder={'생년월일(YYYYMMDD)'}
                      id={'pw-birth'}
                      autoComplete={'off'}
                      value={pwFindInfo.birth}
                      onChange={(e) => pwBirthLengthChk(e)}
                      maxLength={8}
                    />
                  </div>
                </div>
                <div className={style['find-item']}>
                  <div className={style['find-sub-item']}>
                    <input
                      type={'text'}
                      placeholder={'통신사 선택'}
                      value={pwSelectVal}
                      autoComplete={'off'}
                      className={style['find-select']}
                      id={'pw-agency'}
                      onClick={() => {
                        setPwSelected(!pwSelected);
                      }}
                    ></input>
                    <img
                      src={'/select.png'}
                      alt={'select'}
                      className={style['find-select-img']}
                      onClick={() => {
                        setPwSelected(!pwSelected);
                      }}
                    />
                    {pwSelected ? (
                      <ul className={style['find-option']}>
                        <li className={style['option']} onClick={() => pwSelectValue('SKT')}>
                          SKT
                        </li>
                        <li className={style['option']} onClick={() => pwSelectValue('KT')}>
                          KT
                        </li>
                        <li className={style['option']} onClick={() => pwSelectValue('LG U+')}>
                          LG U+
                        </li>
                        <li className={style['option']} onClick={() => pwSelectValue('SKT 알뜰폰')}>
                          SKT 알뜰폰
                        </li>
                        <li className={style['option']} onClick={() => pwSelectValue('KT 알뜰폰')}>
                          KT 알뜰폰
                        </li>
                        <li
                          className={style['option']}
                          onClick={() => pwSelectValue('LG U+ 알뜰폰')}
                        >
                          LG U+ 알뜰폰
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className={style['find-item1']}>
                  <div className={style['find-sub-item2']}>
                    <input
                      type={'text'}
                      placeholder={'전화번호 입력'}
                      id={'pw-phone'}
                      autoComplete={'off'}
                      value={pwFindInfo.phone}
                      onChange={(e) => setPwFindInfo({ ...pwFindInfo, phone: e.target.value.trim() })}
                    />
                    <button className={style['find-button']} onClick={pwVerifyTransmissionBtn}>
                      인증번호 전송
                    </button>
                  </div>
                </div>
                <div className={style['find-item1']}>
                  <div className={style['find-sub-item2']}>
                    <input
                      type={'number'}
                      placeholder={'인증번호 4자리 입력'}
                      autoComplete={'off'}
                      id={'pw-verify'}
                      onChange={(e) => pwVerifyLengthChk(e)}
                      maxLength={4}
                      value={pwFindInfo.verify}
                    />
                    <div className={style['pw-timer']} id={'pw-timer'}>
                      {pwMinutes.toString().padStart(2, '0')}:
                      {pwSeconds.toString().padStart(2, '0')}
                    </div>
                    <button className={style['find-button']} onClick={pwVerifyConfirmBtn}>
                      확인
                    </button>
                  </div>
                </div>
              </div>
              <span className={style['id-verify-message']} onClick={pwTimerReset}>
                {pwVerifyMessage}
              </span>
              <span className={style['id-fail-verify-message']}>{pwFailVerifyMessage}</span>
              <span className={style['id-fail-verify-num-message']}>{pwFailVerifyNumMessage}</span>
              <div className={style['find-btn-wrap']}>
                <button className={style['find-btn']} onClick={goPwFind}>
                  확인
                </button>
              </div>
            </div>
          ) : (
            <PwUpdatePage />
          )}
          <Modal isOpen={pwFindModalOpen} ariaHideApp={false} style={idModalStyle}>
            <div className={style['modal-wrap']}>
              <div className={style['pw-modal-title']}>비밀번호 바꾸기</div>
              <div className={style['pw-modal-text1']}>인증이 완료 되었습니다. </div>
              <div className={style['modal-button-wrap']}>
                <button className={style['pw-modal-login']} onClick={modalPwUpdate}>
                  비밀번호 바꾸기
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      <div className={style['other-find-form']}>
        <div className={style['other-find']}>
          <p>다른 방법으로 로그인</p>
        </div>

        <div className={style['social-find']}>
          <div>
            <img src={imgObj.kakaoLoginIcon} onClick={() => kakaoLogin()} alt={'카카오 로그인'} />
          </div>
          <div>
            <img src={imgObj.googleLogin} alt={'구글 로그인'} />
          </div>
        </div>

        <div className={style['find-options']}>
          <ul className={style['options-ul']}>
            <li onClick={() => navigate('/join')}>회원가입</li>
            <li>아이디 찾기 / 비밀번호 바꾸기</li>
            <li onClick={() => navigate('/chat')}>문의하기</li>
          </ul>
        </div>
      </div>
      <div style={{ marginBottom: '100px' }} />
      <Footer />
    </div>
  );
};
export default MemberFindPage;
