import useAxiosInstance from './instance';

interface SignUpRequestBody {
	email: string;
	fullName: string;
	password: string;
}
export const useFetchSignUp = async (body: SignUpRequestBody) => {
	const { baseInstance } = useAxiosInstance();
	try {
		const { data, status } = await baseInstance.post('/signup', body);
		if (status === 200) {
			return data;
		} else {
			throw new Error('정상적인 status가 아닙니다.');
		}
	} catch (error) {
		console.error(error);
		return false;
	}
};
