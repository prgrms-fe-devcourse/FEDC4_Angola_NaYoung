import { useQuery } from 'react-query';
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
	>('allPosts', () => baseInstance.get(path), {
		staleTime: 5000,
	});
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
	>('userPosts', () => baseInstance.get(path), {
		staleTime: 5000,
	});
	return {
		userPostsData: data?.data,
		userPostsError: isError,
		userPostsLoading: isLoading,
		userPostsSuccess: isSuccess,
	};
};

// export const useFetchUserPosts = async (authorId: number) => {
// 	const { baseInstance } = useAxiosInstance();
// 	const path = `/posts/author/${authorId}`;
// 	const res = useQuery('fetchUserPosts', () => baseInstance.get<Post[]>(path), {
// 		staleTime: 5000,
// 	});

// 	return res;
// };

export const useFetchPost = async (postId: number) => {
	const { baseInstance } = useAxiosInstance();
	const path = `/posts/${postId}}`;

	try {
		const response = await baseInstance.get<Post>(path);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const useFetchCreatePost = async (title: string): Promise<void> => {
	const { authInstance } = useAxiosInstance();
	const path = `/posts/create`;

	const formData = new FormData();
	formData.append('title', title);
	formData.append('image', '');
	formData.append('channelId', CHANNEL_ID);

	try {
		await authInstance.post(path, formData);
		console.log('Creating Post Successes');
	} catch (error) {
		console.error(error);
	}
};

export const useFetchDeletePost = async (id: string): Promise<void> => {
	const { authInstance } = useAxiosInstance();
	const path = `/posts/delete`;

	try {
		await authInstance.delete(path, { data: { id } });
		console.log('Deleting Post Successes');
	} catch (error) {
		console.error(error);
	}
};
