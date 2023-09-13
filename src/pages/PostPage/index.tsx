import { useState } from 'react';
import { authInfoState } from '@atoms';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
// import TestComponent from '@pages/PostPage/TestComponent';
import PostViewer from '@components/PostViewer';
import { useFetchCreateComment } from '@apis/comment';
import { useFetchPost } from '@apis/post';
import MakeComment from './MakeComment';

const PostPage = () => {
  const auth = useRecoilValue(authInfoState);
  const [votedValue, setVotedValue] = useState<string>('');
  const postId = document.location.href.split('/post/:')[1];
  const { postData } = useFetchPost(postId);
  const { createCommentMutate, isCreateCommentSuccess, isCreateCommentError } =
    useFetchCreateComment();
  const comments = postData?.comments;
  let createComment;

  console.log(comments);
  console.log(auth?.userId);

  const handleClickItem = (value: string) => {
    votedValue === value ? setVotedValue('') : setVotedValue(value);
  };

  return (
    <>
      <ReadMorePageContainer>
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
            onVote={(value: string) => handleClickItem(value)}
          />
        )}
        {/* <TestComponent
          voteValue={votedValue}
          onVote={(value: string) => handleClickItem(value)}
        /> */}
        <CommentsContainer>
          <MakeComment
            votedValue={votedValue}
            handleClickItem={handleClickItem}
          />
          {comments &&
            comments.map((comment) => (
              <CommentWrapper>
                <MakerName>작성자 이름</MakerName>
                <CommentSubWrapper>
                  <VotedItem>A</VotedItem>
                  <Comment>의견 한 줄</Comment>
                </CommentSubWrapper>
              </CommentWrapper>
            ))}
        </CommentsContainer>
      </ReadMorePageContainer>
    </>
  );
};

export default PostPage;

const ReadMorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  border: 2px solid black;
  border-radius: 45px;
  overflow: hidden;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const CommentSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const MakerName = styled.p`
  padding-left: 1rem;
`;

const VotedItem = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const Comment = styled.div`
  padding: 1rem;
  border: 1px solid black;
  border-radius: 50px;
  width: 80%;
`;
