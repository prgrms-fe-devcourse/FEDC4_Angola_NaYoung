import { MouseEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Comment } from '@type';
import Spinner from '@components/Spinner/index';
import { useFetchDeleteComment } from '@apis/comment';
import { splitCommentBySeparator } from '@utils/parseDataBySeparator';

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  const { deleteCommentMutate, isDeleteCommentError, isDeleteCommentLoading } =
    useFetchDeleteComment();

  const handleClickCancelComment = (e: MouseEvent) => {
    const commentId = e.currentTarget.classList[0];

    if (!confirm('정말로 댓글을 삭제하시겠습니까?')) {
      return;
    }

    deleteCommentMutate({ id: commentId });
    if (isDeleteCommentError) {
      alert('댓글 삭제를 실패하였습니다.');
      return;
    }
  };

  const [commentsData, setCommentsData] = useState(comments);

  useEffect(() => {
    setCommentsData(comments);
  }, [comments.length]);

  return (
    <>
      {isDeleteCommentLoading ? (
        <Spinner />
      ) : (
        <>
          {commentsData.map((commentItem) => {
            const fullName = commentItem.author.fullName;
            const commentId = commentItem._id;
            const { vote, comment } = splitCommentBySeparator(
              commentItem.comment,
            );
            return (
              comment && (
                <CommentWrapper key={commentId}>
                  <MakerName>유저 닉네임: {fullName}</MakerName>
                  <CommentSubWrapper>
                    <VotedItem>{vote.toUpperCase()}</VotedItem>
                    <CommentStyled>{comment}</CommentStyled>
                    <Cancel
                      className={commentId}
                      onClick={handleClickCancelComment}>
                      X
                    </Cancel>
                  </CommentSubWrapper>
                </CommentWrapper>
              )
            );
          })}
        </>
      )}
    </>
  );
};

export default CommentList;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  border-top: 1px solid black;
`;

const CommentSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const MakerName = styled.p`
  padding-left: 1rem;
  font-weight: 600;
`;

const VotedItem = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const CommentStyled = styled.div`
  padding: 1rem;
  border: 1px solid black;
  border-radius: 50px;
  width: 70%;
`;

const Cancel = styled.button`
  border: 1px solid black;
  border-radius: 50%;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  font-weight: 600;
  background-color: #ff666666;

  &:hover {
    background-color: #ff6666ff;
  }
`;
