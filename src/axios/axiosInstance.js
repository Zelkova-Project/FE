import axios from 'axios';
import {getCookie, setCookie} from '../utils/cookieUtil'
import { refreshToken } from '../utils/cookieUtil'

const isDev = process.env.NODE_ENV == 'development';



const instance = axios.create({
  baseURL: isDev ? 'http://localhost:8080/api' : '/api',
  timeout: 30000,
});

const beforeReq = (config) => {
  if (config.url.includes('/login')) return;

  const memberInfo = getCookie('memberInfo');
  if (!memberInfo) {
    return new Promise({
      response: {
        data: {
          error: 'REQUIRE_LOGIN'
        }
      }
    })
  }

  config.headers.Authorization = `Bearer ${memberInfo.accessToken}`
  return config;
}

const requestFail = (err) => {
  return new Promise.reject(err);
}

const beforeRes = async (res) => {
  let memberInfo = getCookie('memberInfo');

  if (res.data.error == 'ERROR_ACCESS_TOKEN') {
    const { data } = await refreshToken(memberInfo.accessToken);
    memberInfo.accessToken = data.accessToken;
    memberInfo.refreshToken = data.refreshToken;

    setCookie('memberInfo', JSON.stringify(memberInfo), 1)
  }

  return res;
}

const responseFail = (err) => {
  return new Promise.reject(err);
}

instance.interceptors.request.use(beforeReq, requestFail);
instance.interceptors.response.use(beforeRes, responseFail);


// function getCookie(name) {
//   let matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }
// instance.interceptors.request.use(
//   (config) => {
//     // as-is 주석 (BE_r1 미사용)
//     // const accessToken = getToken();

//     // const inValidUrl = ['/login', '/signup'];
//     // const is적용할Url = !inValidUrl.includes(config.url);

//     // if (is적용할Url) {
//     //   config.headers['X-XSRF-Token'] = accessToken;
//     // }

//     // to-be
//     config.headers['Authorization'] = 'Bearer ' + getCookie('accessToken');

//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (response) => {
//     if (response.status === 404) {
//       console.log('404 페이지로 넘어가야 함!');
//     }

//     return {
//       status: response.status,
//       error: false,
//       message: response.statusText,
//       data: response?.data ? response.data : data,
//     };
//   },
//   async (error) => {
//     // if (error.response?.status === 401) {
//     // if (isTokenExpired()) await tokenRefresh();

//     // const accessToken = getToken();

//     // error.config.headers = {
//     //   'Content-Type': 'application/json',
//     //   Authorization: `Bearer ${accessToken}`,
//     // };

//     //   const response = await axios.request(error.config);
//     //   return response;
//     // }
//     // throw new Error('error가 떴음 ', error);
//     try {
//       const { response } = error;
//       console.error('error ', error);
      
//       return { status: 404, error: error, message: response.data };
//     } catch(e) {
      
//       console.error('error ', e);
//       return { status: 404, error: error, message: e };
//     }
//   },
// );

// export default instance;


