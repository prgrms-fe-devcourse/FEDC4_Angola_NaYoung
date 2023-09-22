import { atom, selector } from 'recoil';
import { calculateLevelByArchives } from '@utils/calculateUserLevel';
import { Archives } from '@type/level';

export const userArchives = atom<Archives | null>({
  key: 'userArchives',
  default: null,
});

export const userLevel = selector({
  key: 'userLevel',
  get: ({ get }) => {
    const storedArchives = get(userArchives);
    if (!storedArchives) return null;
    return calculateLevelByArchives(storedArchives);
  },
});
