import style from '@/mobile/css/notFound.css';
import { useNavigate } from 'react-router';

const MLoginPage = () => {
  const navigate = useNavigate();

    return (
        <>
          <div className='container'>
            {/*상단바*/}
            <div>
              오류
            </div>

            {/*애러 페이지*/}
            <div className='wrap1'>
              <div className='error-img'>
                <img src={'/error-img.png'} alt={'오류'} />
              </div>
              <div className='error-txt'>
                <div>앗! 오류가 발생했어요.</div>
                <div>잠시 후에 다시 시도해 주세요.</div>
                <button  onClick={() => navigate(-1)}>
                  이전으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        </>
    )
}

export default MLoginPage;
