import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { calculateLevel } from '@utils';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import Spinner from '@components/Spinner';
import { useFetchPost } from '@apis/post';
import { authInfoState } from '@store/auth';
import {
  useCheckVoted,
  useCommentNotification,
  useControlRouteByComment,
  useCreateComment,
  useGetDeleteCommentState,
  useSelectItem,
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

  useEffect(() => {
    postRefetch();
  }, [postId, postRefetch]);

  // 투표 선택하는 hook
  const { handleClickItem } = useSelectItem({
    votedValue,
    setVotedValue,
    setSubmitValue,
  });

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

  // 댓글 삭제 hook
  const {
    isDeleteCommentError,
    isDeleteCommentLoading,
    isDeleteCommentSuccess,
    deleteComment,
  } = useGetDeleteCommentState({ setSubmitValue });

  // 투표 여부 확인 hook
  useCheckVoted({
    postData,
    myId,
    submitValue,
    voted,
    setVotedValue,
    setSubmitValue,
  });

  // 댓글 작성 및 삭제 시, postData refetch 및 url 업데이트 hook
  useControlRouteByComment({
    show,
    submitValue,
    postRefetch,
    isCreateCommentSuccess,
    isDeleteCommentSuccess,
  });

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
