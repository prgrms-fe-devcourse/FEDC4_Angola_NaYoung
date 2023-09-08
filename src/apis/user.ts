import { useQuery } from 'react-query';
import { authInfoState } from '@/atoms';
import { User } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';
import useAxiosInstance from './instance';

type PickUsersData = Pick<
	User,
	'image' | 'likes' | '_id' | 'fullName' | 'followers'
>;

export const useFetchUsers = () => {
	const { baseInstance } = useAxiosInstance();
	const { data, isError, isSuccess, isLoading } = useQuery<
		AxiosResponse<User[]>,
		AxiosError,
		PickUsersData[] | []
	>('user', () => baseInstance.get('/users/get-users'), {
		select: ({ data }) => {
			if (data) {
				return data.map((user) => ({
					image: user.image,
					likes: user.likes,
					_id: user._id,
					fullName: user.fullName,
					followers: user.followers,
				}));
			}
			return [];
		},
	});
	return {
		data,
		isError,
		isSuccess,
		isLoading,
	};
};

type PickUserData = Pick<
	User,
	'image' | 'posts' | 'likes' | 'followers' | 'following' | '_id' | 'fullName'
>;

export const useFetchUser = () => {
	const { baseInstance } = useAxiosInstance();
	const auth = useRecoilValue(authInfoState);
	const { data, isError, isSuccess, isLoading } = useQuery<
		AxiosResponse<User>,
		AxiosError,
		PickUserData
	>('user', () => baseInstance.get(`/users/${auth?.userId}`), {
		select: ({ data }) => {
			return {
				image: data.image,
				posts: data.posts,
				likes: data.likes,
				followers: data.followers,
				following: data.following,
				_id: data._id,
				fullName: data.fullName,
			};
		},
	});
	return {
		data,
		isError,
		isSuccess,
		isLoading,
	};
};
