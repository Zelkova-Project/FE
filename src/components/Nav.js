import "../css/nav.css";
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="menu-left">
        <ul className="menu-ul">
          <li style={{ padding: "15px" }}>
            <img src="logo.png" alt="logo"></img>
          </li>
          <li>기관소개</li>
          <li>공지사항</li>
          <li>후원&자원봉사</li>
          <li>커뮤니티</li>
          <Link to={'/login'}>
            <li className="login">
              <a>로그인</a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Nav;
