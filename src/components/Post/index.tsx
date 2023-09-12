import styled from '@emotion/styled';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';

interface PostProps {
  postId: string;
  postTitle: string;
  authorName: string;
  authorId: string;
  voteValue?: string;
  onVote?: (value: string) => void;
}

const Post = ({
  postId,
  postTitle,
  authorName,
  authorId,
  voteValue,
  onVote,
}: PostProps) => {
  const { a, b, title } = splitPostBySeparator(postTitle);
  const handleClickVoteButton = (value: string) => {
    onVote && onVote(value);
  };
  return (
    <PostContainer>
      <h1>Post 컴포넌트</h1>
      <h2>Post: {postId}</h2>
      <h2>Author: {authorName}</h2>
      <h2>AuthorId: {authorId}</h2>
      <h2>Title: {title}</h2>
      <VoteButtonContainer>
        <VoteButton
          className={voteValue === 'a' ? 'active' : ''}
          onClick={() => handleClickVoteButton('a')}>
          {a}
        </VoteButton>
        <VoteButton
          className={voteValue === 'b' ? 'active' : ''}
          onClick={() => handleClickVoteButton('b')}>
          {b}
        </VoteButton>
      </VoteButtonContainer>
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  > h1 {
    font-size: 20px;
  }
`;

const VoteButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const VoteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  &.active {
    background-color: orangered;
  }
`;
