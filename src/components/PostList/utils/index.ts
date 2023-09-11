import { Post } from '@type/index';

export const getSortPostList = (
  searchData: Post[] | undefined,
  sort: string,
  keyword?: string,
): Post[] | undefined => {
  if (sort === 'recent' && keyword) {
    return searchData?.slice().reverse();
  } else if (sort === 'like') {
    return searchData?.sort((a, b) => b.likes.length - a.likes.length);
  }
  return searchData;
};
