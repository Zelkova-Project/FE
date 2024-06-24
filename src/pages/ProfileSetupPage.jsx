import Nav from '../components/Nav';
import Footer from '../components/Footer';
import style from '../css/profileSetup.module.css';
import React, { useEffect, useState } from 'react';

const ProfileSetupPage = () => {
  console.log('test');
  console.log('test');
  return (
    <div>
      <Nav />
      <div className={style['container']}>
        <img className={style['main-img']} src={'main-section.png'} alt="main-section"></img>
        <div className={style['wrap']}>
          <div className={style['profile-info-wrap']}>
            <label>
              <div className={style['profile-my-img']}>
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
              <div>
                <span className={style['profile-info-name']}>
                  <span>이름</span>
                  <input type={'text'} />
                </span>
                <span className={style['profile-info-email']}>
                  <span>이메일</span>
                  <input type={'text'} />
                </span>
              </div>
              <div>
                <span className={style['profile-info-family']}>
                  <span>보호가족</span>
                  <input type={'text'} />
                </span>
                <span className={style['profile-info-address']}>
                  <span>주소</span>
                  <input type={'text'} />
                </span>
              </div>
              <div>
                <span className={style['profile-info-activity']}>
                  <span>활동 공개</span>
                  <input type={'text'} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSetupPage;
