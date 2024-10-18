import axios from "axios"
import { serverURL } from "../api/kakaoAPi";
import {Cookies} from "react-cookie";

const cookie = new Cookies();

export const setCookie = (name, value, days) => {
    const expire = new Date();
    expire.setUTCDate(expire.setUTCDate() + days);
  
    cookie.set(name, value, expire);
}
  
export const getCookie = (name) => {
    return cookie.get(name);
}

export const refreshToken = async (accessToken, refreshToken) => {
    const headers = {headers: {'Authorization': `Bearer ${accessToken}`}};
    const res = await axios.get(`${serverURL}/member/refresh?refreshToken=${refreshToken}`, param, headers);
    return res;
}

