import styled from '@emotion/styled';
import { Comment } from '@type';
import {
  calculateLevel,
  getUserLevelInfo,
  splitCommentBySeparator,
} from '@utils';
import { ButtonStyled } from '@components/Button';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import CommentDeletionModal from './CommentDeletionModal';
import useDeleteComment from './Hooks/useDeleteComment';

interface CommentListProps {
  comments: Comment[];
  deleteComment: (id: string) => void;
  myId: string | undefined;
}

const CommentList = ({ comments, deleteComment, myId }: CommentListProps) => {
  const {
    commentsData,
    isClickedDeleteBtn,
    setIsClickedDeleteBtn,
    handleClickDeleteComment,
    handleClickDeleteCommentModalBtn,
  } = useDeleteComment({ deleteComment, comments });

  return (
    <>
      {commentsData.map((commentItem) => {
        const { fullName, _id: commentAuthorId } = commentItem.author;
        const { vote, comment } = splitCommentBySeparator(commentItem.comment);
        const userLevel = calculateLevel(commentItem.author);
        const { userEmoji } = getUserLevelInfo(userLevel);

        return (
          <CommentWrapper key={commentItem._id}>
            <MakerName level={userLevel}>
              <span>{`${fullName} `}</span>
              {userEmoji}
            </MakerName>
            <CommentSubWrapper>
              <VotedItem>{vote.toUpperCase()}</VotedItem>
              <CommentStyled>
                {comment?.trim()
                  ? comment
                  : `${vote.toUpperCase()}를 선택하였습니다.`}
              </CommentStyled>
              {myId === commentAuthorId && (
                <DeleteButton
                  size="sm"
                  className={commentItem._id}
                  onClick={handleClickDeleteComment}>
                  <Icon name={'close'} />
                </DeleteButton>
              )}
            </CommentSubWrapper>
            {isClickedDeleteBtn && (
              <CommentDeletionModal
                setIsClickedDeleteBtn={setIsClickedDeleteBtn}
                handleClickDeleteCommentModalBtn={
                  handleClickDeleteCommentModalBtn
                }
              />
            )}
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
  padding: 15px 16px;
  gap: 8px;
  border: ${ANGOLA_STYLES.border.default};
  border-top: none;
`;

const MakerName = styled.div<{ level: number }>`
  font-size: ${ANGOLA_STYLES.textSize.title};

  > span {
    background: ${({ level }) => ANGOLA_STYLES.color.levels[level].fill};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CommentSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const VotedItem = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 12px 12px 0 12px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: ${ANGOLA_STYLES.color.gray};
  font-size: ${ANGOLA_STYLES.textSize.title};
`;

const CommentStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  padding: 16px 24px;
  border-radius: 40px;
  width: 100%;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
`;

const DeleteButton = styled(ButtonStyled)`
  border: 1px solid ${ANGOLA_STYLES.color.text};
  background-color: ${ANGOLA_STYLES.color.gray};
  width: 40px;
  height: 40px;

  &:hover {
    border: ${ANGOLA_STYLES.border.default};
  }
`;
