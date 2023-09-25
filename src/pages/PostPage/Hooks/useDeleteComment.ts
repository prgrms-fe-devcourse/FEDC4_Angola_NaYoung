import { MouseEvent, useEffect, useState } from 'react';
import { Comment } from '@type';

interface useDeleteCommentProps {
  deleteComment: (id: string) => void;
  comments: Comment[];
}

const useDeleteComment = ({
  deleteComment,
  comments,
}: useDeleteCommentProps) => {
  const [isClickedDeleteBtn, setIsClickedDeleteBtn] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');

  const handleClickDeleteComment = (e: MouseEvent) => {
    setCommentId(e.currentTarget.classList[0]);
    setIsClickedDeleteBtn(true);
  };

  const handleClickDeleteCommentModalBtn = () => {
    deleteComment(commentId);
    setIsClickedDeleteBtn(false);
  };

  const [commentsData, setCommentsData] = useState(comments);

  useEffect(() => {
    setCommentsData(comments);
  }, [comments.length, comments]);

  return {
    commentsData,
    isClickedDeleteBtn,
    setIsClickedDeleteBtn,
    handleClickDeleteComment,
    handleClickDeleteCommentModalBtn,
  };
};

export default useDeleteComment;
