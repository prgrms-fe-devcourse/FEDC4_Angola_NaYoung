import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  calculateLevel,
  joinDataBySeparator,
  splitCommentBySeparator,
} from '@utils';
import { useRecoilValue } from 'recoil';
import Modal from '@components/Modal';
import PostViewer from '@components/PostViewer';
import Spinner from '@components/Spinner';
import { useFetchCreateComment, useFetchDeleteComment } from '@apis/comment';
import { useFetchCreateNotification } from '@apis/notifications';
import { useFetchPost } from '@apis/post';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '../../styles/commonStyles';
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
  const myId = auth?.userId;
  const [votedValue, setVotedValue] = useState<string>('');
  const [submitValue, setSubmitValue] = useState<string | undefined>('');
  const [isVoted, setIsVoted] = useState(false);
  const { postData, postRefetch, isPostLoading } = useFetchPost(postId);
  const {
    createCommentMutate,
    isCreateCommentSuccess,
    isCreateCommentLoading,
  } = useFetchCreateComment();
  const { deleteCommentMutate, isDeleteCommentError, isDeleteCommentSuccess } =
    useFetchDeleteComment();
  const { createNotificationMutate } = useFetchCreateNotification();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleSubmitComment = (voteValue: string, comment: string) => {
    if (voteValue) {
      createCommentMutate({
        comment: joinDataBySeparator(voteValue, comment),
        postId,
      });
    }
    searchParams.set('voted', voteValue);
    setSearchParams(searchParams);
    setSubmitValue('');
    setIsVoted(true);
  };

  // 투표 완료시, 알림 보내주기.
  useEffect(() => {
    if (postData && isVoted && myId) {
      const userComment = postData.comments.find(
        (comment) => comment.author._id === myId,
      );

      if (!userComment) return;
      setIsVoted(false);

      if (myId === postData.author._id) {
        return;
      }
      createNotificationMutate({
        notificationType: 'COMMENT',
        notificationTypeId: userComment._id,
        userId: myId,
        postId: postData._id,
      });
    }
  }, [isVoted, postData, myId, createNotificationMutate]);

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
          {show && (
            <CommentsContainer>
              {submitValue && postData?.comments ? (
                isCreateCommentLoading ? (
                  <Spinner />
                ) : (
                  <Turnout
                    comments={postData?.comments}
                    authorLevel={calculateLevel(postData.author)}
                  />
                )
              ) : (
                <MakeComment
                  votedValue={votedValue}
                  handleClickItem={handleClickItem}
                  handleSubmitComment={handleSubmitComment}
                />
              )}
              {postData && !isDeleteCommentError && (
                <CommentList
                  comments={postData.comments}
                  deleteComment={deleteComment}
                  myId={myId}
                />
              )}
              {isDeleteCommentError && (
                <Modal onClose={() => window.location.reload()}>
                  <CommentDeletionFailModal>
                    댓글 삭제에 실패했습니다.
                  </CommentDeletionFailModal>
                </Modal>
              )}
            </CommentsContainer>
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

const CommentDeletionFailModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
`;
