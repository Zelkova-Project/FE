import style from '@/mobile/css/mComplete.css';
import { useNavigate, useLocation } from 'react-router-dom';

const MLoginPage = () => {
  document.body.style.overflow = 'hidden';
  const navigate = useNavigate();

  const location = useLocation();
  const { mainMsg, subMsg, buttonMsg, buttonURL, subMovDisplayYn, subMovMsg, subMovURL } = location.state || {};

  return (
    <>
      {/*애러 페이지*/}
      <div className='container'>
        <div className='wrap1'>
          <div className='complete-img'>
            <img src={'/complete-img.png'} alt={'완료'} />
          </div>
          <div className='complete-txt'>
            <div>{mainMsg}</div> {/*메인메시지*/}
            <div>{subMsg}</div> {/*서브메시지*/}
            <button onClick={() => navigate(buttonURL)}>
              {buttonMsg}
            </button> {/*버튼메시지*/}
            <div onClick={() => navigate(subMovURL)} style={{ display: subMovDisplayYn ? 'block' : 'none' }}>
              {subMovMsg}
            </div> {/*서브이동 메시지*/}
          </div>
        </div>
      </div>
    </>
  )
}

export default MLoginPage;