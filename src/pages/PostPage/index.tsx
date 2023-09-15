import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authInfoState } from '@atoms';
import styled from '@emotion/styled';
import { joinDataBySeparator } from '@utils';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import Spinner from '@components/Spinner';
import { useFetchCreateComment } from '@apis/comment';
import { useFetchDeleteComment } from '@apis/comment';
import { useFetchPost } from '@apis/post';
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
  const [votedValue, setVotedValue] = useState<string>('');
  const [submitValue, setSubmitValue] = useState<string | undefined>(voted); // a, b, undefined
  const { postData, postRefetch } = useFetchPost(postId);
  const {
    createCommentMutate,
    isCreateCommentSuccess,
    isCreateCommentLoading,
  } = useFetchCreateComment();
  const [searchParams, setSearchParams] = useSearchParams();
  const { deleteCommentMutate, isDeleteCommentError, isDeleteCommentSuccess } =
    useFetchDeleteComment();

  useEffect(() => {
    setSubmitValue(voted);
  }, [voted]);

  useEffect(() => {
    postData &&
      postData.comments.forEach((eachComment) => {
        if (eachComment.author._id === userId) {
          setVotedValue(eachComment.comment[0]);
          setSubmitValue(eachComment.comment[0]);
          return;
        }
      });
  }, [postData?.comments, userId, postData]);

  useEffect(() => {
    if (submitValue && show) {
      searchParams.set('voted', submitValue);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, submitValue, show]);

  const handleClickItem = (value: string) => {
    votedValue === value ? setVotedValue('') : setVotedValue(value);
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

  const deleteComment = (id: string) => {
    deleteCommentMutate({ id });
    if (isDeleteCommentError) {
      alert('댓글 삭제를 실패하였습니다.');
      return;
    }
    searchParams.delete('voted');
    setSearchParams(searchParams);
    setSubmitValue('');
  };

  useEffect(() => {
    postRefetch();
  }, [postRefetch, isCreateCommentSuccess, isDeleteCommentSuccess]);

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
        {show && (
          <CommentsContainer>
            {submitValue ? (
              isCreateCommentLoading ? (
                <Spinner />
              ) : (
                <Turnout comments={postData?.comments} />
              )
            ) : (
              <MakeComment
                votedValue={votedValue}
                handleClickItem={handleClickItem}
                handleSubmitComment={handleSubmitComment}
              />
            )}
            {postData && (
              <CommentList
                comments={postData.comments}
                deleteComment={deleteComment}
              />
            )}
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
