const serverURL = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api' : '/api';

const rest_api_key = `9c2d13e054748f9773170e41b7c5b422`;
const redirect_uri = 'http://localhost:3000/member/kakao';

const auth_code_path = 'https://kauth.kakao.com/oauth/authorize'; // 인가코드 주는 카카오서버주소
const access_token_url = `https://kauth.kakao.com/oauth/token`; // 토큰 발급 URL

import axios from 'axios';

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode
  }

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
}


export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(`${serverURL}/member/kakao?accessToken=${accessToken}`);
  
  return res;
}