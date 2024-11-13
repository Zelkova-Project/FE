import { Cookies } from "react-cookie";

const cookie = new Cookies();

const setCookie = (name, value, days) => {
  let expire = new Date();
  const expire_days = expire.getUTCDate() + days;
  expire.setUTCDate(expire_days);

  cookie.set(name, value, expire);
}

const getCookie = (name) => {
  return cookie.get(name);
}

const removeCookie = (name, path = "/") => {
  cookie.remove(name, { path });
}

const refreshToken = async (refreshToken) => {
    let memberInfo = getCookie("memberInfo");

    const res = await axios.get("/member/refresh", refreshToken);
    memberInfo['accessToken'] = res.data.accessToken;
    memberInfo['refreshToken'] = res.data.refreshToken;

    setCookie(memberInfo);
}

  export {
    refreshToken,
    getCookie,
    setCookie,
    removeCookie
  }

