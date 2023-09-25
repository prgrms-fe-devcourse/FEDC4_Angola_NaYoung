import { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_KEYS } from '@constants';
import { useFetchDeleteComment } from '@apis/comment';

interface useGetDeleteCommentStateProps {
  setSubmitValue: Dispatch<SetStateAction<string | undefined>>;
}

const useGetDeleteCommentState = ({
  setSubmitValue,
}: useGetDeleteCommentStateProps) => {
  const {
    deleteCommentMutate,
    isDeleteCommentError,
    isDeleteCommentSuccess,
    isDeleteCommentLoading,
  } = useFetchDeleteComment();
  const [searchParams, setSearchParams] = useSearchParams();

  const deleteComment = (id: string) => {
    deleteCommentMutate({ id });
    searchParams.delete(SEARCH_KEYS.VOTED);
    setSearchParams(searchParams);
    setSubmitValue('');
  };

  return {
    isDeleteCommentError,
    isDeleteCommentLoading,
    isDeleteCommentSuccess,
    deleteComment,
  };
};

export default useGetDeleteCommentState;
