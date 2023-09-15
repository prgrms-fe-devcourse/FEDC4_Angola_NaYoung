import { useEffect, useState } from 'react';
import { authInfoState } from '@atoms';
import styled from '@emotion/styled';
import { voteRatio } from '@utils';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import { useFetchPost } from '@apis/post';
import CommentList from './CommentList';
import MakeComment from './MakeComment';

const PostPage = () => {
  const auth = useRecoilValue(authInfoState);
  const userId = auth?.userId;
  const [votedValue, setVotedValue] = useState<string>('');
  const [, postId, isCommentsShow] =
    document.location.href.split(/\/post\/:|\?/);
  const { postData } = useFetchPost(postId);
  const comments = postData?.comments;
  const [ratios, setRatio] = useState([0, 0]);

  console.log(comments);
  useEffect(() => {
    if (!comments) {
      return;
    }
    const [aRatio, bRatio] = voteRatio(comments);
    setRatio([aRatio, bRatio]);
  }, [comments]);

  const handleClickItem = (value: string) => {
    votedValue === value ? setVotedValue('') : setVotedValue(value);
  };

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
        {isCommentsShow && (
          <CommentsContainer>
            <TurnoutContainer>
              <TurnoutBar>
                <ARatio ratio={ratios[0]}>A: {ratios[0]}</ARatio>
                <BRatio ratio={ratios[1]}>B: {ratios[1]}</BRatio>
              </TurnoutBar>
            </TurnoutContainer>
            <MakeComment
              votedValue={votedValue}
              handleClickItem={handleClickItem}
              postId={postId}
            />
            {comments && <CommentList comments={comments} />}
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

const TurnoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border: 1px solid black;
  z-index: 100;
  gap: 1rem;
  justify-content: center;
`;

const TurnoutBar = styled.div`
  display: flex;
  display: row;
  border: 1px solid black;
  border-radius: 3rem;
  width: 80%;
  overflow: hidden;
`;

const ARatio = styled.div<{ ratio: number }>`
  padding: 1rem;
  font-weight: 700;
  font-size: 1.3rem;
  border-right: 1px solid;
  width: ${(props) => props.ratio}%;
  ${(props) =>
    props.ratio > 50
      ? `
      background-image: linear-gradient(
        45deg,
        #ffa8b8 25%,
        #8ee2e2 25% 50%,
        #ffa8b8 50% 75%,
        #8ee2e2 75%
      );
      background-size: 50px 50px;
      background-repeat: repeat;
    `
      : `background-color: #80808050`}
`;

const BRatio = styled.div<{ ratio: number }>`
  padding: 1rem;
  font-weight: 700;
  font-size: 1.3rem;
  text-align: end;
  border-left: 1px solid;
  width: ${(props) => props.ratio}%;
  ${(props) =>
    props.ratio > 50
      ? `
      background-image: linear-gradient(
        45deg,
        #ffa8b8 25%,
        #8ee2e2 25% 50%,
        #ffa8b8 50% 75%,
        #8ee2e2 75%
      );
      background-size: 50px 50px;
      background-repeat: repeat;
    `
      : `background-color: #80808050`}
`;
