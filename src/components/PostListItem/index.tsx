import styled from '@emotion/styled';
import { MORE_LINK_BUTTON_STYLES } from '@styles';
import Icon from '@components/Icon';
import Image from '@components/Image';
import LinkButton from '@components/LinkButton';
import Modal from '@components/Modal';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { BUTTON_VALUES, USER_PROFILE_IMAGE } from '@constants/index';
import { DELETE_POST_MODAL } from './constants';
import { useDeletePost } from './hooks';

interface PostListItemProps {
  id: string;
  image?: string;
  title: string;
  likes?: number;
  comments?: number;
  canDeletePost?: boolean;
  deletePostMutate?: ({ id }: { id: string }) => void;
}

const PostListItem = ({
  id,
  image,
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
      <ImageContainer>
        <Image
          src={image ? image : USER_PROFILE_IMAGE.DEFAULT_SRC}
          alt="프로필"
          size={60}
        />
      </ImageContainer>
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
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 16px;

  @media (max-width: 800px) {
    display: none;
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

  @media (max-width: 800px) {
    margin-left: 20px;
  }
  @media (max-width: 600px) {
    padding: 16px;
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
    font-size: 16px;
  }
`;

const LikesAndComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: ${ANGOLA_STYLES.textSize.title};
  flex-shrink: 0;

  @media (max-width: 800px) {
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
  width: 121px;
  justify-content: center;
  align-self: stretch;
  border-left: ${ANGOLA_STYLES.border.default};
  font-size: ${ANGOLA_STYLES.textSize.title};
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 800px) {
    width: 80px;
  }

  @media (max-width: 600px) {
    width: 60px;
  }
`;
