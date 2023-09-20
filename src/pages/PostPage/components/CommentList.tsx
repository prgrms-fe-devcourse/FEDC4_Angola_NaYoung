import styled from '@emotion/styled';
import { Comment } from '@type';
import { calculateLevel, getUserLevelInfo } from '@utils';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import useDeleteComment from '../Hooks/useDeleteComment';
import CommentItem from './Comment';
import CommentDeletionModal from './CommentDeletionModal';

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
        const { fullName } = commentItem.author;
        const userLevel = calculateLevel(commentItem.author);
        const { userEmoji } = getUserLevelInfo(userLevel);

        return (
          <CommentWrapper key={commentItem._id}>
            <MakerName level={userLevel}>
              <span>{`${fullName} `}</span>
              {userEmoji}
            </MakerName>
            <CommentItem
              commentItem={commentItem}
              myId={myId}
              handleClickDeleteComment={handleClickDeleteComment}
            />
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
