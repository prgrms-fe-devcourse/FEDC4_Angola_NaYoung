import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import type { Post } from '@type';
import { splitCommentBySeparator } from '@utils';

interface useCheckVotedProps {
  postData: Post;
  myId: string | undefined;
  submitValue: string | undefined;
  voted: string | undefined;
  setVotedValue: Dispatch<SetStateAction<string>>;
  setSubmitValue: Dispatch<SetStateAction<string | undefined>>;
}

const useCheckVoted = ({
  postData,
  myId,
  submitValue,
  voted,
  setVotedValue,
  setSubmitValue,
}: useCheckVotedProps) => {
  useEffect(() => {
    setSubmitValue(voted);
  }, [voted]);

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
  }, [myId, postData, submitValue]);
};

export default useCheckVoted;
