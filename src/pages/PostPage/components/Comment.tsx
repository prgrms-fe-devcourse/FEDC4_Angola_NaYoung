import styled from '@emotion/styled';
import { Comment } from '@type';
import { splitCommentBySeparator } from '@utils';
import { ButtonStyled } from '@components/Button';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface CommentProps {
  commentItem: Comment;
  myId: string | undefined;
  handleClickDeleteComment: (e: React.MouseEvent) => void;
}

const CommentItem = ({
  commentItem,
  myId,
  handleClickDeleteComment,
}: CommentProps) => {
  const { _id: commentAuthorId } = commentItem.author;
  const { vote, comment } = splitCommentBySeparator(commentItem.comment);
  return (
    <CommentContainer>
      <VotedItem>{vote.toUpperCase()}</VotedItem>
      <CommentStyled>
        {comment?.trim() ? comment : `${vote.toUpperCase()}를 선택하였습니다.`}
      </CommentStyled>
      {myId === commentAuthorId && (
        <DeleteButton
          size="sm"
          className={commentItem._id}
          onClick={handleClickDeleteComment}>
          <Icon name={'close'} />
        </DeleteButton>
      )}
    </CommentContainer>
  );
};

export default CommentItem;

const CommentContainer = styled.div`
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
