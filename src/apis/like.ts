import { useMutation } from 'react-query';
import { Like } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

interface LikeRequestBody {
	postId: string;
}

interface UnLikeRequestBody {
	id: string;
}

// Like 객체를 받음, 필요한 건 _id:string, user:string, post:string
export const useFetchLike = () => {
	const { authInstance } = useAxiosInstance();
	const { mutate, data, isSuccess, isError, isLoading } = useMutation<
		AxiosResponse<Like>,
		AxiosError,
		LikeRequestBody
	>('likeMutation', (body: LikeRequestBody) =>
		authInstance.post('/likes/create', body),
	);
	return {
		likeMutate: mutate,
		likeData: {
			likeId: data?.data._id,
			userId: data?.data.user,
			postId: data?.data.post,
		},
		isLikeSuccess: isSuccess,
		isLikeError: isError,
		isLikeLoading: isLoading,
	};
};

// // Like 객체를 받음, 리턴 필요 없음
export const useFetchUnLike = () => {
	const { authInstance } = useAxiosInstance();
	const { mutate, isSuccess, isError, isLoading } = useMutation<
		AxiosResponse<Like>,
		AxiosError,
		UnLikeRequestBody
	>('unLikeMutation', (body: UnLikeRequestBody) =>
		authInstance.delete('/likes/delete', { data: body }),
	);
	return {
		unLikeMutate: mutate,
		isUnLikeSuccess: isSuccess,
		isUnLikeError: isError,
		isUnLikeLoading: isLoading,
	};
};
