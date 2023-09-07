import { useMutation } from 'react-query';
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
