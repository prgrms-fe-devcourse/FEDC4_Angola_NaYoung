import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_KEYS } from '@constants';

interface useControlRouteByCommentProps {
  show?: 'true';
  submitValue: string | undefined;
  postRefetch: VoidFunction;
  isCreateCommentSuccess: boolean;
  isDeleteCommentSuccess: boolean;
}

const useControlRouteByComment = ({
  show,
  submitValue,
  postRefetch,
  isCreateCommentSuccess,
  isDeleteCommentSuccess,
}: useControlRouteByCommentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    postRefetch();
  }, [postRefetch, isCreateCommentSuccess, isDeleteCommentSuccess]);

  useEffect(() => {
    if (show) {
      submitValue
        ? searchParams.set(SEARCH_KEYS.VOTED, submitValue)
        : searchParams.delete(SEARCH_KEYS.VOTED);
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, submitValue, show]);
};

export default useControlRouteByComment;
