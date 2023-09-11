import { useMutation, useQuery } from 'react-query';
import { Notification } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

export const useFetchGetNotifications = () => {
  const { authInstance } = useAxiosInstance();

  const fetcher = () => authInstance.get('/notifications');

  const { data, isLoading, isError, isSuccess } = useQuery<
    AxiosResponse<Notification[]>,
    AxiosError
  >('getNotifications', fetcher);

  return {
    getNotificationsData: data?.data,
    isGetNotificationsLoading: isLoading,
    isGetNotificationsError: isError,
    isGetNotificationsSuccess: isSuccess,
  };
};

export const useFetchReadNotifications = () => {
  const { authInstance } = useAxiosInstance();

  const fetcher = () => authInstance.put('/notifications/seen');

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    'readNotificationsMutation',
    fetcher,
  );

  return {
    readNotificationsMutate: mutate,
    isReadNotificationsLoading: isLoading,
    isReadNotificationsError: isError,
    isReadNotificationsSuccess: isSuccess,
  };
};

interface CreateNotificationRequestBody {
  notificationType: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE';
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

export const useFetchCreateNotification = () => {
  const { authInstance } = useAxiosInstance();

  const fetcher = (body: CreateNotificationRequestBody) =>
    authInstance.post('/notifications/create', body);

  const { mutate, data, isLoading, isError, isSuccess } = useMutation<
    AxiosResponse<Notification>,
    AxiosError,
    CreateNotificationRequestBody
  >('createNotificationsMutation', fetcher);

  return {
    createNotificationMutate: mutate,
    createNotificationData: data?.data,
    isCreateNotificationLoading: isLoading,
    isCreateNotificationError: isError,
    isCreateNotificationSuccess: isSuccess,
  };
};
