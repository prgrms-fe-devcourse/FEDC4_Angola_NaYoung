import { Comment } from '@type';
import { splitCommentBySeparator } from '.';

export const voteRatio = (comments: Comment[]) => {
  const size = comments?.length;
  const aCounts = comments?.reduce((acc, eachComment) => {
    const { vote } = splitCommentBySeparator(eachComment.comment);
    return vote.toUpperCase() === 'A' ? acc + 1 : acc;
  }, 0);
  const aRatio = Math.round((aCounts / size) * 1000) / 10;
  const bRatio = Math.round((100 - aRatio) * 10) / 10;

  return [aRatio, bRatio];
};
