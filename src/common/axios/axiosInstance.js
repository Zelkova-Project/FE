import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '@/common/utils/loginUtil';

const isDev = process.env.NODE_ENV == 'development';

const instance = axios.create({
  baseURL: isDev ? 'http://localhost:8080/api' : '/api',
  timeout: 30000,
});

const beforeRequest = config => {
  console.log('....>> before', config.url);

  const memberInfo = getCookie('memberInfo');
  
  if (!config.url.includes('/login')) {
    config.headers.Authorization = `Bearer ${memberInfo.accessToken}`;

    if (!memberInfo) {
      removeCookie('memberInfo');
  
      return Promise.reject({
        response: {
          data: {
            error: 'REQUIRE_LOGIN'
          }
        }
      })
    }
  }

  return config;
}

const requestFail = (err) => {
  removeCookie('memberInfo');
  return Promise.reject(err);
}

const beforeResponse = async (res) => {
  const isError = res.data.error == 'ERROR_ACCESS_TOKEN';
  
  if (isError) {
    const memberInfo = getCookie('memberInfo');

    const accessToken = memberInfo?.accessToken;
    const refreshToken = memberInfo?.refreshToken;

    if (!accessToken || !refreshToken)  {
      removeCookie('memberInfo');
            
      return Promise.reject({
        response: {
          data: {
            error: 'REQUIRE_LOGIN'
          }
        }
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
  return Promise.reject(err);
}

instance.interceptors.request.use(beforeRequest, requestFail);
instance.interceptors.response.use(beforeResponse, responseFail);

export default instance;

