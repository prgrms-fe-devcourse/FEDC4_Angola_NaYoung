import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Comment } from '@type';
import { getUserLevelInfo, voteRatio } from '@utils';
import { ANGOLA_STYLES } from '../../styles/commonStyles';

interface TurnoutProps {
  comments: Comment[];
  authorLevel: number;
}
const Turnout = ({ comments, authorLevel }: TurnoutProps) => {
  const [searchParams] = useSearchParams();
  const votedValue = searchParams.get('voted');
  const [ratios, setRatio] = useState([0, 0]);
  const [postColor, setPostColor] = useState(
    getUserLevelInfo(authorLevel).userColor,
  );

  useEffect(() => {
    comments && comments.length > 0 && setRatio(voteRatio(comments));
  }, [comments]);

  useEffect(() => {
    setPostColor(getUserLevelInfo(authorLevel).userColor);
  }, [authorLevel, setPostColor]);

  return (
    <TurnoutContainer>
      <TurnoutBar>
        <ARatio
          ratio={ratios[0]}
          votedValue={votedValue}
          postColor={postColor}>
          A: {ratios[0]}%
        </ARatio>
        <BRatio
          ratio={ratios[1]}
          votedValue={votedValue}
          postColor={postColor}>
          B: {ratios[1]}%
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
  z-index: 10;
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
  postColor: string;
}>`
  padding: 8px 24px 0 24px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid;
  line-height: 150%;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};

  width: ${(props) => props.ratio}%;
  display: ${(props) => (props.ratio == 0 ? 'none' : 'flex')};
  background-color: ${(props) =>
    props.votedValue === 'A' ? props.postColor : ANGOLA_STYLES.color.gray};
`;

const BRatio = styled.div<{
  ratio: number;
  votedValue: string | null;
  postColor: string;
}>`
  padding: 8px 24px 0 24px;
  justify-content: center;
  align-items: center;
  border-left: 1px solid;
  line-height: 150%;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};

  width: ${(props) => props.ratio}%;
  display: ${(props) => (props.ratio == 0 ? 'none' : 'flex')};
  background-color: ${(props) =>
    props.votedValue === 'B' ? props.postColor : ANGOLA_STYLES.color.gray};
`;
