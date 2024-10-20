import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoAPi';

import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../recoilState/recoil';

import { deleteAllCookies, putCookie } from '../../utils/loginUtil';

const KakaoRedirectPage = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const authCode = searchParam.get('code');

  useEffect(() => {
    getAccessToken(authCode).then((access_token) => {
      getMemberWithAccessToken(access_token).then((res) => {
        deleteAllCookies();

        // 쿠키에 토큰 넣기
        putCookie(res.data.accessToken);

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
