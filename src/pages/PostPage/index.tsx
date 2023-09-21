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
import {
  useCommentNotification,
  useCreateComment,
  useUpdateComponent,
} from './Hooks';
import {
  CommentDeletionFailModal,
  CommentList,
  MakeComment,
  Turnout,
} from './components';

interface PostPageProps {
  postId?: string;
  show?: 'true';
  voted?: string;
}

const PostPage = ({ voted, show, postId = '' }: PostPageProps) => {
  const myId = useRecoilValue(authInfoState)?.userId;
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

  // 댓글 알림 hook
  useCommentNotification({ postData, isVoted, myId, setIsVoted });

  // 댓글 생성 hook
  const { handleSubmitComment, handleChangeComment, isCreateCommentSuccess } =
    useCreateComment({
      votedValue,
      postId,
      setSubmitValue,
      setIsVoted,
    });

  // 투표 여부 확인 hook
  useUpdateComponent({
    postData,
    myId,
    submitValue,
    voted,
    setVotedValue,
    setSubmitValue,
  });

  useEffect(() => {
    postRefetch();
  }, [postRefetch, isCreateCommentSuccess, isDeleteCommentSuccess]);

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
  }, [myId, postData, submitValue]);

  const deleteComment = (id: string) => {
    deleteCommentMutate({ id });
    searchParams.delete('voted');
    setSearchParams(searchParams);
    setSubmitValue('');
  };

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
