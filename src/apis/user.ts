import { useQuery } from 'react-query';
import type { User } from '@type';
import type { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

export const useFetchUsers = () => {
  const { baseInstance } = useAxiosInstance();
  const { data, isError, isSuccess, isLoading, refetch } = useQuery<
    AxiosResponse<User[]>,
    AxiosError,
    User[]
  >('users', () => baseInstance.get('/users/get-users'), {
    select: ({ data }) => {
      return data.filter((user) => user.role !== 'SuperAdmin');
    },
  });
  return {
    usersData: data,
    isUsersError: isError,
    isUsersSuccess: isSuccess,
    isUsersLoading: isLoading,
    usersDataRefetch: refetch,
  };
};

export const useFetchUser = (userId: string) => {
  const { baseInstance } = useAxiosInstance();
  const { data, isError, isSuccess, isLoading, refetch } = useQuery<
    AxiosResponse<User>,
    AxiosError
  >('user', () => baseInstance.get(`/users/${userId}`));
  return {
    userData: data?.data,
    isUserError: isError,
    isUserSuccess: isSuccess,
    isUserLoading: isLoading,
    userDataRefetch: refetch,
  };
};
