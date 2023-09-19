import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MORE_LINK_BUTTON_STYLES } from '@styles';
import { useRecoilValue } from 'recoil';
import Icon from '@components/Icon';
import LinkButton from '@components/LinkButton';
import Modal from '@components/Modal';
import { useFetchDeletePost, useFetchUserPosts } from '@apis/post';
import { authInfoState } from '@store/auth';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface PostListItemProps {
  id: string;
  image?: string;
  title: string;
  likes?: number;
  comments?: number;
  canDeletePost?: boolean;
}

const PostListItem = ({
  id,
  image,
  title,
  likes,
  comments,
  canDeletePost,
}: PostListItemProps) => {
  const auth = useRecoilValue(authInfoState);
  const { title: postTitle } = splitPostBySeparator(title);
  const { deletePostMutate, isDeletePostSuccess } = useFetchDeletePost();
  const { userPostsRefetch } = useFetchUserPosts(auth?.userId as string);
  const [toggleModal, setToggleModal] = useState(false);

  const handleOpenModal = () => {
    setToggleModal(() => true);
  };

  const handleCloseModal = () => {
    setToggleModal(() => false);
  };

  const handleDeletedPost = () => {
    deletePostMutate({ id });
    handleCloseModal();
  };

  useEffect(() => {
    if (isDeletePostSuccess) {
      userPostsRefetch();
    }
  }, [userPostsRefetch, isDeletePostSuccess]);

  return (
    <ListItemContainer>
      <ProfileImage
        src={
          image
            ? image
            : 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg?crop=0.667xw:1.00xh;0.128xw,0&resize=980:*'
        }
        alt="프로필"></ProfileImage>
      <TitleContainer>
        <Title>{postTitle}</Title>
      </TitleContainer>
      <LikesAndComments>
        <div>♥️ {likes}</div>
        <div>💬 {comments}</div>
      </LikesAndComments>
      <More>
        <LinkButton
          to={`/post/${id}`}
          style={MORE_LINK_BUTTON_STYLES}>
          More
        </LinkButton>
      </More>
      {canDeletePost ? (
        <button onClick={handleOpenModal}>
          <Icon name="trash" />
        </button>
      ) : null}
      {toggleModal && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={handleDeletedPost}>
          <div>정말로 삭제하시겠습니까?</div>
          <button onClick={handleDeletedPost}>확인</button>
          <button onClick={handleCloseModal}>취소</button>
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
  background: #fff;
  box-shadow: 0px 6px 0px 0px #404040;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${ANGOLA_STYLES.border.default};
  margin: 0px 20px;
  background: #9a9a9a;
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
  color: #404040;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
`;

const LikesAndComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: ${ANGOLA_STYLES.textSize.title};
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
