import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  timeout: 1000,
});

const getToken = () => {
  let cookie = document.cookie;  
  const [key, val] = cookie.split("=");
  console.log('><>>>> val ', val);
  return val;
}

instance.interceptors.request.use(
  (config) => {
    const accessToken = getToken();

    const inValidUrl = ['/login', '/signup'];
    const is적용할Url = !inValidUrl.includes(config.url);
    console.log('is적용할Url > ', is적용할Url);
    if (is적용할Url) {
      config.headers['X-XSRF-Token'] = accessToken;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log('404 페이지로 넘어가야 함!');
    }

    return {status: response.status, error: false, message: response.statusText, data: response.data};
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
    const {response} = error;
    console.error('error ', error);

    return {status: 404, error: error, message: response.data};
  }
);

export default instance;