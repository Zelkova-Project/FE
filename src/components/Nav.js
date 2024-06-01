import "../css/nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  let logo = require("../imgs/logo.png");
  
  return (
    <div className="nav-container">
      <div className="hr" />
      <div className="menu-left">
        <ul className="menu-ul">
          <Link to={'/'}>
            <li style={{ padding: "15px" }}>
              <img src={logo} alt="logo"></img>
            </li>
          </Link>
          <Link to={"/guide"}>
            <li>기관소개</li>
          </Link>
          <Link to={"/notice"}>
            <li>공지사항</li> 
          </Link>
          <li>후원&자원봉사</li>
          <li>커뮤니티</li>
          {/* <Link to={'/login'}>
            <li className="login">
              <a>로그인</a>
            </li>
          </Link> */}
          <Link to={"/login"}>
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
