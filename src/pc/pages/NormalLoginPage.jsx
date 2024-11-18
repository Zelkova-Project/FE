import style from '@/pc/css/join.module.css';
import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { loginState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';

const NormalLoginPage = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  // http://49.247.174.109:8080
  // let url = 'http://49.247.174.109:8080';

  const goNormalLogin = async () => {
    let { status } = await axios.post('/login', {
      loginId: 'eora21',
      password: 1234,
    });

    if (status == 200) {
      navigate('/');
      setLogin(true);
    }
  };

  return (
    <div className={style['outer-container']}>
      <Nav />
      <div className={style['form-container']}>
        <div className={style['inner-container']}>
          <div className={style['form-title']}>
            <h4 className={style['join-title']}>일반로그인</h4>
          </div>

          <div className={style['join-form-wrapper']}>
            {/* 아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem1']}>
                <p>아이디</p>
              </div>

              <div className={style['join-form-subitem2']}>
                <input></input>
              </div>
            </div>
            {/* 아이템 */}
            <div className={style['join-form-item']}>
              <div className={style['join-form-subitem1']}>
                <p>비밀번호</p>
              </div>

              <div className={style['join-form-subitem2']}>
                <input></input>
              </div>
            </div>

            {/* 버튼들 */}
            <div className={style['join-btns-wrapper']}>
              <button className={style['cancel-join-btn']} onClick={goBack}>
                취소
              </button>
              <button className={style['join-btn']} onClick={goNormalLogin}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NormalLoginPage;
