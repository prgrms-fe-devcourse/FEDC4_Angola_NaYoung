import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { calculateLevel, splitCommentBySeparator } from '@utils';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import Spinner from '@components/Spinner';
import { useFetchDeleteComment } from '@apis/comment';
import { useFetchPost } from '@apis/post';
import { authInfoState } from '@store/auth';
import useCommentNotification from './Hooks/useCommentNotification';
import useCreateComment from './Hooks/useCreateComment';
import MakeComment from './MakeComment';
import Turnout from './Turnout';
import { CommentDeletionFailModal, CommentList } from './components';

interface PostPageProps {
  postId?: string;
  show?: 'true';
  voted?: string;
}

const PostPage = ({ voted, show, postId = '' }: PostPageProps) => {
  const auth = useRecoilValue(authInfoState);
  const myId = auth?.userId;
  const [votedValue, setVotedValue] = useState<string>('');
  const [submitValue, setSubmitValue] = useState<string | undefined>('');
  const [isVoted, setIsVoted] = useState(false);
  const { postData, postRefetch, isPostLoading } = useFetchPost(postId);

  const {
    deleteCommentMutate,
    isDeleteCommentError,
    isDeleteCommentSuccess,
    isDeleteCommentLoading,
  } = useFetchDeleteComment();
  const [searchParams, setSearchParams] = useSearchParams();

  // 댓글 알림
  useCommentNotification({ postData, isVoted, myId, setIsVoted });

  useEffect(() => {
    setSubmitValue(voted);
  }, [voted]);

  useEffect(() => {
    if (postData) {
      const userComment = postData?.comments.find(
        (comment) => comment.author._id === myId,
      );
      if (!userComment) {
        setVotedValue('');
        setSubmitValue('');
        return;
      }
      const userVote = splitCommentBySeparator(userComment.comment).vote;
      setVotedValue(userVote);
      setSubmitValue(userVote);
    }
  }, [postData?.comments, myId, postData, submitValue]);

  useEffect(() => {
    if (show) {
      submitValue
        ? searchParams.set('voted', submitValue)
        : searchParams.delete('voted');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, submitValue, show]);

  const handleClickItem = (value: string) => {
    votedValue === value ? setVotedValue('') : setVotedValue(value);
    setSubmitValue('');
  };

  // 댓글 생성
  const { handleSubmitComment, handleChangeComment, isCreateCommentSuccess } =
    useCreateComment({
      votedValue,
      postId,
      setSubmitValue,
      setIsVoted,
    });

  const deleteComment = (id: string) => {
    deleteCommentMutate({ id });
    searchParams.delete('voted');
    setSearchParams(searchParams);
    setSubmitValue('');
  };

  useEffect(() => {
    postRefetch();
  }, [postRefetch, isCreateCommentSuccess, isDeleteCommentSuccess]);

  return (
    <PostPageContainer>
      {isPostLoading ? (
        <Spinner />
      ) : (
        <>
          {postData && (
            <PostViewer
              postId={postId}
              authorName={postData.author.fullName}
              authorId={postData.author._id}
              postTitle={postData.title}
              numberOfComments={postData.comments.length}
              numberOfLikes={postData.likes.length}
              likeId={postData.likes.find((like) => like.user === myId)?._id}
              voteValue={votedValue}
              onVote={(value: string) => handleClickItem(value)}
              authorLevel={calculateLevel(postData.author)}
            />
          )}
          {isDeleteCommentLoading ? (
            <Spinner />
          ) : (
            <>
              {show && (
                <CommentsContainer>
                  {submitValue && postData?.comments ? (
                    <Turnout
                      comments={postData?.comments}
                      authorLevel={calculateLevel(postData.author)}
                    />
                  ) : (
                    <MakeComment
                      votedValue={votedValue}
                      handleClickItem={handleClickItem}
                      handleSubmitComment={handleSubmitComment}
                      handleChangeComment={handleChangeComment}
                    />
                  )}
                  {postData && !isDeleteCommentError && (
                    <CommentList
                      comments={postData.comments}
                      deleteComment={deleteComment}
                      myId={myId}
                    />
                  )}
                  {isDeleteCommentError && <CommentDeletionFailModal />}
                </CommentsContainer>
              )}
            </>
          )}
        </>
      )}
    </PostPageContainer>
  );
};

export default PostPage;

const PostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
