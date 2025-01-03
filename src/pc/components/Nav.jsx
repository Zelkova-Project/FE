import '@/pc/css/nav.css';
import { useNavigate } from 'react-router';
import {getCookie, removeCookie} from '@/common/utils/loginUtil';

import { loginState, userInfoState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';

const Nav = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isHovering, setIsHovering] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();
  let logo = require('@/common/imgs/logo.png');
  let hoverImg = require('@/common/imgs/nav/nav-hover.png');


  const imgObj = {
    profileImg: require('@/common/imgs/default-profile-img.png'),
  }

  const navigator = [
    '/',
    '/guide',
    '/board/notice',
    '/board/support',
    '/board/community',
    '/login',
  ];

  useEffect(() => {
    setIsLogged(userInfo?.accessToken);
    if (!userInfo.profileImageName) {
      setUserInfo({
        ...userInfo,
        profileImageName: imgObj.profileImg
      })
    }
  }, [userInfo]);

  const navHandler = (idx) => {
    navigate(navigator[idx]);
  };

  const logoutHandler = () => {
    setUserInfo('');
    navigate('/');
    location.reload();
  };

  // 호버시열리는영역
  const showExtraNav = () => {
    let result = '';
    if (isHovering) {
      result = (
        <div className="nav-hover">
          {/* 기관안내 호버 메뉴 */}
          <div className="guide-menu">
            <ul className="menu-hover">
              <li>이용안내</li>
              <li>시설안내</li>
              <li>오시는길</li>
              <li>조직도</li>
            </ul>
          </div>

          {/* 공지사항 호버 메뉴 */}
          <div className="notice-menu">
            <ul className="menu-hover">
              <li>공지사항</li>
              <li>가정통신문</li>
              <li>채용안내</li>
            </ul>
          </div>

          {/* 후원 자원봉사 호버 메뉴 */}
          <div className="support-menu">
            <ul className="menu-hover">
              <li>후원의손길</li>
              <li>자원봉사</li>
            </ul>
          </div>
          {/* 로그인 호버 메뉴 */}
          {isLogged ? (
            <div className="login-menu">
              <ul className={'menu-hover'}>
                <li onClick={() => logoutHandler()}>로그아웃</li>
                <li onClick={() => navigate('/latterWrite')}>후기작성</li>
              </ul>
            </div>
          ) : null}

          <div className="hover-icon">
            <img src={hoverImg}></img>
          </div>
        </div>
      );
    }
    return result;
  };

  return (
    <div
      className="nav-container"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <div className="hr" />
      <ul className="menu-ul">
        <li style={{ padding: '15px' }} onClick={() => navHandler(0)}>
          <img src={logo} alt="logo"></img>
        </li>
        <li onClick={() => navHandler(1)}>기관소개</li>
        <li onClick={() => navHandler(2)}>공지사항</li>
        <li onClick={() => navHandler(3)}>후원&자원봉사</li>
        <li onClick={() => navHandler(4)}>커뮤니티</li>
        <li onClick={() => navigate('/chat')}>채팅</li>

      </ul>
      <ul className={'menu-login'}>
        {!isLogged  ? (
          <li className={'li-login'} onClick={() => navHandler(5)}>
            <a>로그인</a>
          </li>
        ) : (
          <li className={'profile'} onClick={() => navigate('/profile')}>
            <label>
              {isLogged ? userInfo.nickname : ''}
              <div className={'profile-img'}>
                <img src={userInfo.profileImageName} alt={'프로필 사진'} />
              </div>
            </label>
          </li>
        )}
      </ul>

      {showExtraNav()}
    </div>
  );
};
export default Nav;









