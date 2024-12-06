import style2 from '@/mobile/css/topBar.css';
import style from '@/mobile/css/mMemberFind.css';
import { useNavigate, useParams } from 'react-router-dom';
import '@/mobile/css/mLogin.css';
import React, {useState} from "react";

const MLoginPage = () => {
  const navigate = useNavigate();

  const { paramFindType } = useParams();
  let findType = paramFindType || 'id';

  const [findTypeUseState, setFindTypeUseState] =useState(findType);

  /*찾기 유형*/
  const [findInfo, setfindInfo] = useState({
    login_id: '',
    name: '',
    birth: '',
    agency: '',
    phone: '',
    accreditNum: '',
    info: '',
  });

  const [selectVal, setSelectVal] = useState('');
  const [selected, setSelected] = useState(false);

  // 타이머
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [isRunning, setIsRunning] = useState(false);

  const imgObj = {
    googleLogin: require('@/common/imgs/login/구글로그인.png'),
    kakaoLogin: require('@/common/imgs/login/카카오로그인.png'),
    kakaoLoginIcon: require('@/common/imgs/login/카카오로그인아이콘.png'),
  };


  const verifyTransmissionBtn = () => {
    if (findInfo.phone.trim() === '') {
      document.getElementById('find-info-phone').style.border = '1px solid #ff8888';
      setFailVerifyMessage('가입된 전화번호가 아닙니다. 다시 입력해 주세요.');
      setVerifyMessage(null);
      return false;
    } else {
      document.getElementById('find-info-phone').style.border = '1px solid #f2f2f2';
      setVerifyMessage('인증번호가 오지 않나요?');
      setFailVerifyMessage(null);
      setVerifyBtn(true);
      handleStart();
    }
  };
  const verifyLengthChk = (e) => {
    // 인증번호 8자리제한
    if (e.target.value.length <= 4) {
      setfindInfo({ ...findInfo, accreditNum: e.target.value });
    }
  };

  const verifyConfirmBtn = () => {
    // TODO :
  }

  function changeFindType (event) {
    if (event.target.className === 'check')
      return;

    setFindTypeUseState(event.target.id);
  }

  return (
    <>
      {/*상단바*/}
      <div className={'top-bar'}>
        <div className={'top-bar-left'}>
          <img src={'/back.png'} alt={'back'}  onClick={() => navigate(-1)}/>
        </div>
        <div className={'top-bar-center'}>
          아이디 찾기
        </div>
      </div>

      <div className={'find'}>
        {/*찾기 유형 버튼*/}
        <div className={'find-type-btn'}>
          <button id={'id'} className={findTypeUseState === 'id' ? 'check' : 'non-check'}
                  onClick={(e)=>{changeFindType(e);}}>
            아이디 찾기
          </button>
          <button id={'pw'} className={findTypeUseState === 'pw' ? 'check' : 'non-check'}
                  onClick={(e)=>{changeFindType(e);}}>
            비밀번호 바꾸기
          </button>
        </div>

        {/*아이디/비밀번호 찾기 from*/}
        <div className="find-form">
          <div className="find-form-wrapper">
            <h4 className={'find-title'}>
              {findTypeUseState ==='id' ? '가입하신 정보를 입력해 주세요.' : '가입하신 아이디, 전화번호를 입력해주세요.'}
            </h4>

            {/*아이디*/}
            <div className="find-form-item idInputDiv" style={{display: findTypeUseState === 'id' ? 'none' : ''}}>
              <div className="find-form-subitem2">
                <input
                  type={'text'}
                  placeholder={'아이디'}
                  id={'find-info-id'}
                  autoComplete={'off'}
                  value={findInfo.id}
                  maxLength={8}
                />
              </div>
            </div>

            {/*이름*/}
            <div className="find-form-item margin-top10">
              <div className="find-form-subitem2">
                <input
                  type={'text'}
                  placeholder={'이름'}
                  id={'find-info-name'}
                  autoComplete={'off'}
                  value={findInfo.name}
                  maxLength={8}
                />
              </div>
            </div>

            {/*생년월일*/}
            <div className="find-form-item">
              <div className="find-form-subitem2">
                <input
                  type={'number'}
                  placeholder={'생년월일(YYYYMMDD)'}
                  id={'find-info-birth'}
                  autoComplete={'off'}
                  value={findInfo.birth}
                  maxLength={8}
                />
              </div>
            </div>

            <div className="find-form-item">
              <div className="find-form-subitem2">
                <input
                  type={'text'}
                  placeholder={'통신사 선택'}
                  value={selectVal}
                  autoComplete={'off'}
                  className='find-form-select'
                  id={'find-info-agency'}
                  onClick={() => {
                    setSelected(!selected);
                  }}
                />
                <br/>
                <img
                  src={'/select.png'}
                  alt={'select'}
                  className='find-form-select-img'
                  onClick={() => {
                    setSelected(!selected);
                  }}
                />
                {selected ? (
                  <ul className='find-form-option'>
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
            <div className="find-form-item">
              <div className="find-form-subitem5">
                <input
                  value={findInfo.phone}
                  placeholder={'전화번호 입력'}
                  id={'find-info-phone'}
                  autoComplete={'off'}
                  onChange={(e) => setfindInfo({ ...findInfo, phone: e.target.value.trim() })}
                />
                <button className='find-check2' onClick={() => verifyTransmissionBtn()}>
                  인증번호 전송
                </button>
              </div>
            </div>

            {/*인증번호*/}
            <div className="find-form-item">
              <div className="find-form-subitem5">
                <input
                  value={findInfo.accreditNum}
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
                <button className='find-check2' onClick={verifyConfirmBtn}>
                  확인
                </button>
              </div>
            </div>

            {/*아이디 찾기*/}
            <div>

            </div>
          </div>
        </div>



      </div>


      {/*api 로그인*/}
      <div className="other-login margin-top30">
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
          <li onClick={() => navigate('/mo/find')}>회원가입</li>
          <li onClick={() => navigate('/mo/chat')}>문의하기</li>
        </ul>
      </div>
    </>
  )
}

export default MLoginPage;