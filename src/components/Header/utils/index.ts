import { getPathname } from '@utils/index';
import { TITLE } from '../constants';

export const getTitle = (pathname: string) => {
  return (
    pathname.startsWith(`/${getPathname(1)}`) && TITLE[`/${getPathname(1)}`]
  );
};
