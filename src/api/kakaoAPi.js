const rest_api_key = `9c2d13e054748f9773170e41b7c5b422`;
const redirect_uri = 'http://localhost:3000/member/kakao';

const auth_code_path = 'https://kauth.kakao.com/oauth/authorize'; // 인가코드 주는 카카오서버주소

export const getKakaoLoginLink = () => {
  const kakoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakoURL;
};
