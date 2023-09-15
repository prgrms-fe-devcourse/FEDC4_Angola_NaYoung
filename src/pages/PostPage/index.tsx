import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authInfoState } from '@atoms';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import { useFetchCreateComment } from '@apis/comment';
import { useFetchPost } from '@apis/post';
import { joinDataBySeparator } from '@utils/parseDataBySeparator';
import CommentList from './CommentList';
import MakeComment from './MakeComment';
import Turnout from './Turnout';

interface PostPageProps {
  postId?: string;
  show?: 'true';
  voted?: string;
}

const PostPage = ({ voted, show, postId = '' }: PostPageProps) => {
  const auth = useRecoilValue(authInfoState);
  const userId = auth?.userId;

  const [voteValue, setVoteValue] = useState<string>('');
  const [submitValue, setSubmitValue] = useState<string | undefined>(voted); // a, b, undefined
  const { postData, postRefetch } = useFetchPost(postId);
  const { createCommentMutate, isCreateCommentSuccess } =
    useFetchCreateComment();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSubmitValue(voted);
  }, [voted]);

  useEffect(() => {
    const matchedComment = postData?.comments.find(
      (comment) => comment.author._id === userId,
    );
    if (matchedComment) {
      setVoteValue(matchedComment.comment[0]);
      setSubmitValue(matchedComment.comment[0]);
    }
  }, [postData?.comments, userId]);

  useEffect(() => {
    if (submitValue) {
      searchParams.set('voted', submitValue);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, submitValue]);

  const handleClickItem = (value: string) => {
    voteValue === value ? setVoteValue('') : setVoteValue(value);
  };

  const handleSubmitComment = (voteValue: string, comment: string) => {
    if (voteValue) {
      createCommentMutate({
        comment: joinDataBySeparator(voteValue, comment),
        postId,
      });
    }
    searchParams.set('voted', voteValue);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    postRefetch();
  }, [isCreateCommentSuccess]);

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
            voteValue={voteValue}
            onVote={(value: string) => handleClickItem(value)}
          />
        )}
        {show && (
          <CommentsContainer>
            {submitValue ? (
              <Turnout comments={postData?.comments} />
            ) : (
              <MakeComment
                voteValue={voteValue}
                handleClickItem={handleClickItem}
                handleSubmitComment={handleSubmitComment}
              />
            )}
            {postData && <CommentList comments={postData.comments} />}
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
