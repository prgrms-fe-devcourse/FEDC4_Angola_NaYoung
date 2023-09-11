import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Post, User } from '@type/index';
import useAxiosInstance from './instance';

interface SearchRequestQuery {
  query: string;
}

export const useFetchSearchPosts = ({ query }: SearchRequestQuery) => {
  const { baseInstance } = useAxiosInstance();
  const { data, isSuccess, isError, isLoading } = useQuery<
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
  };
};

export const useFetchSearchUsers = ({ query }: SearchRequestQuery) => {
  const { baseInstance } = useAxiosInstance();
  const { data, isSuccess, isError, isLoading } = useQuery<
    AxiosResponse<User[]>,
    AxiosError
  >('searchUsers', () => baseInstance.get(`/search/users/${query}`));
  return {
    searchUsersData: data?.data.filter((user) => user.role !== 'SuperAdmin'),
    isSearchUsersSuccess: isSuccess,
    isSearchUsersError: isError,
    isSearchUsersLoading: isLoading,
  };
};
