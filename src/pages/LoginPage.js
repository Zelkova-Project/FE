import { Link } from "react-router-dom";
import "../css/login.css";
import { useNavigate, useParams } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const normalLogin = () => {
    navigate(`/normalLogin`);
  }
  
   let Rest_api_key = '41d2a43168a7edd9f941329667a65ef4';
   let redirect_uri = 'http://localhost:3000/oauth';
  let url =
    `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="img-box">
          <img src="logo72.png" />
        </div>

        <div className="title">
          <p>
            더불어 살아가는
            <br />
            <span>느티나무 복지관입니다</span>
          </p>
        </div>

        <div className="kakao">
          <a href={url}>
            <img src="카카오로그인.png" />
          </a>
        </div>

        <div className="other-login">
          <p>다른 방법으로 로그인</p>
        </div>

        <div className="google">
          <div className="">
            <img src="구글로그인.png" />
          </div>
          <div className="">
            <button onClick={normalLogin}>일반로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
