import style from '@/mobile/css/mProfile.css';
import style2 from '@/mobile/css/topBar.css';
import { useNavigate } from 'react-router-dom';

const MLoginPage = () => {
  const navigate = useNavigate();
    return (
        <>
          {/*상단바*/}
          <div className={'top-bar'}>
            <div className={'top-bar-left'}>
              <img src={'/back.png'} alt={'back'}  onClick={() => navigate(-1)}/>
            </div>
            <div className={'top-bar-center'}>
              오류
            </div>
          </div>

          {/*애러 페이지*/}
          <div className='container'>
            <div className='wrap1'>
              <div className='error-img'>
                <img src={'/error-img.png'} alt={'오류'} />
              </div>
              <div className='error-txt'>
                <div>앗! 오류가 발생했어요.</div>
                <div>잠시 후에 다시 시도해 주세요.</div>
                <button onClick={() => navigate(-1)}>
                  돌아가기
                </button>
              </div>
            </div>
          </div>
        </>
    )
}

export default MLoginPage;