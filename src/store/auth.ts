import { authInfoStorage } from '@storage';
import { atom, selector } from 'recoil';
import type { AuthInfo } from '@type/auth';

const authInfo = atom<AuthInfo | null>({
  key: 'authInfo',
  default: authInfoStorage.getItem(),
});

export const authInfoState = selector({
  key: 'autoInfoState',
  get: ({ get }) => {
    return get(authInfo);
  },
  set: ({ set }, newInfo) => {
    set(authInfo, newInfo);
    authInfoStorage.setItem(newInfo as AuthInfo);
  },
});
