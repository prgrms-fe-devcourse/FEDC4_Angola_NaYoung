import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@atoms/index';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';
import ButtonGroup from './ButtonGroup';
import PostContents from './PostContents';
import PostTitle from './PostTitle';

interface PostViewerProps {
  postId: string;
  postTitle: string;
  authorName: string;
  authorId: string;
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
      />
      <PostContents
        contentA={a}
        contentB={b}
        onVote={onVote}
        voteValue={voteValue}
        onGoDetailPage={goDetailPage}
        isPostPage={isPostPage}
      />
      {auth && (
        <ButtonGroup
          numberOfLikes={numberOfLikes}
          numberOfComments={numberOfComments}
          likeId={likeId}
          postId={postId}
          onGoDetailPage={goDetailPage}
          isPostPage={isPostPage}
        />
      )}
    </PostContainer>
  );
};

export default PostViewer;

const PostContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  > h1 {
    font-size: 20px;
  }
`;
