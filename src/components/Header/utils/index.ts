import { TITLE } from '../constants';

export const getPathname = (segment: number) => {
	return location.pathname.split('/')[segment];
};

export const getTitle = (pathname: string) => {
	return (
		pathname.startsWith(`/${getPathname(1)}`) && TITLE[`/${getPathname(1)}`]
	);
};
