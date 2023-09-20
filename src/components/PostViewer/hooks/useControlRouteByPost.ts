import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useControlRouteByPost = ({
  postId,
  isPostPage,
}: {
  postId: string;
  isPostPage: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isVoted, setIsVoted] = useState(() =>
    searchParams.get('voted') ? true : false,
  );
  const [isShow, setIsShow] = useState(() =>
    searchParams.get('show') ? true : false,
  );

  useEffect(() => {
    setIsShow(() => (searchParams.get('show') ? true : false));
    setIsVoted(() => (searchParams.get('voted') ? true : false));
  }, [searchParams]);

  const goDetailPage = () => {
    if (isPostPage) {
      if (!isShow) {
        searchParams.set('show', 'true');
        setSearchParams(searchParams);
      }
    } else {
      navigate(`/post/${postId}?show=true`);
    }
  };

  return { isVoted, isShow, goDetailPage };
};
