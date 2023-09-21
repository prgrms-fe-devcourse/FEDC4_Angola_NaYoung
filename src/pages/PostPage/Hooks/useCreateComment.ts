import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_KEYS } from '@constants';
import { useFetchCreateComment } from '@apis/comment';
import { joinDataBySeparator } from '@utils/parseDataBySeparator';

interface useCreateCommentProps {
  votedValue: string;
  postId: string;
  setSubmitValue: Dispatch<SetStateAction<string | undefined>>;
  setIsVoted: Dispatch<SetStateAction<boolean>>;
}

const useCreateComment = ({
  votedValue,
  postId,
  setSubmitValue,
  setIsVoted,
}: useCreateCommentProps) => {
  const [comment, setComment] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { createCommentMutate, isCreateCommentSuccess } =
    useFetchCreateComment();

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    if (votedValue) {
      createCommentMutate({
        comment: joinDataBySeparator(votedValue, comment),
        postId,
      });
    }
    searchParams.set(SEARCH_KEYS.VOTED, votedValue);
    setSearchParams(searchParams);
    setComment('');
    setSubmitValue('');
    setIsVoted(true);
  };

  return { handleChangeComment, handleSubmitComment, isCreateCommentSuccess };
};

export default useCreateComment;
