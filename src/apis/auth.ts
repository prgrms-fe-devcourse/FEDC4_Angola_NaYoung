import { useMutation, useQuery } from 'react-query';
import { authInfoState } from '@/atoms';
import { User } from '@/types';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import useAxiosInstance from './instance';

interface SignUpRequestBody {
	email: string;
	fullName: string;
	password: string;
}

export const useFetchSignUp = async (body: SignUpRequestBody) => {
	const { baseInstance } = useAxiosInstance();
	const { isSuccess, isError, isLoading } = useMutation(() =>
		baseInstance.post('/signup', body),
	);
	return {
		isSuccess,
		isError,
		isLoading,
	};
};

interface LoginRequestBody {
	email: string;
	password: string;
}

interface LoginResponse {
	user: User;
	token: string;
}

export const useFetchLogin = async (body: LoginRequestBody) => {
	const { baseInstance } = useAxiosInstance();
	const setAuth = useSetRecoilState(authInfoState);
	const { data, isSuccess, isError, isLoading } = useMutation<
		LoginResponse,
		AxiosError,
		LoginResponse
	>('login', () => baseInstance.post('/login', body), {
		onSuccess: (data) => {
			setAuth({
				userId: data.user._id,
				token: data.token,
			});
		},
	});

	return {
		data: data?.user._id,
		isSuccess,
		isError,
		isLoading,
	};
};

// 로그아웃
export const useFetchLogOut = async () => {
	const { authInstance } = useAxiosInstance();
	const { isSuccess, isError, isLoading } = useMutation('logOut', () =>
		authInstance.post('/logout'),
	);

	return {
		isSuccess,
		isError,
		isLoading,
	};
};

// 로그인 인증
export const useFetchAuthUser = async () => {
	const { authInstance } = useAxiosInstance();
	const { data, isSuccess, isError, isLoading } = useQuery<
		User,
		AxiosError,
		string | null
	>('authUser', () => authInstance.get('/auth-user'), {
		select: (data) => {
			if (data) {
				return data._id;
			}
			return null;
		},
	});

	return {
		data,
		isSuccess,
		isError,
		isLoading,
	};
};
