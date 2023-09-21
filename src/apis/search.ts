import { useQuery } from 'react-query';
import { Post, User } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

interface SearchRequestQuery {
  query?: string;
}

export const useFetchSearchPosts = ({ query }: SearchRequestQuery) => {
  const { baseInstance } = useAxiosInstance();
  const { data, isSuccess, isError, isLoading, refetch } = useQuery<
    AxiosResponse<(User | Post)[]>,
    AxiosError
  >('searchPosts', () => baseInstance.get(`/search/all/${query}`));

  return {
    searchPostsData: data?.data.filter((resData) => {
      return 'title' in resData;
    }) as Post[],
    isSearchPostsSuccess: isSuccess,
    isSearchPostsError: isError,
    isSearchPostsLoading: isLoading,
    searchPostsDataRefetch: refetch,
  };
};

export const useFetchSearchUsers = ({ query }: SearchRequestQuery) => {
  const { baseInstance } = useAxiosInstance();
  const { data, isSuccess, isError, isLoading, refetch } = useQuery<
    AxiosResponse<User[]>,
    AxiosError
  >('searchUsers', () => baseInstance.get(`/search/users/${query}`));
  return {
    searchUsersData: data?.data.filter((user) => user.role !== 'SuperAdmin'), // Todo : Admin 거르기
    isSearchUsersSuccess: isSuccess,
    isSearchUsersError: isError,
    isSearchUsersLoading: isLoading,
    searchUsersDataRefetch: refetch,
  };
};
