import _Storage from './storage';

export const tokenStorage = new _Storage<string | null>({
	storage: localStorage,
	key: 'auth-token',
	defaultValue: null,
});
