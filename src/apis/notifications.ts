import { useMutation, useQuery } from 'react-query';
import { Notification } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

export const GET_NOTIFICATIONS_KEY = 'getNotifications';
export const READ_NOTIFICATIONS_KEY = 'readNotifications';
export const CREATE_NOTIFICATIONS_KEY = 'createNotifications';

// [GET] - 내 알림 목록 조회
export const useFetchGetNotifications = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = () => authInstance.get('/notifications');

	const { data, isLoading, isError, isSuccess } = useQuery<
		AxiosResponse<Notification[]>,
		AxiosError
	>(
		GET_NOTIFICATIONS_KEY,
		fetcher,
		// {
		//   select: (data) => {
		//     return data.data;
		//   }
		// }
	);

	return {
		getNotificationsData: data,
		isGetNotificationsLoading: isLoading,
		isGetNotificationsError: isError,
		isGetNotificationsSuccess: isSuccess,
	};
};

// [PUT] - 알림 확인 처리
export const useFetchReadNotifications = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = () => authInstance.put('/notifications/seen');

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		READ_NOTIFICATIONS_KEY,
		fetcher,
	);

	return {
		readNotifications: mutate,
		isReadNotificationsLoading: isLoading,
		isReadNotificationsError: isError,
		isReadNotificationsSuccess: isSuccess,
	};
};

// [POST] - 알림 생성
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
	>(CREATE_NOTIFICATIONS_KEY, fetcher);

	return {
		createNotification: mutate,
		createNotificationData: data?.data,
		isCreateNotificationLoading: isLoading,
		isCreateNotificationError: isError,
		isCreateNotificationSuccess: isSuccess,
	};
};
