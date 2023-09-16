import { Post } from '@type';

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
