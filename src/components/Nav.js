import '../css/nav.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  let logo = require('../imgs/logo.png');

  const navigator = ['/', '/guide', '/notice', '/support', '/community'];

  const navHandler = (idx) => {
    navigate(navigator[idx]);
  };

  return (
    <div className="nav-container">
      <div className="hr" />
      <div className="menu-left">
        <ul className="menu-ul">
          <li style={{ padding: '15px' }} onClick={() => navHandler(0)}>
            <img src={logo} alt="logo"></img>
          </li>
          <li onClick={() => navHandler(1)}>기관소개</li>
          <li onClick={() => navHandler(2)}>공지사항</li>
          <li onClick={() => navHandler(3)}>후원&자원봉사</li>
          <li onClick={() => navHandler(4)}>커뮤니티</li>
          {/* <Link to={'/login'}>
            <li className="login">
              <a>로그인</a>
            </li>
          </Link> */}
          <li className="login">
            <a>로그인</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Nav;
