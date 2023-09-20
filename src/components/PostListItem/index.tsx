import { useEffect, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import styled from '@emotion/styled';
import { MORE_LINK_BUTTON_STYLES } from '@styles';
import { AxiosResponse } from 'axios';
import Icon from '@components/Icon';
import Image from '@components/Image';
import LinkButton from '@components/LinkButton';
import Modal from '@components/Modal';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { User } from '@type/index';
import { USER_PROFILE_IMAGE } from '@constants/index';

interface PostListItemProps {
  id: string;
  image?: string;
  title: string;
  likes?: number;
  comments?: number;
  canDeletePost?: boolean;
  deletePostMutate?: ({ id }: { id: string }) => void;
  isDeletePostSuccess?: boolean;
  userDataRefetch?: <T>(
    options?: (RefetchOptions & RefetchQueryFilters<T>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<User>>>;
}

const PostListItem = ({
  id,
  image,
  title,
  likes,
  comments,
  canDeletePost,
  deletePostMutate,
  isDeletePostSuccess,
  userDataRefetch,
}: PostListItemProps) => {
  const { title: postTitle } = splitPostBySeparator(title);
  const [toggleModal, setToggleModal] = useState(false);

  const handleOpenModal = () => {
    setToggleModal(true);
  };

  const handleCloseModal = () => {
    setToggleModal(false);
  };

  const handleDeletedPost = () => {
    if (deletePostMutate) {
      deletePostMutate({ id });
    }
    handleCloseModal();
  };

  useEffect(() => {
    if (isDeletePostSuccess) {
      if (userDataRefetch) {
        userDataRefetch();
      }
    }
  }, [userDataRefetch, isDeletePostSuccess]);

  return (
    <ListItemContainer>
      <Image
        src={image ? image : USER_PROFILE_IMAGE.DEFAULT_SRC}
        alt="프로필"
        size={60}
        style={{ margin: '0 20px' }}
      />
      <TitleContainer>
        <Title>{postTitle}</Title>
      </TitleContainer>
      {canDeletePost ? (
        <DeleteButton onClick={handleOpenModal}>
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
          More
        </LinkButton>
      </More>

      {toggleModal && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={handleDeletedPost}>
          <div>정말로 삭제하시겠습니까?</div>
        </Modal>
      )}
    </ListItemContainer>
  );
};

export default PostListItem;

const ListItemContainer = styled.li`
  display: flex;
  height: 100px;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 24px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
  overflow: hidden;
  &:has(.more:hover) {
    box-shadow: ${ANGOLA_STYLES.shadow.button.hover};
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
`;

const Title = styled.div`
  color: ${ANGOLA_STYLES.color.text};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
`;

const LikesAndComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: ${ANGOLA_STYLES.textSize.title};
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
`;

const More = styled.div`
  display: flex;
  width: 121px;
  justify-content: center;
  align-self: stretch;
  border-left: ${ANGOLA_STYLES.border.default};
  font-size: ${ANGOLA_STYLES.textSize.title};
  cursor: pointer;
`;
