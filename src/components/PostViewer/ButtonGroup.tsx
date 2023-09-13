import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useFetchLike, useFetchUnLike } from '@apis/like';
import { useFetchPost } from '@apis/post';

interface ButtonGroupProps {
  numberOfLikes: number;
  numberOfComments: number;
  isPostPage: boolean;
  likeId: string | undefined;
  postId: string;
  onGoDetailPage: () => void;
}

const ButtonGroup = ({
  numberOfLikes,
  numberOfComments,
  isPostPage,
  likeId,
  postId,
  onGoDetailPage: goDetailPage,
}: ButtonGroupProps) => {
  const [userLikeId, setUserLikeId] = useState(likeId);
  const [likes, setLikes] = useState(numberOfLikes);
  const [isLiked, setIsLiked] = useState(likeId !== undefined);

  const { likeMutate, likeData } = useFetchLike();
  const { unLikeMutate } = useFetchUnLike();
  const { postRefetch } = useFetchPost(postId);

  const handleLike = () => {
    if (userLikeId) {
      setLikes((prev) => prev - 1);
      unLikeMutate({ id: userLikeId });
    } else {
      setLikes((prev) => prev + 1);
      likeMutate({ postId });
    }
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    if (isLiked) {
      likeData.likeId && setUserLikeId(likeData.likeId);
    } else {
      setUserLikeId(undefined);
    }
    return () => {
      isPostPage && postRefetch();
    };
  }, [likeData.likeId, isLiked]);
  return (
    <ShortButtonContainer>
      <ShortButton
        className={isLiked ? 'liked' : ''}
        onClick={handleLike}>
        ♥️{likes}
      </ShortButton>
      <ShortButton onClick={goDetailPage}>💬{numberOfComments}</ShortButton>
    </ShortButtonContainer>
  );
};

export default ButtonGroup;

const ShortButtonContainer = styled.div`
  display: flex;
  color: black;
  gap: 10px;
`;

const ShortButton = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 10px;
  height: 20px;
  border-radius: 15px;
  cursor: pointer;
  &.liked {
    background-color: pink;
  }
`;
