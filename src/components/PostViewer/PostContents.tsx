import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@store/auth';

interface PostContentsProps {
  contentA: string;
  contentB: string;
  onVote?: (value: string) => void;
  voteValue?: string;
  onGoDetailPage: () => void;
  onShowNonAuthModal: () => void;
  isPostPage: boolean;
  colorA?: string;
  colorB?: string;
}

const PostContents = ({
  contentA,
  contentB,
  onVote,
  voteValue,
  onGoDetailPage: goDetailPage,
  onShowNonAuthModal: showNonAuthModal,
  isPostPage,
  colorA,
  colorB,
}: PostContentsProps) => {
  const auth = useRecoilValue(authInfoState);
  const handleClickContent = (value: string) => {
    if (!auth) {
      showNonAuthModal();
      return;
    }
    onVote && onVote(value);
    goDetailPage();
  };
  const getContentClassName = (value: string) => {
    return isPostPage && voteValue === value ? 'active' : '';
  };

  return (
    <VoteButtonContainer>
      <VoteButton
        bgColor={colorA || '#ffffff'}
        className={getContentClassName('A')}
        onClick={() => handleClickContent('A')}>
        {contentA}
      </VoteButton>
      <VoteButton
        bgColor={colorB || '#ffffff'}
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

const VoteButton = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: ${({ bgColor }) => rgba(bgColor, 0.2)};
  box-shadow: 5px 5px 0px 0px ${({ bgColor }) => bgColor};
  &.active {
    background-color: ${({ bgColor }) => rgba(bgColor, 0.8)};
    box-shadow: 5px 5px 0px 0px ${({ bgColor }) => bgColor};
    border-width: 3px;
  }
  border: 2px solid black;
  border-radius: 40px;
  word-break: break-all;
  padding: 5px;
  white-space: pre;
`;
