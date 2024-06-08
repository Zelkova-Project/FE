import { atom, useRecoilState } from 'recoil';

const loginState = atom({
  key: 'isLogin',
  default: false,
});

export default loginState;
