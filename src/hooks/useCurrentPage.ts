/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useMatch } from 'react-router-dom';
import { routes } from '@routes';
import { parseQueryString } from '@utils';

interface SearchParams {
  show?: 'true';
  voted?: 'true';
  keyword?: string;
  sort?: string;
}

interface Params {
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

const useCurrentPage = (): CurrentPage => {
  const location = useLocation();
  const searchParams = parseQueryString(location.search);

  let result: CurrentPage = {
    name: '404',
    title: 'not found',
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

export default useCurrentPage;
