import type { AuthInfo } from '@type/auth';
import _Storage from './storage';

export const authInfoStorage = new _Storage<AuthInfo | null>({
  storage: localStorage,
  key: 'auth-info',
  defaultValue: null,
});
