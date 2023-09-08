import { useQuery } from 'react-query';
import { Post, User } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

interface SearchRequestQuery {
	query: string;
}

interface SearchUsersResponseData {
	users: User[];
}

// (User | Post)[] 객체를 받음, 필요한 건 Post의 _id: string title: string, likes: Like[], comments: Comment[], createdAt: string, author: User
export const useFetchSearchPosts = ({ query }: SearchRequestQuery) => {
	const { baseInstance } = useAxiosInstance();
	const { data, isSuccess, isError, isLoading } = useQuery<
		AxiosResponse<(User | Post)[]>,
		AxiosError
	>('searchPostsMutation', () => baseInstance.get(`/search/all/${query}`));
	return {
		searchPostsData: data?.data.filter((resData) => 'title' in resData),
		isSearchPostsSuccess: isSuccess,
		isSearchPostsError: isError,
		isSearchPostsLoading: isLoading,
	};
};

// User[] 객체를 받음, 필요한 건 _id: string, image: string, fullName: string, likes: Like[], followers: [],
export const useFetchSearchUsers = ({ query }: SearchRequestQuery) => {
	const { baseInstance } = useAxiosInstance();
	const { data, isSuccess, isError, isLoading } = useQuery<
		AxiosResponse<User[]>,
		AxiosError,
		SearchUsersResponseData
	>('searchUsers', () => baseInstance.get(`/search/users/${query}`));
	return {
		searchUsersData: data,
		isSearchUsersSuccess: isSuccess,
		isSearchUsersError: isError,
		isSearchUsersLoading: isLoading,
	};
};
