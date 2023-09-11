import { User } from '@type/index';

export const getSortUserList = (
  searchData:
    | Pick<User, 'image' | 'likes' | '_id' | 'fullName' | 'followers'>[]
    | undefined,
  sort: string,
):
  | Pick<User, 'image' | 'likes' | '_id' | 'fullName' | 'followers'>[]
  | undefined => {
  if (sort === 'follower') {
    return searchData?.sort((a, b) => b.followers.length - a.followers.length);
  } else if (sort === 'like') {
    return searchData?.sort((a, b) => b.likes.length - a.likes.length);
  }
  return searchData;
};
