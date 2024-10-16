import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoAPi';

import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../recoilState/recoil';

const KakaoRedirectPage = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const authCode = searchParam.get('code');

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";"); // Get all cookies
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
  
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  useEffect(() => {
    getAccessToken(authCode).then((access_token) => {
      getMemberWithAccessToken(access_token).then((res) => {
        deleteAllCookies();
        // 쿠키에 토큰 넣기
        document.cookie = "accessToken=" + res.data.accessToken + '; max-age=604800; path=/';

        // 임시로 모두 main으로 처리
        if (res.isSocial) {
          navigate('/');
        } else {
          navigate('/');
        }

        setLogin(true);
        setUserInfo(res.data);
      });
    });
  }, [authCode]);

  return <></>;
};

export default KakaoRedirectPage;
