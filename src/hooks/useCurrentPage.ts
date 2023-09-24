/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useMatch } from 'react-router-dom';
import { routes } from '@routes';
import { parseQueryString } from '@utils';

export interface SearchParams {
  show?: 'true';
  voted?: string;
  keyword?: string;
  sort?: string;
}

export interface Params {
  target?: 'user' | 'post';
  userId?: string;
  postId?: string;
}

interface CurrentPage {
  name: string;
  title: string;
  params: Params;
  search: SearchParams;
}

export const useCurrentPage = (): CurrentPage => {
  const location = useLocation();
  const searchParams = parseQueryString(location.search);

  let result: CurrentPage = {
    name: '404',
    title: '알 수 없는 페이지',
    params: {},
    search: {},
  };
  for (const route of routes) {
    const match = useMatch(route.path);
    if (match) {
      result = {
        name: route.name,
        title: route.title,
        params: match.params,
        search: searchParams,
      };
    }
  }
  return result;
};
