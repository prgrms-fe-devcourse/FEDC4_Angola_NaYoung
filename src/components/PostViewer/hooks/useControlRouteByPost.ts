import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SEARCH_KEYS, SEARCH_VALUES } from '@constants';

export const useControlRouteByPost = ({
  postId,
  isPostPage,
}: {
  postId: string;
  isPostPage: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isSearchParamsIn = (searchKey: string) => {
    return Boolean(searchParams.get(searchKey));
  };

  const [isVoted, setIsVoted] = useState(() =>
    isSearchParamsIn(SEARCH_KEYS.VOTED),
  );
  const [isShow, setIsShow] = useState(() =>
    isSearchParamsIn(SEARCH_KEYS.SHOW),
  );

  useEffect(() => {
    setIsShow(() => isSearchParamsIn(SEARCH_KEYS.SHOW));
    setIsVoted(() => isSearchParamsIn(SEARCH_KEYS.VOTED));
  }, [searchParams]);

  const goDetailPage = () => {
    if (isPostPage && !isShow) {
      searchParams.set(SEARCH_KEYS.SHOW, SEARCH_VALUES.SHOW.TRUE);
      setSearchParams(searchParams);
    } else {
      navigate(
        `/post/${postId}?${SEARCH_KEYS.SHOW}=${SEARCH_VALUES.SHOW.TRUE}`,
      );
    }
  };

  const goPostPage = () => {
    if (isPostPage) return;
    navigate(`/post/${postId}`);
  };

  return { isVoted, isShow, goDetailPage, goPostPage };
};
