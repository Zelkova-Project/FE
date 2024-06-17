import style from '../css/join.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../axios/axiosInstance';
import React, { useState } from 'react';

const Join = () => {
  // 통신사 select
  const [selected, setSelected] = useState(false);
  const [selectVal, setSelectVal] = useState('');

  // 유효성 메세지
  const [idRegMessage, setIdRegMessage ] = useState('');
  const [pwRegMessage, setPwRegMessage ] = useState('');

  // 빈칸체크 메세지
  const [idBlankMessage, setIdBlankMessage ] = useState('');
  const [joinInfo, setJoinInfo] = useState({
    login_id: '',
    password: '',
    password_check: '',
    name: '',
    nickname: 'test',
    email: '',
    agency: '',
  })

  const navigate = useNavigate();
  const imgObj = {
    googleLogin: require('../imgs/login/구글로그인.png'),
    kakaoLogin: require('../imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('../imgs/login/카카오로그인아이콘.png'),
    select : require('../imgs/join/select.png'),
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
      email: '',
      agency: '',
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
  const selectValue = (index) => {
    setSelectVal(index)
    setSelected(!selected)
  }
  const idCheck = () => {
    // const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[\w!@#$%^&*(),.?":{}|<>]{7,}$/;
    const idRegex = /^(?=.[a-zA-Z])(?=.\d).{7,}$/;
    if(joinInfo.login_id.value === '') {
      setIdBlankMessage('아이디를 입력해주세요.');
      setIdRegMessage('');
    }else if(!idRegex.test(joinInfo.login_id.value)){
      setIdRegMessage('영문, 숫자가 포함된 7자리 이상의 아이디를 만들어 주세요');
      setIdBlankMessage('');

    }else {
      setIdRegMessage('')
      setIdBlankMessage('');
    }
  }
  const idRegCheck = () => {

  }
  return (
    <div className={style["outer-container"]}>
      <Nav />
      <div className={style["form-container"]}>
        <div className={style["inner-container"]}>
          <div className={style["form-title"]}>
            <h4 className={style["join-title"]}>회원가입</h4>
          </div>

          <div className={style["join-form-wrapper"]}>
            {/* 아이템 */}
            <div className={style["join-form-item"]}>
              <div className={style["join-form-subitem1"]}>
                <input
                    value={joinInfo.loginId} placeholder={'아이디'}
                    onChange={(e) => setJoinInfo({...joinInfo, login_id: e.target.value})}
                    // onChange={(e) => setJoinInfo({...joinInfo, login_id: e.target.value})}
                />
                <button className={style['join-check']} onClick={idCheck}>중복확인</button>
              </div>
            </div>
            <span className={style['regex-message']}>{idRegMessage}</span>

            {/* 아이템 */}
            <div className={[style["join-form-item"], style["margin-top30"]].join(" ")}>
              <div className={style["join-form-subitem2"]}>
                <input
                    value={joinInfo.password} placeholder={'비밀번호'}
                    type='password'
                    onChange={(e) => setJoinInfo({...joinInfo, password: e.target.value})}
                />
              </div>
            </div>

            {/* 아이템 */}
            <div className={style["join-form-item"]}>
              <div className={style["join-form-subitem2"]}>
                <input
                    value={joinInfo.password_check} placeholder={'비밀번호 확인'}
                    type='password'
                    onChange={e => setJoinInfo({...joinInfo, password_check: e.target.value})}
                />
              </div>
            </div>

            {/* 아이템 */}
            <div className={[style["join-form-item"], style["margin-top50"]].join(" ")}>
              <div className={style["join-form-subitem2"]}>
                <input
                    value={joinInfo.name} placeholder={'이름'}
                    onChange={e => setJoinInfo({...joinInfo, name: e.target.value})}
                />
              </div>
            </div>

            {/*아이템 */}
            <div className={style["join-form-item"]}>
              <div className={style["join-form-subitem2"]}>
                <input value={joinInfo.birth} placeholder={'생년월일(YYYY/MM/DD)'}/>
              </div>
            </div>
            {/*아이템 */}
            <div className={style["join-form-item"]}>
              <div className={style["join-form-subitem2"]}>
                <input value={joinInfo.phone} placeholder={'전화번호'}/>
              </div>
            </div>
            {/*아이템 */}
            <div className={style["join-form-item"]}>
              <div className={style["join-form-subitem2"]}>
                <input type={'text'} placeholder={'통신사 선택'} value={selectVal} className={style['join-form-select']} onClick={() => {
                  setSelected(!selected);
                  selectValue();
                }}>
                </input>
                  <img src={imgObj.select} alt={'select'} className={style['join-form-select-img']} onClick={() => {
                    setSelected(!selected);
                    selectValue();
                  }}/>
                {selected ?
                <ul className={style['join-form-option']}>
                  <li className={style['option']} onClick={() => selectValue('SKT')}>SKT</li>
                  <li className={style['option']} onClick={() => selectValue('KT')}>KT</li>
                  <li className={style['option']} onClick={() => selectValue('LG U+')}>LG U+</li>
                  <li className={style['option']} onClick={() => selectValue('SKT 알뜰폰')}>SKT 알뜰폰</li>
                  <li className={style['option']} onClick={() => selectValue('KT 알뜰폰')}>KT 알뜰폰</li>
                  <li className={style['option']} onClick={() => selectValue('LG U+ 알뜰폰')}>LG U+ 알뜰폰</li>
                </ul> : null
                }
              </div>
            </div>

            {/* 아이템 */}
            <div className={style["join-form-item"]}>
              <div className={style["join-form-subitem1"]}>
                <input value={joinInfo.phone} placeholder={'전화번호 입력'}/>
                <button className={style['join-check']}>인증번호 전송</button>
              </div>
            </div>
            {/* 아이템 */}
            <div className={style["join-form-item"]}>
              <div className={style["join-form-subitem1"]}>
                <input value={joinInfo.accreditNum} placeholder={'인증번호 4자리 입력'}/>
                <button className={style['join-check']}>확인</button>
              </div>
            </div>
            {/* 아이템 */}
          <div className={[style["join-form-item"], style["margin-top50"]].join(" ")}>
            <div className={style["join-form-subitem2"]}>
              <input value={joinInfo.address} placeholder={'주소'}/>
            </div>
          </div>
          {/* 아이템 */}
          <div className={style["join-form-item"]}>
          <div className={style["join-form-subitem3"]}>
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
            <div className={style["join-form-item"]}>
              <div className={style["join-form-subitem4"]}>
                <textarea cols="30" rows="300" placeholder={'학생 소개를 간단히 작성해주세요'}></textarea>
              </div>
            </div>

            {/* 버튼들 */}
            <div className={style["join-btns-wrapper"]}>
              {/*<button className="cancel-join-btn" onClick={goBack}>*/}
              {/*  취소*/}
              {/*</button>*/}
              <button className={style["join-btn"]} onClick={goJoin}>
                확인
              </button>
            </div>
            <div className={style['other-join-form']}>
              <div className={style["other-join"]}>
                <p>다른 방법으로 로그인</p>
              </div>

              <div className={style["social-join"]}>
                <div>
                  <img src={imgObj.kakaoLoginIcon}/>
                </div>
                <div>
                  <img src={imgObj.googleLogin}/>
                </div>
              </div>

              <div className={style['join-options']}>
                <ul className={style['options-ul']}>
                  <li onClick={() => navigate('/join')}>회원가입</li>
                  <li>아이디 / 비밀번호 찾기</li>
                  <li onClick={() => navigate('/chat')}>문의하기</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Join;
