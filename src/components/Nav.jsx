import '../css/nav.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {loginState} from '../recoilState/recoil';
import {useRecoilState} from 'recoil';
import React, { useState, useEffect } from 'react';

const Nav = () => {
  const [login, setLogin] = useRecoilState(loginState); 
  const [isHovering, setIsHovering] = useState(false);
  
  const navigate = useNavigate();

  let logo = require('../imgs/logo.png');
  let hoverImg = require('../imgs/nav/nav-hover.png');
// test
  const navigator = ['/', '/guide', '/notice', '/support', '/community', '/login'];

  const navHandler = (idx) => {
    navigate(navigator[idx]);
  };

  const loginHandler = () => {
    console.log('loginHandler')
      navigate('/login');
  }

  const deleteCookie = (cookieKey) => {
    document.cookie = cookieKey + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  const logoutHandler = () => {
    console.log('logoutHandler')
    localStorage.removeItem('loginMember')
    deleteCookie('X-XSRF-Token');
    location.reload();
  }


  // 호버시열리는영역
  const showExtraNav = () => {
    let result = '';
    if (isHovering) {
      result = 
      <div className='nav-hover'>
        {/* 기관안내 호버 메뉴 */}
        <div className='guide-menu'>
          <ul className='menu-hover'>
            <li>이용안내</li>
            <li>시설안내</li>
            <li>오시는길</li>
            <li>조직도</li>
          </ul>
        </div>

        {/* 공지사항 호버 메뉴 */}
        <div className='notice-menu'>
          <ul className='menu-hover'>
            <li>공지사항</li>
            <li>가정통신문</li>
            <li>채용안내</li>
          </ul>
        </div>

        {/* 후원 자원봉사 호버 메뉴 */}
        <div className='support-menu'>
          <ul className='menu-hover'>
            <li>후원의손길</li>
            <li>자원봉사</li>
          </ul>
        </div>

        <div className='hover-icon'> 
          <img src={hoverImg}></img>
        </div>
      </div>
    }
    return result;
  }



  return (
    <div className="nav-container"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <div className="hr" />
      <div className="menu-left">
        <ul className="menu-ul">
          <li style={{padding: '15px'}} onClick={() => navHandler(0)}>
            <img src={logo} alt="logo"></img>
          </li>
          <li onClick={() => navHandler(1)}>기관소개</li>
          <li onClick={() => navHandler(2)}>공지사항</li>
          <li onClick={() => navHandler(3)}>후원&자원봉사</li>
          <li onClick={() => navHandler(4)}>커뮤니티</li>
          {login ?
              <li onClick={() => logoutHandler()} className="login"><a>로그아웃</a></li> :
              <li onClick={() => loginHandler()} className="login"><a>로그인</a></li>
          }
          <li className={'login'} onClick={() => navigate('/Profile')}>임시프로필</li>
          <li onClick={() => navigate('/chat')}>채팅테스트</li>
      </ul>
    </div>


  {
    showExtraNav()
  }

</div>
)
  ;
};
export default Nav;
