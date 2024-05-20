import "../css/login.css";

const LoginPage = () => {
 return (
  <div className="login-container">
   <div className="login-wrapper">
    
    <div className="img-box">
     <img src="logo72.png"/>
    </div>

    <div className="title">
     <p>
      더불어 살아가는<br/>
      <span>느티나무 복지관입니다</span>
     </p>
    </div>

    <div className="kakao">
       <img src="카카오로그인.png"/>
    </div>

    <div className="other-login">
       <p>
        다른 방법으로 로그인
       </p>
    </div>

    <div className="google">
    <div className="">
       <img src="구글로그인.png"/>
     </div>
    </div>

   </div>
  </div>
 )
}

export default LoginPage;