import { useQuery } from 'react-query';
import { User } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

// 사용자 목록 불러오기 :fetchUsers(GET)

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
