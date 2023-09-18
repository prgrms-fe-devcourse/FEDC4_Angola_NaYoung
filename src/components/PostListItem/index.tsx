import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MORE_LINK_BUTTON_STYLES } from '@styles';
import { useRecoilValue } from 'recoil';
import Icon from '@components/Icon';
import LinkButton from '@components/LinkButton';
import Modal from '@components/Modal';
import { useFetchDeletePost, useFetchUserPosts } from '@apis/post';
import { authInfoState } from '@store/auth';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confirmButtonRef = useRef<null | HTMLButtonElement>(null);

  const handleClickOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!confirmButtonRef.current) {
      return;
    }
    if (isModalOpen) {
      confirmButtonRef.current.focus();
    }
  }, [isModalOpen]);

  const handleClickDeletedPost = () => {
    deletePostMutate({ id });
    setIsModalOpen(false);
  };

  const handleClickCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isDeletePostSuccess) {
      userPostsRefetch();
    }
  }, [userPostsRefetch, isDeletePostSuccess]);

  return (
    <ListItemContainer>
      <img
        src={
          image
            ? image
            : 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg?crop=0.667xw:1.00xh;0.128xw,0&resize=980:*'
        }
        alt="프로필"
        style={{ width: '70px', height: '70px', borderRadius: '50%' }}
      />
      <Title>{postTitle}</Title>
      <Info>
        <div>♥️{likes}</div>
        <div>💬{comments}</div>
      </Info>
      <More>
        <LinkButton
          to={`/post/${id}`}
          style={MORE_LINK_BUTTON_STYLES}>
          More
        </LinkButton>
      </More>
      {canDeletePost ? (
        <button onClick={handleClickOpenModal}>
          <Icon name="trash" />
        </button>
      ) : null}
      {isModalOpen && (
        <Modal onClose={handleClickCloseModal}>
          <div>정말로 삭제하시겠습니까?</div>
          <button
            ref={confirmButtonRef}
            onClick={handleClickDeletedPost}>
            확인
          </button>
          <button onClick={handleClickCloseModal}>취소</button>
        </Modal>
      )}
    </ListItemContainer>
  );
};

export default PostListItem;

const ListItemContainer = styled.li`
  display: flex;
  border: 1px solid black;
  margin: 30px 0;
  gap: 20px;
  border-radius: 12px;
`;

const Title = styled.div`
  border: 1px solid black;
  border-radius: 30px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`;

const More = styled.div`
  border-left: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
`;
