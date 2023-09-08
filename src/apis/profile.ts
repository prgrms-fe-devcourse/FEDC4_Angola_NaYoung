import { useMutation } from 'react-query';
import { User } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

interface UpdateFullNameRequestBody {
	fullName: string;
}

export const useFetchUpdateFullName = () => {
	const { authInstance } = useAxiosInstance();
	const { mutate, data, isLoading, isError, isSuccess } = useMutation<
		AxiosResponse<User>,
		AxiosError,
		UpdateFullNameRequestBody
	>('updateFullNameMutation', (body: UpdateFullNameRequestBody) =>
		authInstance.put('/settings/update-user', { ...body, username: '' }),
	);
	return {
		updateFullNameMutate: mutate,
		updateFullNameData: { fullName: data?.data.fullName },
		isUpdateFullNameLoading: isLoading,
		isUpdateFullNameError: isError,
		isUpdateFullNameSuccess: isSuccess,
	};
};

interface UpdatePasswordRequestBody {
	password: string;
}

export const useFetchUpdatePassword = () => {
	const { authInstance } = useAxiosInstance();
	const { mutate, data, isLoading, isError, isSuccess } = useMutation<
		AxiosResponse,
		AxiosError,
		UpdatePasswordRequestBody
	>('updatePasswordMutation', (body: UpdatePasswordRequestBody) =>
		authInstance.put('/settings/update-password', body),
	);
	return {
		updatePasswordMutate: mutate,
		updatePasswordData: { password: data?.data },
		isUpdatePasswordLoading: isLoading,
		isUpdatePasswordError: isError,
		isUpdatePasswordSuccess: isSuccess,
	};
};
