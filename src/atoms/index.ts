import { tokenStorage } from '@/storage';
import { atom, selector } from 'recoil';

const authToken = atom<string | null>({
	key: 'authToken',
	default: tokenStorage.getItem(),
});

export const authTokenState = selector({
	key: 'autoTokenState',
	get: ({ get }) => {
		return get(authToken);
	},
	set: ({ set }, newToken) => {
		set(authToken, newToken);
		if (typeof newToken === 'string') {
			tokenStorage.setItem(newToken);
		}
	},
});
