import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    // const accessToken = getToken();

    // config.headers['Content-Type'] = 'application/json';
    // config.headers['Authorization'] = `Bearer ${accessToken}`;

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

    return {status: response.status, error: false, message: response.statusText};
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