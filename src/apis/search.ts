import { useQuery } from 'react-query';
import type { Post, User } from '@type';
import type { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

interface SearchRequestQuery {
  query?: string;
}

export const useFetchSearchPosts = ({ query }: SearchRequestQuery) => {
  const { baseInstance } = useAxiosInstance();
  const { data, isSuccess, isError, isLoading, refetch } = useQuery<
    AxiosResponse<(User | Post)[]>,
    AxiosError,
    Post[]
  >('searchPosts', () => baseInstance.get(`/search/all/${query}`), {
    select: ({ data }) => {
      return data.filter((resData) => {
        return 'title' in resData;
      }) as Post[];
    },
  });

  return {
    searchPostsData: data,
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
    AxiosError,
    User[]
  >('searchUsers', () => baseInstance.get(`/search/users/${query}`), {
    select: ({ data }) => {
      return data.filter((user) => user.role !== 'SuperAdmin');
    },
  });
  return {
    searchUsersData: data,
    isSearchUsersSuccess: isSuccess,
    isSearchUsersError: isError,
    isSearchUsersLoading: isLoading,
    searchUsersDataRefetch: refetch,
  };
};
