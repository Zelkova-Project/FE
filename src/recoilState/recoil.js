import { atom, useRecoilState } from 'recoil';

const loginState = atom({
  key: 'isLogin',
  default: false,
});
const tokenState = atom({
  key: 'token',
  default: '',
});
const subtitState = atom({
  key: 'subtit',
  default: '',
});
const navIdxState = atom({
  key: 'navIdx',
  default: 0,
});
const pageState = atom({
  key: 'page',
  default: 0,
});

export {
  loginState,
  tokenState,
  subtitState,
  pageState,
  navIdxState
}
