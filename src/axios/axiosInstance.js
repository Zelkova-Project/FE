import axios from 'axios';

const isDev = process.env.NODE_ENV == 'development';

const instance = axios.create({
  baseURL: isDev ? 'http://localhost:8080/api' : '/api',
  timeout: 1000,
});

const getToken = () => {
  let cookie = document.cookie;
  const [key, val] = cookie.split('=');

  return val;
};

instance.interceptors.request.use(
  (config) => {
    // as-is 주석 (BE_r1 미사용)
    // const accessToken = getToken();

    // const inValidUrl = ['/login', '/signup'];
    // const is적용할Url = !inValidUrl.includes(config.url);

    // if (is적용할Url) {
    //   config.headers['X-XSRF-Token'] = accessToken;
    // }

    // to-be
    config.headers['Authorization'] = 'Bearer ' + getToken();

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log('404 페이지로 넘어가야 함!');
    }

    return {
      status: response.status,
      error: false,
      message: response.statusText,
      data: response.data,
    };
  },
  async (error) => {
    // if (error.response?.status === 401) {
    // if (isTokenExpired()) await tokenRefresh();

    // const accessToken = getToken();

    // error.config.headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${accessToken}`,
    // };

    //   const response = await axios.request(error.config);
    //   return response;
    // }
    // throw new Error('error가 떴음 ', error);
    const { response } = error;
    console.error('error ', error);
    
    return { status: 404, error: error, message: response.data };
  },
);

export default instance;
