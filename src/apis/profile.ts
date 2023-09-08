// 사용자 이미지 변경: fetchUpdateUserImage (POST) POST /users/upload-photo User
import { useMutation } from 'react-query';
import { User } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

// 사용자 정보 변경(닉네임): fetchUpdateFullName

interface UpdateFullNameRequestBody {
	fullName: string;
	userName: string;
}

export const useFetchUpdateFullName = () => {
	const { authInstance } = useAxiosInstance();
	const { mutate, data, isLoading, isError, isSuccess } = useMutation<
		AxiosResponse<User>,
		AxiosError,
		UpdateFullNameRequestBody
	>('updateFullName', (body: UpdateFullNameRequestBody) =>
		authInstance.put('/settings/update-user', body),
	);
	return {
		updateFullName: mutate,
		updateFullNameData: { fullName: data?.data.fullName },
		isUpdateFullNameLoading: isLoading,
		isUpdateFullNameError: isError,
		isUpdateFullNameSuccess: isSuccess,
	};
};

// export const useFetchUpdateUserImage = () => {
// 	const { authInstance } = useAxiosInstance();
// 	const formData = new FormData();
// 	formData.append('isCover', 'false');
// 	formData.append('image', profileImage);
// 	const { mutate, isLoading, isError, isSuccess } = useMutation<
// 		string | Blob,
// 		AxiosError
// 	>(async (profileImage: Blob) => {
// 		const { data } = await authInstance.post('/users/upload-photo', formData, {
// 			headers: { 'Content-Type': 'multipart/form-data' },
// 		});
// 		return data;
// 	});
// 	return {
// 		mutate,
// 		isError,
// 		isSuccess,
// 		isLoading,
// 	};
// };
