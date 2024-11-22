import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '@/common/utils/loginUtil';

const isDev = process.env.NODE_ENV == 'development';

const instance = axios.create({
  baseURL: isDev ? 'http://localhost:8080/api' : '/api',
  timeout: 30000,
});

const beforeRequest = config => {
  const memberInfo = getCookie('memberInfo');
  
  const commentRegexp = /^\/comment\/\d+$/;

  if (
      !config.url.includes('/login') 
        && !config.url.includes('/board') 
        && !config.url.includes('/likedUserList') 
        && !commentRegexp.test(config.url)
    ) {
    if (!memberInfo) {
      return Promise.reject({
        response: {
          data: {
            error: 'REQUIRE_LOGIN'
          }
        }
      })
    }

    config.headers.Authorization = `Bearer ${memberInfo.accessToken}`;
  }

  return config;
}

const requestFail = (err) => {
  removeCookie('memberInfo');
  return Promise.reject(err);
}

const beforeResponse = async (res) => {
  const errorCode = ['ERROR_ACCESS_TOKEN', 'ERROR_LOGIN'];
  const isError = errorCode.includes(res.data.error);
  
  // 파라미터로 받는 res가 isError 블럭 안에서는 작동이 안되는 현상...
  let res1 = res;
  
  if (isError) {
    const memberInfo = getCookie('memberInfo');

    const accessToken = memberInfo?.accessToken;
    const refreshToken = memberInfo?.refreshToken;

    if (!accessToken || !refreshToken)  {
      removeCookie('memberInfo');
      
      let errMsg = res1.data.error;

      return Promise.reject({
        message: errMsg
      });
    }

    const res = await axios.get('/member/refresh', refreshToken);
    const newAccessToken = res.data.accessToken;
    const newRefreshToken = res.data.refreshToken;

    memberInfo.accessToken = newAccessToken;
    memberInfo.refreshToken = newRefreshToken;
    
    // react-cookie detect auto and change automatically?

    removeCookie('memberInfo');
    setCookie('memberInfo', memberInfo, 1);
  }

  return {
    status: res.status,
    error: false,
    message: res.statusText,
    data: res?.data ? res.data : data,
  };
}

const responseFail = err => {
  return Promise.reject({
    error: true,
    data: err
  });
}

instance.interceptors.request.use(beforeRequest, requestFail);
instance.interceptors.response.use(beforeResponse, responseFail);

export default instance;




