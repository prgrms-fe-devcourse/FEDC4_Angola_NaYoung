import { useMutation } from 'react-query';
import useAxiosInstance from './instance';

export const CREATE_COMMENT_KEY = 'createComment';
export const DELETE_COMMENT_KEY = 'deleteComment';

interface CreateCommentRequestBody {
	comment: string;
	postId: string;
}

export const useFetchCreateComment = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = (body: CreateCommentRequestBody) =>
		authInstance.post('/comments/create', body);

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		CREATE_COMMENT_KEY,
		fetcher,
	);

	return {
		createComment: mutate,
		isCreateCommentLoading: isLoading,
		isCreateCommentError: isError,
		isCreateCommentSuccess: isSuccess,
	};
};

interface DeleteCommentRequestBody {
	id: string;
}

export const useFetchDeleteComment = () => {
	const { authInstance } = useAxiosInstance();

	const fetcher = (body: DeleteCommentRequestBody) =>
		authInstance.delete('/comments/delete', { data: body });

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		DELETE_COMMENT_KEY,
		fetcher,
	);

	return {
		createComment: mutate,
		isCreateCommentLoading: isLoading,
		isCreateCommentError: isError,
		isCreateCommentSuccess: isSuccess,
	};
};
