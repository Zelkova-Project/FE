import Nav from '../components/Nav';
import Footer from '../components/Footer';
import style from '../css/profileInfo.module.css';
import React, { useEffect, useState } from 'react';

const ProfileInfoPage = () => {
  return (
    <div>
      <Nav />
      <div className={style['container']}>
        <img className={style['main-img']} src={'main-section.png'} alt="main-section"></img>
        <div className={style['wrap']}>
          <div className={style['profile-info-wrap']}>
            <label>
              <div className={style['profile-my-img']}></div>
              <div className={style['profile-info-title']}>
                <div className={style['name']}>성한결</div>
                <div className={style['protect']}>성혜리 보호자</div>
                <span className={style['intro']}>자기소개 메세지</span>
              </div>
            </label>
            <div className={style['profile-info-input']}>
              <span className={style['profile-info-name']}>
                <span>이름</span>
                <input type={'text'} />
              </span>
              <div className={style['profile-info-family']}>
                <label>
                  <span>보호가족</span>
                  <input type={'text'} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileInfoPage;
