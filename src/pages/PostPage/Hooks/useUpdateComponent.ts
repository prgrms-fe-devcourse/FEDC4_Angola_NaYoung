import { Dispatch, SetStateAction, useEffect } from 'react';
import { Post } from '@type';
import { splitCommentBySeparator } from '@utils';

interface useUpdateComponentProps {
  postData: Post;
  myId: string | undefined;
  submitValue: string | undefined;
  voted: string | undefined;
  setVotedValue: Dispatch<SetStateAction<string>>;
  setSubmitValue: Dispatch<SetStateAction<string | undefined>>;
}

const useUpdateComponent = ({
  postData,
  myId,
  submitValue,
  voted,
  setVotedValue,
  setSubmitValue,
}: useUpdateComponentProps) => {
  useEffect(() => {
    setSubmitValue(voted);
  }, [voted, setSubmitValue]);

  useEffect(() => {
    if (postData) {
      const userComment = postData?.comments.find(
        (comment) => comment.author._id === myId,
      );
      if (!userComment) {
        setVotedValue('');
        setSubmitValue('');
      } else {
        const userVote = splitCommentBySeparator(userComment.comment).vote;
        setVotedValue(userVote);
        setSubmitValue(userVote);
      }
    }
  }, [myId, postData, submitValue, setSubmitValue, setVotedValue]);
};

export default useUpdateComponent;
