import "../css/join.css"
import Nav from '../components/Nav'
import Footer from '../components/Footer'
const Join = () => {
 return (
  <div className="join-outer-container">
    <Nav/>
    <div className="form-container">
     <div className="form-inner-container">

      <div className="form-title">
       <h4 className="join-title">
        회원가입
       </h4>
      </div>

      <div className="join-form-wrapper">
      {/* 아이템 */}
       <div className="join-form-item">

        <div className="join-form-subitem1">
         <p>이름</p>
        </div>

        <div className="join-form-subitem2">
         <input></input>
        </div>

       </div>
      {/* 아이템 */}
       <div className="join-form-item">

        <div className="join-form-subitem1">
         <p>생년월일</p>
        </div>

        <div className="join-form-subitem2">
         <input></input>
        </div>

       </div>
      {/* 아이템 */}
       <div className="join-form-item">

        <div className="join-form-subitem1">
         <p>전화번호</p>
        </div>

        <div className="join-form-subitem2">
         <input></input>
        </div>

       </div>
      {/* 아이템 */}
       <div className="join-form-item">

        <div className="join-form-subitem1">
         <p>이메일</p>
        </div>

        <div className="join-form-subitem2">
         <input></input>
        </div>

       </div>
      {/* 아이템 */}
       <div className="join-form-item">

        <div className="join-form-subitem1">
         <p>주소</p>
        </div>

        <div className="join-form-subitem2">
         <input></input>
        </div>

       </div>
      {/* 아이템 */}
       <div className="join-form-item">

        <div className="join-form-subitem1">
         <p>자기소개</p>
        </div>

        <div className="join-form-subitem2">
         <textarea cols="30" rows="300"></textarea>
        </div>

       </div>

       {/* 버튼들 */}
       <div className="join-btns-wrapper">
        <button className="cancel-join-btn">취소</button>
        <button className="join-btn">완료</button>
       </div>
      </div>

     </div>
    </div>
    <Footer/>
  </div>
 )
}

export default Join;