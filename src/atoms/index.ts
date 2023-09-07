import { tokenStorage } from '@/storage';
import { atom, selector } from 'recoil';

const authToken = atom<string | null>({
	key: 'authToken',
	default: null,
});

export const authTokenState = selector({
	key: 'autoTokenState',
	get: ({ get }) => {
		return get(authToken) || tokenStorage.getItem();
	},
	set: ({ set }, newToken) => {
		set(authToken, newToken);
		if (typeof newToken === 'string') {
			tokenStorage.setItem(newToken);
		}
	},
});
