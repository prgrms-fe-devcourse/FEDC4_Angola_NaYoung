import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@atoms/index';

interface PostContentsProps {
  contentA: string;
  contentB: string;
  onVote?: (value: string) => void;
  voteValue?: string;
  onGoDetailPage: () => void;
  onShowNonAuthModal: () => void;
  isPostPage: boolean;
}

const PostContents = ({
  contentA,
  contentB,
  onVote,
  voteValue,
  onGoDetailPage: goDetailPage,
  onShowNonAuthModal: showNonAuthModal,
  isPostPage,
}: PostContentsProps) => {
  const auth = useRecoilValue(authInfoState);
  const handleClickContent = (value: string) => {
    if (!auth) {
      showNonAuthModal();
      return;
    }
    onVote && onVote(value);
    console.log(onVote);
    goDetailPage();
  };
  const getContentClassName = (value: string) => {
    return isPostPage && voteValue === value ? 'active' : '';
  };
  return (
    <VoteButtonContainer>
      <VoteButton
        className={getContentClassName('A')}
        onClick={() => handleClickContent('A')}>
        {contentA}
      </VoteButton>
      <VoteButton
        className={getContentClassName('B')}
        onClick={() => handleClickContent('B')}>
        {contentB}
      </VoteButton>
    </VoteButtonContainer>
  );
};

export default PostContents;

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
  border: 1px solid black;
  border-radius: 20px;
`;
