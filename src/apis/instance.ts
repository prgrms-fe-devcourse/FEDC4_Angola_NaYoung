import { authInfoState } from '@/atoms';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

const useAxiosInstance = () => {
	const auth = useRecoilValue(authInfoState);
	const baseInstance = axios.create({
		baseURL: 'https://kdt.frontend.4th.programmers.co.kr:5001/',
	});

	const authInstance = axios.create({
		baseURL: 'https://kdt.frontend.4th.programmers.co.kr:5001/',
		headers: {
			Authorization: `Bearer ${auth?.token}`,
		},
	});

	return { baseInstance, authInstance };
};

export default useAxiosInstance;
