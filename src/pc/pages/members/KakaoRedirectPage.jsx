import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getAccessToken, getMemberWithAccessToken } from '@/common/api/kakaoAPi';

import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { loginState, userInfoState } from '@/common/recoilState/recoil';

import { removeCookie, setCookie } from '@/common/utils/loginUtil';

const KakaoRedirectPage = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const authCode = searchParam.get('code');

  useEffect(() => {
    getAccessToken(authCode).then((access_token) => {
      getMemberWithAccessToken(access_token).then((res) => {
        removeCookie('memberInfo');

        let memberInfo = {
          ...res.data
        }

        // 쿠키에 토큰 넣기
        setCookie('memberInfo', memberInfo, 1);

        // 임시로 모두 main으로 처리
        if (res.isSocial) {
          navigate('/');
        } else {
          navigate('/');
        }

        setLogin(true);
        setUserInfo(memberInfo);
        
      });
    });
  }, [authCode]);

  return <></>;
};

export default KakaoRedirectPage;

