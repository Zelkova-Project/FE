import style from '../css/join.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../axios/axiosInstance';
import React, { useEffect, useState } from 'react';

const Join = () => {
  // 통신사 select
  const [selected, setSelected] = useState(false);
  const [selectVal, setSelectVal] = useState('');

  // 아이디,비번 체크메세지(성공,실패)
  const [idFailMessage, setIdFailMessage] = useState('');
  const [idSuccessMessage, setIdSuccessMessage] = useState('');
  const [pwFailMessage, setPwFailMessage] = useState('');
  const [pwSuccessMessage, setPwSuccessMessage] = useState('');

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
    nickname: 'test',
  });

  const navigate = useNavigate();
  const imgObj = {
    googleLogin: require('../imgs/login/구글로그인.png'),
    kakaoLogin: require('../imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('../imgs/login/카카오로그인아이콘.png'),
    // select: require('/select.png'),
  };
  let Rest_api_key = '41d2a43168a7edd9f941329667a65ef4';
  let redirect_uri = 'http://localhost:3000/oauth';
  let url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  // 카카오 로그인
  const kakaoLogin = () => {
    window.location.href = url;
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('code : ', code);
  };

  const goBack = () => {
    navigate(-1);
  };
  //TODO: 유효성검사
  const goJoin = async () => {
    let param = {
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
      nickname: '',
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
    if (joinInfo.password === '' || joinInfo.password === null) {
      setPwFailMessage('비밀번호를 입력해주세요.');
      setPwSuccessMessage(null);
      return false;
    }

    let { status, message } = await axios.post('/signup', param);

    if (status == 200 || status == 201) {
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
  const joinIdCheck = (e) => {
    const idRegex = /^[a-zA-Z](?=.*\d)[a-zA-Z0-9]{6,}$/;
    if (e.target.value === '') {
      setIdFailMessage('아이디를 입력해주세요.');
      setIdSuccessMessage(null);
    } else if (!idRegex.test(e.target.value)) {
      setIdFailMessage('영문, 숫자가 포함된 7자리 이상의 아이디를 만들어 주세요.');
      setIdSuccessMessage(null);
    } else {
      setJoinInfo(e.target.value);
      setIdSuccessMessage('사용가능한 아이디 입니다.');
      setIdFailMessage(null);
    }
  };
  const idCheck = () => {};
  const joinPwCheck = (e) => {
    // const pwRegex =  /^[a-zA-Z0-9](?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{6,}$/
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z0-9@$!%*#?&]{6,}$/;
    if (!pwRegex.test(e.target.value)) {
      setPwFailMessage('영문,숫자,특수기호가 포함된 7자리 이상의 비밀번호를 만들어 주세요.');
      setPwSuccessMessage(null);
    } else {
      setPwFailMessage(null);
      setPwSuccessMessage(null);
    }
  };
  const joinPwReCheck = (e) => {
    if (e.target.value !== joinInfo.password) {
      setPwFailMessage('비밀번호 확인이 일치하지 않습니다.');
      setPwSuccessMessage(null);
    } else {
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
                  onChange={(e) => {
                    // setJoinInfo({...joinInfo, login_id: e.target.value});
                    joinIdCheck(e);
                    setJoinInfo({ ...joinInfo, login_id: e.target.value });
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
                  type="password"
                  onChange={(e) => {
                    joinPwCheck(e);
                    setJoinInfo({ ...joinInfo, password: e.target.value });
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
                  type="password"
                  onChange={(e) => {
                    joinPwReCheck(e);
                    setJoinInfo({ ...joinInfo, password_check: e.target.value });
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
                  value={joinInfo.name}
                  placeholder={'이름'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, name: e.target.value })}
                />
              </div>
            </div>

            {/*아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem2']}>
                <input
                  type={'number'}
                  placeholder={'생년월일(YYYYMMDD)'}
                  value={joinInfo.birth}
                  onChange={joinBirthCheck}
                  maxLength={8}
                />
              </div>
            </div>
            {/*아이템 */}
            {/*<div className={style["join-form-item"]}>*/}
            {/*  <div className={style["join-form-subitem2"]}>*/}
            {/*    <input value={joinInfo.phone} placeholder={'전화번호'}/>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem2']}>
                <input
                  type={'text'}
                  placeholder={'통신사 선택'}
                  value={selectVal}
                  className={style['join-form-select']}
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
                <input value={joinInfo.phone} placeholder={'전화번호 입력'} />
                <button className={style['join-check']}>인증번호 전송</button>
              </div>
            </div>
            {/* 아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem1']}>
                <input value={joinInfo.accreditNum} placeholder={'인증번호 4자리 입력'} />
                <button className={style['join-check']}>확인</button>
              </div>
            </div>
            {/* 아이템 */}
            <div className={[style['join-form-item'], style['margin-top50']].join(' ')}>
              <div className={style['join-form-subitem2']}>
                <input value={joinInfo.address} placeholder={'주소'} />
              </div>
            </div>
            {/* 아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem3']}>
                <input
                  value={joinInfo.email1}
                  type="email"
                  placeholder={'이메일 (선택사항)'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, email1: e.target.value })}
                />{' '}
                @{' '}
                <input
                  value={joinInfo.email2}
                  type="email"
                  placeholder={'이메일 (선택사항)'}
                  onChange={(e) => setJoinInfo({ ...joinInfo, email2: e.target.value })}
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
                  value={joinInfo.info}
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
                  <img src={imgObj.kakaoLoginIcon} onClick={kakaoLogin} alt={'카카오 로그인'} />
                </div>
                <div>
                  <img src={imgObj.googleLogin} alt={'구글 로그인'} />
                </div>
              </div>

              <div className={style['join-options']}>
                <ul className={style['options-ul']}>
                  <li>회원가입</li>
                  <li onClick={() => navigate('/MemberFind')}>아이디 / 비밀번호 찾기</li>
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
