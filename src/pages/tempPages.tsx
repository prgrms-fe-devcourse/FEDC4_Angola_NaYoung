import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import { useFetchPost } from '@apis/post';
import { authInfoState } from '@atoms/index';

export const CreatePostPage = () => {
  return <div>CreatePostPage</div>;
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
export const PostPage = ({ postId = '', show }: PostPageProps) => {
  const { postData } = useFetchPost(postId);
  const [votedValue, setVotedValue] = useState('');
  const auth = useRecoilValue(authInfoState);

  return (
    <div>
      {postData && (
        <PostViewer
          postId={postId}
          authorName={postData.author.fullName}
          authorId={postData.author._id}
          postTitle={postData.title}
          numberOfComments={postData.comments.length}
          numberOfLikes={postData.likes.length}
          likeId={
            postData.likes.find((like) => like.user === auth?.userId)?._id
          }
          voteValue={votedValue}
          onVote={(value: string) => setVotedValue(value)}
        />
      )}
      <hr />
      {show && (
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
      )}
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
