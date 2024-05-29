import "../css/nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="hr" />
      <div className="menu-left">
        <ul className="menu-ul">
<<<<<<< HEAD
          <Link to={'/'}>
=======
          <Link to={"/"}>
>>>>>>> 76398b156c95c624d6be8a0c31ced33fd9886977
            <li style={{ padding: "15px" }}>
              <img src="logo.png" alt="logo"></img>
            </li>
          </Link>
<<<<<<< HEAD
          <Link to={'/guide'}>
=======
          <Link to={"/guide"}>
>>>>>>> 76398b156c95c624d6be8a0c31ced33fd9886977
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
          <Link to={"/join"}>
            <li className="login">
              <a>회원가입</a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Nav;
