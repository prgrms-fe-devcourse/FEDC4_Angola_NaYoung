import styled from '@emotion/styled';
import Icon from '@components/Icon';
import { useActionInfo, usePostLike } from '@components/PostViewer/hooks';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { BUTTON_GROUP } from '../constants';

interface ButtonGroupProps {
  numberOfLikes: number;
  numberOfComments: number;
  likeId: string | undefined;
  postId: string;
  authorId: string;
  isShow: boolean;
  isVoted: boolean;
  onGoDetailPage: () => void;
}

const ButtonGroup = ({
  numberOfLikes,
  numberOfComments,
  likeId,
  postId,
  authorId,
  isShow,
  isVoted,
  onGoDetailPage: goDetailPage,
}: ButtonGroupProps) => {
  const { handleLike, isLiked, likes } = usePostLike({
    likeId,
    numberOfLikes,
    postId,
    authorId,
  });
  const { commentIcon, likeIcon, commentClassName, likeClassName } =
    useActionInfo({ isVoted, isShow, isLiked });

  return (
    <ActionButtonContainer>
      <ActionButton
        onClick={handleLike}
        className={likeClassName}>
        <Icon name={likeIcon} />
        <Number>{likes}</Number>
      </ActionButton>
      <ActionButton
        onClick={goDetailPage}
        className={commentClassName}>
        <Icon name={commentIcon} />
        <Number>{numberOfComments}</Number>
        {isShow || <Text>{BUTTON_GROUP.COMMENT_BUTTON_TEXT}</Text>}
      </ActionButton>
    </ActionButtonContainer>
  );
};

export default ButtonGroup;

const ActionButtonContainer = styled.div`
  display: flex;
  padding: 24px 0;
  gap: 24px;
`;

const ActionButton = styled.div`
  display: flex;
  padding: 12px;
  min-width: 64px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  border: ${ANGOLA_STYLES.border.default};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};
  border-radius: 56px;
  cursor: pointer;
  transition: 0.2s;
  &:hover:not(:active) {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }
  &.actioned {
    background-color: ${ANGOLA_STYLES.color.gray};
  }
`;

const Number = styled.div`
  padding-top: 4px;
`;

const Text = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
`;
