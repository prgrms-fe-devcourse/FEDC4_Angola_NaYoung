import { User } from '@type';

export const getSortUserList = (
  searchData: User[] | undefined,
  sort: string,
): User[] | undefined => {
  if (sort === 'follower') {
    return searchData?.sort((a, b) => b.followers.length - a.followers.length);
  } else if (sort === 'like') {
    return searchData?.sort((a, b) => b.likes.length - a.likes.length);
  }
  return searchData;
};
