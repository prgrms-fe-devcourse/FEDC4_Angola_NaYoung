/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useMatch } from 'react-router-dom';
import { routes } from '@/routes';

const useCurrentPage = () => {
	const location = useLocation();
	const searchParams = location.search
		.slice(1)
		.split('&')
		.reduce((obj, query) => {
			const [key, value] = query.split('=');
			return { ...obj, [key]: value };
		}, {});

	for (const route of routes) {
		const match = useMatch(route.path);
		if (match) {
			return {
				title: route.title,
				params: match.params,
				search: searchParams,
			};
		}
	}

	return {
		title: 'not found',
		params: {},
		search: {},
	};
};

export default useCurrentPage;
