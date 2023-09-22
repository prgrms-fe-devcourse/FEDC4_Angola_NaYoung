import { Post } from '@type';
import { User } from '@type';
import { calculateLevel } from '@utils';

export const getSortPostList = (
  searchData: Post[] | undefined,
  sort?: string,
): Post[] | undefined => {
  if (sort === 'recent') {
    return searchData?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } else if (sort === 'like') {
    return searchData?.sort((a, b) => b.likes.length - a.likes.length);
  }
  return searchData;
};

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
