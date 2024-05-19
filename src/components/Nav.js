import "../css/nav.css";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="menu-left">
        <ul className="menu-ul">
          <li>
            <img src="logo.png" alt="logo"></img>
          </li>
          <li>기관소개</li>
          <li>공지사항</li>
          <li>후원&자원봉사</li>
          <li>커뮤니티</li>
          <li className="login">
            <a>로그인</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Nav;
