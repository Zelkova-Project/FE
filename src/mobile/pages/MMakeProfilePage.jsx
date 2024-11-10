import style from '@/mobile/css/mComplete.css';
import { useNavigate, useLocation } from 'react-router-dom';

const MLoginPage = () => {
  document.body.style.overflow = 'hidden';
  const navigate = useNavigate();

  return (
    <>
      {/*애러 페이지*/}
      <div className='container'>
          프로필만들기
      </div>
    </>
  )
}

export default MLoginPage;