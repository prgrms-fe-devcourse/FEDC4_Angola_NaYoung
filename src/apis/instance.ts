import axios from 'axios';

export const baseInstance = axios.create({
	baseURL: 'https://kdt.frontend.4th.programmers.co.kr:5001/',
});

export const authInstance = axios.create({
	baseURL: 'https://kdt.frontend.4th.programmers.co.kr:5001/',
	headers: {
		Authorization: '',
	},
});

authInstance.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = '';
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
