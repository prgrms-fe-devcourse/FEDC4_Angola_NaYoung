import { useQuery } from 'react-query';
import { User } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

export const useFetchUsers = () => {
  const { baseInstance } = useAxiosInstance();
  const { data, isError, isSuccess, isLoading } = useQuery<
    AxiosResponse<User[]>,
    AxiosError
  >('user', () => baseInstance.get('/users/get-users'));
  return {
    usersData: data?.data.filter((user) => user.role !== 'SuperAdmin'),
    isUsersError: isError,
    isUsersSuccess: isSuccess,
    isUsersLoading: isLoading,
  };
};

export const useFetchUser = (userId: string) => {
  const { baseInstance } = useAxiosInstance();
  const { data, isError, isSuccess, isLoading } = useQuery<
    AxiosResponse<User>,
    AxiosError
  >('user', () => baseInstance.get(`/users/${userId}`));
  return {
    userData: data?.data,
    isUserError: isError,
    isUserSuccess: isSuccess,
    isUserLoading: isLoading,
  };
};
