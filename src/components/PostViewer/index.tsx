import { useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@store/auth';
import { getUserLevelInfo } from '@utils/calculateUserLevel';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import {
  ButtonGroup,
  NonAuthModal,
  PostContents,
  PostTitle,
} from './components';
import { useControlRouteByPost } from './hooks';

interface PostViewerProps {
  postId: string;
  postTitle: string;
  authorName: string;
  authorId: string;
  authorLevel: number;
  likeId: string | undefined;
  numberOfComments: number;
  numberOfLikes: number;
  voteValue?: string;
  onVote?: (value: string) => void;
}

const PostViewer = ({
  postId,
  postTitle,
  authorName,
  authorId,
  authorLevel,
  likeId,
  voteValue,
  onVote,
  numberOfComments,
  numberOfLikes,
}: PostViewerProps) => {
  const { a, b, title } = splitPostBySeparator(postTitle);
  const auth = useRecoilValue(authInfoState);
  const [isModalShow, setIsModalShow] = useState(false);
  const isPostPage = onVote !== undefined;
  const { isVoted, isShow, goDetailPage } = useControlRouteByPost({
    postId,
    isPostPage,
  });

  return (
    <PostContainer>
      <PostTitle
        title={title}
        authorName={authorName}
        authorId={authorId}
        authorLevel={authorLevel}
        onGoDetailPage={goDetailPage}
        isPostPage={isPostPage}
      />
      <PostContents
        contentA={a}
        contentB={b}
        voteColor={getUserLevelInfo(authorLevel).userColor}
        onVote={onVote}
        voteValue={voteValue}
        onGoDetailPage={goDetailPage}
        onShowNonAuthModal={() => setIsModalShow(true)}
        isVoted={isVoted}
      />
      {auth && (
        <ButtonGroup
          numberOfLikes={numberOfLikes}
          numberOfComments={numberOfComments}
          likeId={likeId}
          postId={postId}
          authorId={authorId}
          isShow={isShow}
          isVoted={isVoted}
          onGoDetailPage={goDetailPage}
        />
      )}
      <Line />
      {isModalShow && <NonAuthModal onClose={() => setIsModalShow(false)} />}
    </PostContainer>
  );
};

export default PostViewer;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
`;

const Line = styled.hr`
  border: none;
  border-top: 2px dotted ${ANGOLA_STYLES.color.dark};
  color: ${ANGOLA_STYLES.color.white};
  background-color: ${ANGOLA_STYLES.color.white};
  height: 2px;
  width: 100%;
  margin-bottom: 32px;
`;
