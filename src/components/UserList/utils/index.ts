import { User } from '@type';
import { calculateLevel } from '@utils/calculateUserLevel';

export const getSortUserList = (
  searchData: User[] | undefined,
  sort: string,
): User[] | undefined => {
  if (sort === 'follower') {
    return searchData?.sort((a, b) => b.followers.length - a.followers.length);
  } else if (sort === 'level') {
    return searchData?.sort((a, b) => calculateLevel(b) - calculateLevel(a));
  }
  return searchData;
};
