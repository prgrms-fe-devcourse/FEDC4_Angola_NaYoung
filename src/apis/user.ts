import { useQuery } from 'react-query';
import { authInfoState } from '@atoms';
import { User } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';
import useAxiosInstance from './instance';

export const useFetchUsers = () => {
  const { baseInstance } = useAxiosInstance();
  const { data, isError, isSuccess, isLoading } = useQuery<
    AxiosResponse<User[]>,
    AxiosError
  >('user', () => baseInstance.get('/users/get-users'));
  return {
    usersData: data,
    isUsersError: isError,
    isUsersSuccess: isSuccess,
    isUsersLoading: isLoading,
  };
};

export const useFetchUser = () => {
  const { baseInstance } = useAxiosInstance();
  const auth = useRecoilValue(authInfoState);
  const { data, isError, isSuccess, isLoading } = useQuery<
    AxiosResponse<User>,
    AxiosError
  >('user', () => baseInstance.get(`/users/${auth?.userId}`));
  return {
    userData: data,
    isUserError: isError,
    isUserSuccess: isSuccess,
    isUserLoading: isLoading,
  };
};
