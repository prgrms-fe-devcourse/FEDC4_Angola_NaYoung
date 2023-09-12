import React, { useState } from 'react';
import styled from '@emotion/styled';
import Post from '@components/Post';
import { useFetchPost } from '@apis/post';

export const CreatePostPage = () => {
  return <div>CreatePostPage</div>;
};
export const HomePage = () => {
  return <div>HomePage</div>;
};
export const UserPage = () => {
  return <div>UserPage</div>;
};
export const MyPage = () => {
  return <div>MyPage</div>;
};

export interface PostPageProps {
  postId?: string;
  show?: 'true';
  voted?: string;
}
export const PostPage = ({ postId = '', show, voted }: PostPageProps) => {
  const { postData, isPostError, isPostLoading, isPostSuccess } =
    useFetchPost(postId);
  const [votedValue, setVotedValue] = useState('');
  return (
    <div>
      {postData && (
        <Post
          postId={postId}
          authorName={postData.author.fullName}
          authorId={postData.author._id}
          postTitle={postData.title}
          voteValue={votedValue}
          onVote={(value: string) => setVotedValue(value)}
        />
      )}
      <hr />

      <CommentContainer>
        <h1>댓글창</h1>
        <SelectContainer>
          <SelectBox
            onClick={() => setVotedValue('a')}
            className={votedValue === 'a' ? 'active' : ''}>
            button A
          </SelectBox>
          <SelectBox
            onClick={() => setVotedValue('b')}
            className={votedValue === 'b' ? 'active' : ''}>
            button B
          </SelectBox>
        </SelectContainer>
      </CommentContainer>
    </div>
  );
};

const CommentContainer = styled.div`
  padding: 20px;
  background-color: lightyellow;
  > h1 {
    font-size: 20px;
  }
`;
const SelectContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const SelectBox = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: lightgray;
  &.active {
    background-color: pink;
  }
`;
