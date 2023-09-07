import _Storage from './storage';

export interface AuthInfo {
	token: string;
	userId: string;
}

export const authInfoStorage = new _Storage<AuthInfo | null>({
	storage: localStorage,
	key: 'auth-info',
	defaultValue: null,
});
