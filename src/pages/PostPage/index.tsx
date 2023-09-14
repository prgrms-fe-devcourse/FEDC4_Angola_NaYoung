import { useState } from 'react';
import { authInfoState } from '@atoms';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import { useFetchPost } from '@apis/post';
import CommentList from './CommentList';
import MakeComment from './MakeComment';

const PostPage = () => {
  const auth = useRecoilValue(authInfoState);
  const userId = auth?.userId;
  const [votedValue, setVotedValue] = useState<string>('');
  const [, postId, isCommentsShow] =
    document.location.href.split(/\/post\/:|\?/);
  const { postData } = useFetchPost(postId);
  const comments = postData?.comments;

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
            likeId={postData.likes.find((like) => like.user === userId)?._id}
            voteValue={votedValue}
            onVote={(value: string) => handleClickItem(value)}
          />
        )}
        {isCommentsShow && (
          <CommentsContainer>
            <MakeComment
              votedValue={votedValue}
              handleClickItem={handleClickItem}
              postId={postId}
            />
            {comments && <CommentList comments={comments} />}
          </CommentsContainer>
        )}
      </ReadMorePageContainer>
    </>
  );
};

export default PostPage;

const ReadMorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
