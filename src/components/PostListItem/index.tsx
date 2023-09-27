import { Icon, LinkButton, Modal } from '@components';
import { BUTTON_VALUES } from '@constants';
import styled from '@emotion/styled';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { MORE_LINK_BUTTON_STYLES } from '@styles/moreLinkButtonStyles';
import { DELETE_POST_MODAL } from './constants';
import { useDeletePost } from './hooks';

interface PostListItemProps {
  id: string;
  title: string;
  likes?: number;
  comments?: number;
  canDeletePost?: boolean;
  deletePostMutate?: ({ id }: { id: string }) => void;
}

const PostListItem = ({
  id,
  title,
  likes,
  comments,
  canDeletePost,
  deletePostMutate,
}: PostListItemProps) => {
  const { title: postTitle } = splitPostBySeparator(title);
  const { toggleModal, setToggleModal, handleDeletedPost } = useDeletePost({
    id,
    deletePostMutate,
  });

  return (
    <ListItemContainer>
      <TitleContainer>
        <Title>{postTitle}</Title>
      </TitleContainer>
      {canDeletePost ? (
        <DeleteButton onClick={() => setToggleModal(true)}>
          <Icon name="trash" />
        </DeleteButton>
      ) : (
        <LikesAndComments>
          <div>
            <Icon name="heart" /> {likes}
          </div>
          <div>
            <Icon name="comment" /> {comments}
          </div>
        </LikesAndComments>
      )}

      <More className="more">
        <LinkButton
          to={`/post/${id}`}
          style={MORE_LINK_BUTTON_STYLES}>
          {BUTTON_VALUES.MORE_TEXT}
        </LinkButton>
      </More>

      {toggleModal && (
        <Modal
          onClose={() => setToggleModal(false)}
          onConfirm={handleDeletedPost}>
          <div>{DELETE_POST_MODAL.MODAL_TEXT}</div>
        </Modal>
      )}
    </ListItemContainer>
  );
};

export default PostListItem;

const ListItemContainer = styled.li`
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 24px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};

  &:has(.more:hover) {
    box-shadow: ${ANGOLA_STYLES.shadow.button.hover};
  }
  @media (max-width: 800px) {
    gap: 12px;
  }
  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border-radius: 24px;
  background: #e5e5e5;
  overflow: hidden;
  margin-left: 16px;
  @media (max-width: 800px) {
    margin-left: 12px;
  }
  @media (max-width: 600px) {
    padding: 16px;
    margin-left: 10px;
  }
`;

const Title = styled.div`
  color: ${ANGOLA_STYLES.color.text};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 2px 0;

  @media (max-width: 600px) {
    font-size: ${ANGOLA_STYLES.textSize.text};
  }
`;

const LikesAndComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: ${ANGOLA_STYLES.textSize.title};
  flex-shrink: 0;
  @media (max-width: 800px) {
    transform: scale(0.8);
  }
  @media (max-width: 600px) {
    transform: scale(0.7);
  }
  @media (max-width: 450px) {
    display: none;
  }
`;

const DeleteButton = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 44px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};
  cursor: pointer;
  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }
  flex-shrink: 0;
`;

const More = styled.div`
  display: flex;
  width: fit-content;
  justify-content: center;
  align-self: stretch;
  border-left: ${ANGOLA_STYLES.border.default};
  font-size: ${ANGOLA_STYLES.textSize.title};
  cursor: pointer;
  flex-shrink: 0;
  padding: 0 6px;

  @media (max-width: 800px) {
    font-size: ${ANGOLA_STYLES.textSize.titleSm};
  }

  @media (max-width: 450px) {
    font-size: ${ANGOLA_STYLES.textSize.text};
  }
`;
