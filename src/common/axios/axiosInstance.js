import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/common/recoilState/recoil';


const useAxiosInsance = () => {
  const isDev = process.env.NODE_ENV == 'development';
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const instance = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : '/api',
    timeout: 30000,
  });
  
  const beforeRequest = config => {
    const commentRegexp = /^\/comment\/\d+$/;
  
    if (
        !config.url.includes('/login') 
          && !config.url.includes('/board') 
          && !config.url.includes('/likedUserList') 
          && !commentRegexp.test(config.url)
      ) {
      if (!userInfo) {
        return Promise.reject({
          response: {
            data: {
              error: 'REQUIRE_LOGIN'
            }
          }
        })
      }
  
      config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    }
  
    return config;
  }
  
  const requestFail = (err) => {
    setUserInfo('');
    return Promise.reject(err);
  }
  
  const beforeResponse = async (res) => {
    let isError = res.status != 200;
    const EXCEPT_URL = ['/image/webp/', '/login'];
  
    if (EXCEPT_URL.includes(res?.config.url)) {
      return res;
    }
    // 파라미터로 받는 res가 isError 블럭 안에서는 작동이 안되는 현상...
    let res1 = res;
    
    if (isError) {
      const accessToken = userInfo?.accessToken;
      const refreshToken = userInfo?.refreshToken;

      setUserInfo({
        ...userInfo,
        accessToken,
        refreshToken        
      });
  
      if (!accessToken || !refreshToken)  {
         setUserInfo('');
        
        let errMsg = res1.data.error;
  
        return Promise.reject({
          message: errMsg
        });
      }
  
      const res = await axios.get('/member/refresh', refreshToken);
      const newAccessToken = res.data.accessToken;
      const newRefreshToken = res.data.refreshToken;
      
      setUserInfo({
        ...userInfo,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
      
    }
  
    return {
      ...res.data,
      isError: res.status != 200
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

  return instance;
}

export default useAxiosInsance;
