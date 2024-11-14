import style from '@/mobile/css/mProfile.css';
import style2 from '@/mobile/css/topBar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import React, {useState} from "react";

const MLoginPage = () => {
  document.body.style.overflow = 'hidden';
  const navigate = useNavigate();

  const [plofileInfo, setPlofileInfo] = useState({
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
    active: '',
  });

  const [actived, setactived] = useState(false);
  const [activeVal, setactiveVal] = useState('');

  const activeValue = (index) => {
    setactiveVal(index);
    setactived(!actived);
    setPlofileInfo({ ...plofileInfo, active: index });
  };

  /*todo 유효성검사, 및 저장처리*/
  
  
  return (
    <>
      {/*상단바*/}
      <div className={'top-bar'}>
        <div className={'top-bar-left'}>
          <img src={'/back.png'} alt={'back'}  onClick={() => navigate(-1)}/>
        </div>
        <div className={'top-bar-center'}>
          프로필 만들기
        </div>
      </div>
      <div className={'back'}>

      </div>

      {/*프로필만들기*/}
      <div className='container'>
        {/*프로필 설정상단*/}
        <div className='profile-top'>
          <div className={'profile-img-div'}>
            <img className={'profile-img'} src={'/default-profile-icon.png'} alt={'default-profile-icon'} />
            <img className={'setting-icon'} src={'/setting-icon.png'} alt={'setting-icon'} />
          </div>

          <div className={'profile-btn'}>
            <button className={'normal-profile-btn'}>수정 완료</button>
          </div>
        </div>
        {/*프로필만들기 인풋*/}
        <div className="profile-from">
          <div className="profile-form-wrapper">

            {/*이름*/}
            <div className="profile-form-item">
              <div className="profile-form-subitem1">
                <input
                  placeholder={'이름'}
                  autoComplete={'on'}
                  id={'profile-info-name'}
                  onChange={(e) => {
                    setPlofileInfo(e);
                  }}
                />
              </div>
            </div>

            {/*보호가족*/}
            <div className="profile-form-item">
              <div className="profile-form-subitem1">
                <input
                  placeholder={'보호가족'}
                  autoComplete={'off'}
                  id={'profile-info-family'}
                  onChange={(e) => {
                    setPlofileInfo(e);
                  }}
                />
              </div>
            </div>

            {/*이메일*/}
            <div className="profile-form-item">
              <div className="profile-form-subitem1">
                <input
                  placeholder={'이메일'}
                  autoComplete={'off'}
                  id={'profile-info-email'}
                  onChange={(e) => {
                    setPlofileInfo(e);
                  }}
                />
              </div>
            </div>

            {/*활동공개*/}
            <div className="profile-form-item">
              <div className="profile-form-subitem2">
                <input
                  type={'text'}
                  placeholder={'활동 공개'}
                  value={activeVal}
                  autoComplete={'off'}
                  className='profile-form-active'
                  id={'profile-info-active'}
                  onClick={() => {
                    setactived(!actived);
                  }}
                />
                <br/>
                <img
                  src={'/select.png'}
                  alt={'active'}
                  className='profile-form-active-img'
                  onClick={() => {
                    setactived(!actived);
                  }}
                />
                {actived ? (
                  <ul className='profile-form-option'>
                    {/*active 요소*/}
                    <li className='option' onClick={() => activeValue('공개')}>
                      공개
                    </li>
                    <li className='option' onClick={() => activeValue('미공개')}>
                      미공개
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>

            {/*소개*/}
            <div className="profile-form-item">
              <div className="profile-form-subitem4">
                <textarea
                  cols="30"
                  rows="300"
                  placeholder={'소개글'}
                  autoComplete={'off'}
                  onChange={(e) => {
                    setPlofileInfo(e);
                  }}
                ></textarea>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default MLoginPage;