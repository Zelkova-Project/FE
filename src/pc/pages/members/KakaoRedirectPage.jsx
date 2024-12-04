import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { getAccessToken, getMemberWithAccessToken } from '@/common/api/kakaoAPi';

import { useRecoilState } from 'recoil';
import { userInfoState } from '@/common/recoilState/recoil';

const KakaoRedirectPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const authCode = searchParam.get('code');

  useEffect(() => {
    getAccessToken(authCode).then((access_token) => {
      getMemberWithAccessToken(access_token).then((res) => {
        setUserInfo('');

        let memberInfo = {
          ...res.data
        }

        setUserInfo(memberInfo.data);

        // 임시로 모두 main으로 처리
        if (res.isSocial) {
          navigate('/');
        } else {
          navigate('/');
        }
        
      });
    });
  }, [authCode]);

  return <></>;
};

export default KakaoRedirectPage;


