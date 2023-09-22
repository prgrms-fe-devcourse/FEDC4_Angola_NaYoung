import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { useContentClassName } from '@components/PostViewer/hooks';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { POST_CONTENTS } from '../constants';

interface PostContentsProps {
  contentA: string;
  contentB: string;
  onVote?: (value: string) => void;
  voteValue?: string;
  onGoDetailPage: () => void;
  onShowNonAuthModal: () => void;
  isVoted: boolean;
  voteColor: string;
}

const PostContents = ({
  contentA,
  contentB,
  onVote,
  voteValue,
  onGoDetailPage: goDetailPage,
  onShowNonAuthModal: showNonAuthModal,
  isVoted,
  voteColor,
}: PostContentsProps) => {
  const auth = useRecoilValue(authInfoState);
  const getContentClassName = useContentClassName(voteValue);
  const handleClickContent = (value: string) => {
    if (!auth) {
      showNonAuthModal();
      return;
    }
    onVote && onVote(value);
    goDetailPage();
  };

  return (
    <SelectionContainer>
      <Selection
        voteColor={voteColor}
        canVote={!isVoted}
        className={getContentClassName(POST_CONTENTS.VOTE_TEXT.A)}
        onClick={() => handleClickContent(POST_CONTENTS.VOTE_TEXT.A)}>
        <Type>{POST_CONTENTS.VOTE_TEXT.A}</Type>
        <Content>{contentA}</Content>
      </Selection>
      <VsSymbol>{POST_CONTENTS.SYMBOL_TEXT}</VsSymbol>
      <Selection
        voteColor={voteColor}
        canVote={!isVoted}
        className={getContentClassName(POST_CONTENTS.VOTE_TEXT.B)}
        onClick={() => handleClickContent(POST_CONTENTS.VOTE_TEXT.B)}>
        <Type>{POST_CONTENTS.VOTE_TEXT.B}</Type>
        <Content>{contentB}</Content>
      </Selection>
    </SelectionContainer>
  );
};

export default PostContents;

const SelectionContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 36px;
`;

const Selection = styled.div<{ voteColor: string; canVote: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 160px;
  max-height: 256px;
  line-height: 150%;
  flex: 1 0 0;
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
  border: ${ANGOLA_STYLES.border.default};
  border-radius: 24px;
  word-break: break-all;
  padding: 16px 16px 24px 16px;
  gap: 16px;
  white-space: pre-wrap;
  transition: transform 0.2s ease-out;
  cursor: ${({ canVote }) => (canVote ? 'pointer' : 'default')};
  pointer-events: ${({ canVote }) => (canVote ? 'auto' : 'none')};
  &.active {
    background: ${({ voteColor }) => voteColor};
  }
  &:hover {
    transform: scale(1.015);
  }
`;

const VsSymbol = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.symbol};
  text-shadow:
    -1px 0px ${ANGOLA_STYLES.color.text},
    0px 1px ${ANGOLA_STYLES.color.text},
    1px 0px ${ANGOLA_STYLES.color.text},
    0px -1px ${ANGOLA_STYLES.color.text};
`;

const Type = styled.h1`
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
`;

const Content = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
