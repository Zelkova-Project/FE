import Nav from '../components/Nav';
import Footer from '../components/Footer';
import style from '../css/profileSetup.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetupPage = () => {
  const navigate = useNavigate();

  const [activitySelected, setActivitySelected] = useState(false); // 활동공개 창
  const [activitySelectVal, setActivitySelectVal] = useState('공개'); // 프로필 활동공개 값
  const [fileImgSelected, setFileImgSelected] = useState(null); // 프로필 이미지 변경
  const [profileName, setProfileName] = useState(''); // 프로필 이름 값
  const [profileEmail, setProfileEmail] = useState(''); // 프로필 이메일 값
  const [profileFamily, setProfileFamily] = useState(''); // 프로필 보호가족 값
  const [profileIntroduce, setProfileIntroduce] = useState(''); // 프로필 소개글 값

  const activitySelectValue = (index) => {
    setActivitySelectVal(index);
    setActivitySelected(!activitySelected);
  };
  const fileImg = (event) => {
    // 프로필 이미지 변경
    const fileInput = event.target.files[0];
    if (fileInput) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileImgSelected(e.target.result);
      };
      reader.readAsDataURL(fileInput);
    }
  };
  const profileRegister = () => {
    if (profileName === '' || profileName === null) {
      document.getElementById('profile-name').style.border = '1px solid #ff8888';
      return false;
    } else {
      document.getElementById('profile-name').style.border = '1px solid #f2f2f2';
    }
    if (profileEmail === '' || profileEmail === null) {
      document.getElementById('profile-email').style.border = '1px solid #ff8888';
      return false;
    } else {
      document.getElementById('profile-email').style.border = '1px solid #f2f2f2';
    }
    if (profileFamily === '' || profileFamily === null) {
      document.getElementById('profile-family').style.border = '1px solid #ff8888';
      return false;
    } else {
      document.getElementById('profile-family').style.border = '1px solid #f2f2f2';
    }
    if (profileIntroduce === '' || profileIntroduce === null) {
      document.getElementById('profile-introduce').style.border = '1px solid #ff8888';
      return false;
    } else {
      document.getElementById('profile-introduce').style.border = '1px solid #f2f2f2';
    }
    console.log('등록 성공');
  };
  return (
    <div>
      <Nav />
      <div className={style['container']}>
        <img className={style['main-img']} src={'main-section.png'} alt="main-section"></img>
        <div className={style['wrap']}>
          <div className={style['profile-info-wrap']}>
            <input
              id={'profile-update'}
              className={style['profile-update']}
              type={'file'}
              accept={'image/*'}
              onChange={(e) => fileImg(e)}
            />
            <label htmlFor={'profile-update'} className={style['profile-img-btn']} />
            <label>
              <div className={style['profile-my-img']}>
                {fileImgSelected === null ? (
                  <img
                    className={style['default-profile-img']}
                    src={'/default-profile-img.png'}
                    alt={'프로필 사진 변경'}
                    title={'프로필 사진 변경'}
                  />
                ) : (
                  <img
                    className={style['default-profile-img']}
                    src={fileImgSelected}
                    alt={'프로필 사진'}
                    title={'프로필 사진'}
                  />
                )}
                <div className={style['profile-setup']}>
                  <img src={'setup.png'} alt={'설정'} />
                </div>
              </div>
              <div className={style['profile-info-title']}>
                <div className={style['name']}>성한결</div>
                <div className={style['protect']}>성혜리 보호자</div>
                <span className={style['intro']}>자기소개 메세지</span>
              </div>
            </label>
            <div className={style['profile-info-input']}>
              <div className={style['profile-info-item1']}>
                <span className={style['profile-info-name']}>
                  <span>이름</span>
                  <input
                    type={'text'}
                    id={'profile-name'}
                    autoComplete={'off'}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value.trim())}
                  />
                </span>
                <span className={style['profile-info-email']}>
                  <span>이메일</span>
                  <input
                    type={'text'}
                    id={'profile-email'}
                    value={profileEmail}
                    autoComplete={'off'}
                    onChange={(e) => setProfileEmail(e.target.value.trim())}
                  />
                </span>
              </div>
              <div className={style['profile-info-item1']}>
                <span className={style['profile-info-family']}>
                  <span>보호가족</span>
                  <input
                    type={'text'}
                    id={'profile-family'}
                    value={profileFamily}
                    autoComplete={'off'}
                    onChange={(e) => setProfileFamily(e.target.value.trim())}
                  />
                </span>
                <span className={style['profile-info-activity']}>
                  <span>활동 공개</span>
                  <input
                    type={'text'}
                    value={activitySelectVal}
                    autoComplete={'off'}
                    className={style['activity-select']}
                    onClick={() => {
                      setActivitySelected(!activitySelected);
                    }}
                  />
                  <img
                    src={'/select.png'}
                    alt={'select'}
                    className={style['activity-select-img']}
                    onClick={() => {
                      setActivitySelected(!activitySelected);
                    }}
                  />
                  {activitySelected ? (
                    <ul className={style['activity-option']}>
                      <li className={style['option']} onClick={() => activitySelectValue('공개')}>
                        공개
                      </li>
                      <li className={style['option']} onClick={() => activitySelectValue('비공개')}>
                        비공개
                      </li>
                    </ul>
                  ) : null}
                </span>
              </div>
              <div className={style['profile-info-item1']}>
                <div className={style['profile-info-introduce']}>
                  <span>소개글 작성</span>
                  <div>
                    <textarea
                      className={style['introduce']}
                      id={'profile-introduce'}
                      onChange={(e) => setProfileIntroduce(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className={style['profile-btn']}>
              <button className={style['profile-cancel']} onClick={() => navigate(-1)}>
                취소
              </button>
              <button className={style['profile-register']} onClick={profileRegister}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSetupPage;
