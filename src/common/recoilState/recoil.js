import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'loginMember',
  storage: localStorage,
});

const loginState = atom({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [persistAtom],
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
const userInfoState = atom({
  key: 'user',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

const activeInfoState = atom({
  key: 'active',
  default: {
    activePage: 'guide',
    activeIdx: 0,
  },
});

export {
  loginState,
  tokenState,
  subtitState,
  pageState,
  navIdxState,
  userInfoState,
  activeInfoState,
};
