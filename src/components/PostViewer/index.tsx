import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@store/auth';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';
import ButtonGroup from './ButtonGroup';
import NonAuthModal from './NonAuthModal';
import PostContents from './PostContents';
import PostTitle from './PostTitle';

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

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isModalShow, setIsModalShow] = useState(false);
  const isPostPage = onVote !== undefined;
  const goDetailPage = () => {
    if (isPostPage) {
      if (!searchParams.get('show')) {
        searchParams.set('show', 'true');
        setSearchParams(searchParams);
      }
    } else {
      navigate(`/post/${postId}?show=true`);
    }
  };

  return (
    <PostContainer>
      <PostTitle
        title={title}
        authorName={authorName}
        authorId={authorId}
        authorLevel={authorLevel}
      />
      <PostContents
        contentA={a}
        contentB={b}
        onVote={onVote}
        voteValue={voteValue}
        onGoDetailPage={goDetailPage}
        onShowNonAuthModal={() => setIsModalShow(true)}
        isPostPage={isPostPage}
      />
      {auth && (
        <ButtonGroup
          numberOfLikes={numberOfLikes}
          numberOfComments={numberOfComments}
          likeId={likeId}
          postId={postId}
          onGoDetailPage={goDetailPage}
        />
      )}
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
