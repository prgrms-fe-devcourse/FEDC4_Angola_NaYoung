import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { useFetchLike, useFetchUnLike } from '@apis/like';
import { useFetchPost } from '@apis/post';
import { authInfoState } from '@atoms/index';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';

interface PostProps {
  postId: string;
  postTitle: string;
  authorName: string;
  authorId: string;
  likeId: string | undefined;
  numberOfComments: number;
  numberOfLikes: number;
  voteValue?: string;
  onVote?: (value: string) => void;
}

const Post = ({
  postId,
  postTitle,
  authorName,
  authorId,
  likeId,
  voteValue,
  onVote,
  numberOfComments,
  numberOfLikes,
}: PostProps) => {
  const { a, b, title } = splitPostBySeparator(postTitle);
  const auth = useRecoilValue(authInfoState);

  const [searchParams, setSearchParams] = useSearchParams();
  const handleClickVoteButton = (value: string) => {
    if (!auth) {
      alert('로그인하세요'); // todo: Modal
      return;
    }
    onVote && onVote(value);
    if (!searchParams.get('show')) {
      searchParams.set('show', 'true');
      setSearchParams(searchParams);
    }
  };

  const [userLikeId, setUserLikeId] = useState(likeId);
  const [likes, setLikes] = useState(numberOfLikes);
  const [liked, setLiked] = useState(likeId !== undefined);

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
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    if (liked) {
      likeData.likeId && setUserLikeId(likeData.likeId);
    } else {
      setUserLikeId(undefined);
    }
    console.log('refetch');
    postRefetch();
  }, [likeData.likeId, liked, likes, postRefetch]);

  return (
    <PostContainer>
      <TitleContainer>
        <div>{authorName}</div>
        <h2>{title}</h2>
      </TitleContainer>
      <VoteButtonContainer>
        <VoteButton
          className={
            searchParams.get('show') && voteValue === 'a' ? 'active' : ''
          }
          onClick={() => handleClickVoteButton('a')}>
          {a}
        </VoteButton>
        <VoteButton
          className={
            searchParams.get('show') && voteValue === 'b' ? 'active' : ''
          }
          onClick={() => handleClickVoteButton('b')}>
          {b}
        </VoteButton>
      </VoteButtonContainer>
      {auth && (
        <ShortButtonContainer>
          <ShortButton
            className={liked ? 'liked' : ''}
            onClick={handleLike}>
            ♥️{likes}
          </ShortButton>
          <ShortButton>💬{numberOfComments}</ShortButton>
        </ShortButtonContainer>
      )}
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  > h1 {
    font-size: 20px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  > h1 {
    display: block;
    font-size: 20px;
    border: 1px solid black;
    padding: 10px;
  }
  > h2 {
    display: block;
    width: 300px;
    background-color: #d3d3d3af;
    padding: 10px;
  }
`;

const VoteButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const VoteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  &.active {
    background-color: orangered;
  }
  border: 1px solid black;
  border-radius: 20px;
`;

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
