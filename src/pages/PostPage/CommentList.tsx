import { MouseEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Comment } from '@type';
import { pxToRem, splitCommentBySeparator } from '@utils';
import { ButtonStyled } from '@components/Button';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { calculateLevel, getUserLevelInfo } from '@utils/calculateUserLevel';

interface CommentListProps {
  comments: Comment[];
  deleteComment: (id: string) => void;
  userId: string | undefined;
}

const CommentList = ({ comments, deleteComment, userId }: CommentListProps) => {
  const handleClickCancelComment = (e: MouseEvent) => {
    const commentId = e.currentTarget.classList[0];

    if (!confirm('정말로 댓글을 삭제하시겠습니까?')) {
      return;
    }
    deleteComment(commentId);
  };

  const [commentsData, setCommentsData] = useState(comments);

  useEffect(() => {
    setCommentsData(comments);
  }, [comments.length, comments]);

  return (
    <>
      {commentsData.map((commentItem) => {
        const fullName = commentItem.author.fullName;
        const commentAuthorId = commentItem.author._id;
        const { vote, comment } = splitCommentBySeparator(commentItem.comment);
        const userLevel = calculateLevel(commentItem.author);
        const { userColor, userEmoji } = getUserLevelInfo(userLevel);

        return (
          <CommentWrapper key={commentItem._id}>
            <MakerName userColor={userColor}>
              {fullName}
              {userEmoji}
            </MakerName>
            <CommentSubWrapper>
              <VotedItem>{vote.toUpperCase()}</VotedItem>
              <CommentStyled>
                {comment ? comment : `${vote.toUpperCase()}를 선택하였습니다.`}
              </CommentStyled>
              {userId === commentAuthorId && (
                <Cancel
                  size="sm"
                  className={commentItem._id}
                  onClick={handleClickCancelComment}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none">
                    <path
                      d="M0.377644 0.377644C0.49705 0.257936 0.638899 0.16296 0.795067 0.0981579C0.951234 0.0333554 1.11865 0 1.28773 0C1.45681 0 1.62423 0.0333554 1.7804 0.0981579C1.93656 0.16296 2.07841 0.257936 2.19782 0.377644L9.00034 7.18273L15.8029 0.377644C15.9224 0.258129 16.0643 0.163325 16.2204 0.0986446C16.3766 0.0339638 16.5439 0.000673011 16.7129 0.000673011C16.882 0.000673011 17.0493 0.0339638 17.2055 0.0986446C17.3616 0.163325 17.5035 0.258129 17.623 0.377644C17.7425 0.497158 17.8373 0.639042 17.902 0.795195C17.9667 0.951348 18 1.11871 18 1.28773C18 1.45675 17.9667 1.62411 17.902 1.78027C17.8373 1.93642 17.7425 2.0783 17.623 2.19782L10.8179 9.00034L17.623 15.8029C17.7425 15.9224 17.8373 16.0643 17.902 16.2204C17.9667 16.3766 18 16.5439 18 16.7129C18 16.882 17.9667 17.0493 17.902 17.2055C17.8373 17.3616 17.7425 17.5035 17.623 17.623C17.5035 17.7425 17.3616 17.8373 17.2055 17.902C17.0493 17.9667 16.882 18 16.7129 18C16.5439 18 16.3766 17.9667 16.2204 17.902C16.0643 17.8373 15.9224 17.7425 15.8029 17.623L9.00034 10.8179L2.19782 17.623C2.0783 17.7425 1.93642 17.8373 1.78027 17.902C1.62411 17.9667 1.45675 18 1.28773 18C1.11871 18 0.951348 17.9667 0.795195 17.902C0.639042 17.8373 0.497158 17.7425 0.377644 17.623C0.258129 17.5035 0.163325 17.3616 0.0986446 17.2055C0.0339638 17.0493 0.000673011 16.882 0.000673011 16.7129C0.000673011 16.5439 0.0339638 16.3766 0.0986446 16.2204C0.163325 16.0643 0.258129 15.9224 0.377644 15.8029L7.18273 9.00034L0.377644 2.19782C0.257936 2.07841 0.16296 1.93656 0.0981579 1.7804C0.0333554 1.62423 0 1.45681 0 1.28773C0 1.11865 0.0333554 0.951234 0.0981579 0.795067C0.16296 0.638899 0.257936 0.49705 0.377644 0.377644Z"
                      fill="#404040"
                    />
                  </svg>
                </Cancel>
              )}
            </CommentSubWrapper>
            {
              <Modal onClose={() => window.location.reload()}>
                정말로 댓글을 삭제하시겠습니까?
                <ButtonContainer>
                  <Button>네</Button>
                  <Button>아니요</Button>
                </ButtonContainer>
              </Modal>
            }
          </CommentWrapper>
        );
      })}
    </>
  );
};

export default CommentList;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${pxToRem(15)} ${pxToRem(16)};
  gap: ${pxToRem(8)};
  border: ${pxToRem(2)} solid #404040;
  border-top: none;
`;

const MakerName = styled.div<{ userColor: string }>`
  font-size: ${pxToRem(24)};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;

  color: ${(props) => props.userColor};
`;

const CommentSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(16)};
`;

const VotedItem = styled.div`
  display: flex;
  width: ${pxToRem(60)};
  height: 100%;
  padding: ${pxToRem(12)} ${pxToRem(12)} 0 ${pxToRem(12)};
  justify-content: center;
  align-items: center;
  border-radius: ${pxToRem(40)};
  background-color: #e5e5e5;
  color: #404040;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const CommentStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  padding: ${pxToRem(16)} ${pxToRem(24)};
  border-radius: ${pxToRem(40)};
  width: 100%;
  color: #404040;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Cancel = styled(ButtonStyled)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${pxToRem(1)} solid #404040;
  border-radius: ${pxToRem(40)};
  background-color: #e5e5e5;
  width: ${pxToRem(40)};
  height: ${pxToRem(40)};
  color: #404040;
  padding: 0;

  &:hover {
    border: ${pxToRem(2)} solid #404040;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
