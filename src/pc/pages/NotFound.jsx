import style from '@/pc/css/notFound.module.css';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={style['container']}>
        <div className={style['wrap']}>
          <div className={style['error-img']}>
            <img src={'/error-img.png'} alt={'오류'} />
          </div>
          <div className={style['error-txt']}>
            <div>앗! 오류가 발생했어요.</div>
            <div>잠시 후에 다시 시도해 주세요.</div>
            <div onClick={() => navigate(-1)}>이전으로 돌아가기</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
