import { atom, useRecoilState } from 'recoil';

const loginState = atom({
  key: 'isLogin',
  default: false,
});
const tokenState = atom({
  key: 'token',
  default: '',
});

export {
  loginState,
  tokenState
}
