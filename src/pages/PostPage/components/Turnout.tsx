import styled from '@emotion/styled';
import type { Comment } from '@type';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { useVotingResult } from '../Hooks';
import { VOTED_VALUES } from '../constants';

interface TurnoutProps {
  comments: Comment[];
  authorLevel: number;
}
const Turnout = ({ comments, authorLevel }: TurnoutProps) => {
  const { votedValue, ratios } = useVotingResult({ comments });

  return (
    <TurnoutContainer>
      <TurnoutBar>
        <ARatio
          ratio={ratios.aRatio}
          votedValue={votedValue}
          level={authorLevel}>
          {VOTED_VALUES.A}: {ratios.aRatio}%
        </ARatio>
        <BRatio
          ratio={ratios.bRatio}
          votedValue={votedValue}
          level={authorLevel}>
          {VOTED_VALUES.B}: {ratios.bRatio}%
        </BRatio>
      </TurnoutBar>
    </TurnoutContainer>
  );
};

export default Turnout;

const TurnoutContainer = styled.div`
  display: flex;
  padding: 16px;
  border: ${ANGOLA_STYLES.border.default};
  border-radius: 24px 24px 0 0;
`;

const TurnoutBar = styled.div`
  display: flex;
  border: ${ANGOLA_STYLES.border.default};
  border-radius: 40px;
  width: 100%;
  overflow: hidden;
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};
`;

const ARatio = styled.div<{
  ratio: number;
  votedValue: string | null;
  level: number;
}>`
  padding: 8px 24px 0 24px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid;
  line-height: 150%;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};

  width: ${({ ratio }) => ratio}%;
  display: ${({ ratio }) => (ratio == 0 ? 'none' : 'flex')};
  background: ${({ votedValue, level }) =>
    votedValue === VOTED_VALUES.A
      ? ANGOLA_STYLES.color.levels[level].fill
      : ANGOLA_STYLES.color.gray};
`;

const BRatio = styled.div<{
  ratio: number;
  votedValue: string | null;
  level: number;
}>`
  padding: 8px 24px 0 24px;
  justify-content: center;
  align-items: center;
  border-left: 1px solid;
  line-height: 150%;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};

  width: ${({ ratio }) => ratio}%;
  display: ${({ ratio }) => (ratio == 0 ? 'none' : 'flex')};
  background: ${({ votedValue, level }) =>
    votedValue === VOTED_VALUES.B
      ? ANGOLA_STYLES.color.levels[level].fill
      : ANGOLA_STYLES.color.gray};
`;
