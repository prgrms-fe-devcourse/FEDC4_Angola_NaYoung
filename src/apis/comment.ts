import { useMutation, useQuery } from 'react-query';
import useAxiosInstance from './instance';

export const CREATE_COMMENT_KEY = 'createComment';
export const DELETE_COMMENT_KEY = 'deleteComment';
export const GET_NOTIFICATIONS_KEY = 'getNotifications';
export const READ_NOTIFICATIONS_KEY = 'readNotifications';
export const CREATE_NOTIFICATIONS_KEY = 'createNotifications';

interface CreateCommentRequestBody {
	comment: string;
	postId: string;
}

export const useFetchCreateComment = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = (body: CreateCommentRequestBody) =>
		authInstance.post('/comments/create', body);

	const { data, isSuccess, mutate, isLoading } = useMutation(
		CREATE_COMMENT_KEY,
		fetcher,
	);

	return {
		data,
		createComment: mutate,
		isSuccess,
		isLoading,
	};
};

interface DeleteCommentRequestBody {
	id: string;
}

export const useFetchDeleteComment = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = (body: DeleteCommentRequestBody) =>
		authInstance.delete('/comments/delete', { data: body });

	const { data, isSuccess, mutate, isLoading } = useMutation(
		DELETE_COMMENT_KEY,
		fetcher,
	);

	return {
		data,
		createComment: mutate,
		isSuccess,
		isLoading,
	};
};

export const useFetchGetNotifications = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = () => {
		authInstance.get('/notifications');
	};

	const { data, isSuccess, isLoading } = useQuery(
		GET_NOTIFICATIONS_KEY,
		fetcher,
		// {
		//   select: (data) => {
		//     return data.data;
		//   }
		// }
	);

	return {
		data,
		isSuccess,
		isLoading,
	};
};

export const useFetchReadNotifications = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = () => authInstance.put('/notifications/seen');

	const { data, isSuccess, mutate, isLoading } = useMutation(
		READ_NOTIFICATIONS_KEY,
		fetcher,
	);

	return {
		data,
		readNotifications: mutate,
		isSuccess,
		isLoading,
	};
};

interface CreateNotificationsRequestBody {
	notificationType: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE';
	notificationTypeId: string;
	userId: string;
	postId: string | null;
}

export const useFetchCreateNotifications = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = (body: CreateNotificationsRequestBody) =>
		authInstance.post('/notifications/create', body);

	const { data, isSuccess, mutate, isLoading } = useMutation(
		CREATE_NOTIFICATIONS_KEY,
		fetcher,
	);

	return {
		data,
		createNotifications: mutate,
		isSuccess,
		isLoading,
	};
};
