import style from '../css/pwUpdate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios/axiosInstance';
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-modal';

const PwUpdatePage = () => {
  const navigate = useNavigate();

  const [pwCheckSuccessMessage, setPwCheckSuccessMessage] = useState(''); // 성공 메세지
  const [pwCheckFailMessage, setPwCheckFailMessage] = useState(''); // 실패 메세지
  const [pwCheckModal, setPwCheckModal] = useState(false); // 비밀번호 변경 완료 모달
  const [pwCheckVal, setPwCheckVal] = useState({
    pwInfo :'',
    pwReInfo :''
  });

  const pwCheckModalStyle = {
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
  const pwCheck = (e) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z0-9@$!%*#?&]{7,}$/;
    if (!pwRegex.test(e.target.value)) {
      setPwCheckFailMessage('영문,숫자,특수기호가 포함된 7자리 이상의 비밀번호를 만들어 주세요.');
      setPwCheckSuccessMessage(null);
      return false;
    }else if (e.target.value !== pwCheckVal.pwReInfo && pwCheckVal.pwReInfo !== '') {
      setPwCheckFailMessage('비밀번호 확인이 일치하지 않습니다.');
      setPwCheckSuccessMessage(null);
      return false;
    }else {
      setPwCheckFailMessage(null);
      setPwCheckSuccessMessage('사용가능한 비밀번호 입니다.');
      setPwCheckVal({ ...pwCheckVal, pwInfo: e.target.value });
    }
  };
  const pwReCheck = (e) => {
    if (e.target.value !== pwCheckVal.pwInfo) {
      setPwCheckFailMessage('비밀번호 확인이 일치하지 않습니다.');
      setPwCheckSuccessMessage(null);
      return false;
    }else {
      setPwCheckFailMessage(null);
      setPwCheckSuccessMessage('사용가능한 비밀번호 입니다.');
      setPwCheckVal({ ...pwCheckVal, pwReInfo: e.target.value });
    }
  };
  const pwCheckModalClose = () => {
    setPwCheckModal(false);
  }
  const pwCheckModalLogin = () => {
    navigate('/Login');
  }
  const goPwCheck = () => {
    if(pwCheckVal.pwInfo === '' || pwCheckVal.pwReInfo === ''){
      setPwCheckFailMessage('영문,숫자,특수기호가 포함된 7자리 이상의 비밀번호를 만들어 주세요.');
      setPwCheckSuccessMessage(null);
      return false;
    }else if(pwCheckVal.pwInfo !== pwCheckVal.pwReInfo ){
      setPwCheckFailMessage('비밀번호 확인이 일치하지 않습니다.');
      setPwCheckSuccessMessage(null);
      return false;
    }
    setPwCheckModal(true);
  }

  return (
      <>
        <div>
          <div className={style['pw-update-title']}>
            <span>변경하실 비밀번호를 입력해주세요.</span>
          </div>
          <div className={style['pw-update-form']}>
            <div>
              <input type={'password'} placeholder={'비밀번호'} onChange={(e) => pwCheck(e)}/>
            </div>
            <div>
              <input type={'password'} placeholder={'비밀번호 확인'} onChange={(e) => pwReCheck(e)}/>
            </div>
          </div>
          <div className={style['success-message']}>{pwCheckSuccessMessage}</div>
          <div className={style['fail-message']}>{pwCheckFailMessage}</div>
          <div>
            <button className={style['pw-update-btn']} onClick={() => goPwCheck()}>확인</button>
          </div>

        </div>
        <Modal isOpen={pwCheckModal} ariaHideApp={false} style={pwCheckModalStyle}>
          <div className={style['modal-wrap']}>
            <div className={style['modal-title']}>비밀번호 변경</div>
            <div className={style['modal-text1']}>비밀번호가 변경되었습니다.</div>
            <div className={style['modal-text2']}>성한결님의 비밀번호는
              <span> test11   </span> 입니다.
            </div>
            <div className={style['modal-button-wrap']}>
              <button className={style['modal-close']} onClick={pwCheckModalClose}>
                닫기
              </button>
              <button className={style['modal-login']} onClick={pwCheckModalLogin}>
                로그인
              </button>
            </div>
          </div>
        </Modal>
      </>
  );
};
export default PwUpdatePage;
