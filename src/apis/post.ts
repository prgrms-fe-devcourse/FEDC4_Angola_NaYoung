import { useMutation, useQuery } from 'react-query';
import { Post } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

const CHANNEL_ID = '64f892e7f1dd5711361d6117';

export const useFetchAllPosts = async () => {
	const { baseInstance } = useAxiosInstance();
	const path = `/posts/channel/${CHANNEL_ID}`;

	const { data, isError, isLoading, isSuccess } = useQuery<
		AxiosResponse<Post[]>,
		AxiosError
	>('allPosts', () => baseInstance.get(path));
	return {
		allPostsData: data?.data,
		allPostsSuccess: isSuccess,
		allPostsError: isError,
		allPostsLoading: isLoading,
	};
};

export const useFetchUserPosts = async (authorId: number) => {
	const { baseInstance } = useAxiosInstance();
	const path = `/posts/author/${authorId}`;

	const { data, isError, isLoading, isSuccess } = useQuery<
		AxiosResponse<Post[]>,
		AxiosError
	>('userPosts', () => baseInstance.get(path));
	return {
		userPostsData: data?.data,
		userPostsError: isError,
		userPostsLoading: isLoading,
		userPostsSuccess: isSuccess,
	};
};

export const useFetchPost = async (postId: number) => {
	const { baseInstance } = useAxiosInstance();
	const path = `/posts/${postId}`;

	const { data, isLoading, isSuccess, isError } = useQuery<
		AxiosResponse<Post>,
		AxiosError
	>('post', () => baseInstance.get(path));
	return {
		postData: data?.data,
		postLoading: isLoading,
		postSuccess: isSuccess,
		postError: isError,
	};
};

export const useFetchCreatePost = async () => {
	const { authInstance } = useAxiosInstance();
	const path = `/posts/create`;

	const { mutate, isLoading, isSuccess, isError } = useMutation(
		'createPost',
		(title: string) => {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('image', '');
			formData.append('channelId', CHANNEL_ID);
			return authInstance.post(path, formData);
		},
	);
	return {
		createPost: mutate,
		createLoading: isLoading,
		createSuccess: isSuccess,
		createError: isError,
	};
};

interface deletePostRequestBody {
	id: string;
}

export const useFetchDeletePost = async () => {
	const { authInstance } = useAxiosInstance();
	const path = `/posts/delete`;

	const { mutate, isLoading, isSuccess, isError } = useMutation<
		AxiosError,
		deletePostRequestBody
	>('deletePost', (body) => authInstance.delete(path, { data: body }));
	return {
		deletePost: mutate,
		deletePostLoading: isLoading,
		deletePostSuccess: isSuccess,
		deletePostError: isError,
	};
};
