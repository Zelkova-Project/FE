import axios from 'axios';

const isDev = process.env.NODE_ENV == 'development';

const CACHE_NAME = 'API-CACHE';
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

const instance = axios.create({
  baseURL: isDev ? '/' : '/api/',
  timeout: 1000,
});

const transferObjToResponse = (responseObject) => {
  // Step 1: Stringify the object to a JSON string
  const jsonString = JSON.stringify(responseObject);

// Step 2: Create a Blob from the JSON string
  const blob = new Blob([jsonString], { type: 'application/json' });
  return new Response(blob, {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function cacheResponse(url, response) {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(url, transferObjToResponse(response));

  const metadata = {
    timestamp: Date.now()
  };

  const metadataResponse = new Response(JSON.stringify(metadata));

  await cache.put(`${url}-metadata`, metadataResponse);
}

async function getCachedResponse(url) {
  const cache = await caches.open(CACHE_NAME);
  const metadataResponse = await cache.match(`${url}-metadata`);
  if (metadataResponse) {
    const metadata = await metadataResponse.json();
    const currentTime = Date.now();

    if (currentTime - metadata.timestamp < EXPIRATION_TIME) {
      return cache.match(url);
    } else {
      await cache.delete(url);
      await cache.delete(`${url}-metadata`);
      return null;
    }
  }

  return null;
}

const getToken = () => {
  let cookie = document.cookie;
  const [key, val] = cookie.split('=');
  return val;
};

instance.interceptors.request.use(
  async (config) => {
    const cachedResponse = await getCachedResponse(config.url);

    const inValidUrl = ['/login', '/signup'];
    const is적용할Url = !inValidUrl.includes(config.url);

    const accessToken = getToken();

    if (is적용할Url) {
      config.headers['X-XSRF-Token'] = accessToken;
    }

    if (cachedResponse) {
      return Promise.reject({config, request:{}, response:cachedResponse, isCached:true});
    }


    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response) => {
    if (response.status === 404) {
      console.log('404 페이지로 넘어가야 함!');
    }

    console.log('>>> response ', response);

    if (response.config && response.config.url) {
      await cacheResponse(response.config.url, response);
    }

    return {
      status: response.status,
      error: false,
      message: response.statusText,
      data: response.data,
    };
  },
  async (error) => {
    const { response } = error;
    console.error('error res ');

    let res = await error.response.text();
    // error.response.text().then(res=> {
    //   console.log('res >> ', res);
    // })

    // const reader = response.body.getReader();
    // reader.read().then(({done, value}) => {
    //   console.log('value ', value);
    // })

    // function readStream() {
    //   let res = '';
    //   return reader.read().then(({ done, value }) => {
    //     if (done) {
    //       console.log('res> ', res);
    //       console.log('Stream reading complete');
    //       console.log('555522Received chunk:', new TextDecoder().decode(value));
    //       return;
    //     }

    //     console.log('22Received chunk:', new TextDecoder().decode(value));
    //     let test = new TextDecoder().decode(value);
    //     console.log('test >>> ', test);
    //     res = test;
    //
    //     return readStream();
    //   });
    // }
    //
    // readStream();

    return { status: 404, error: error, message: response.data, data: res };
  },
);

export default instance;
