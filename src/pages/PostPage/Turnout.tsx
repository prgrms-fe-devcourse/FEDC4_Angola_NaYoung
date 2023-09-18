import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Comment } from '@type';
import { getUserLevelInfo, pxToRem, voteRatio } from '@utils';

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
  padding: ${pxToRem(16)};
  border: ${pxToRem(2)} solid #404040;
  border-radius: ${pxToRem(24)} ${pxToRem(24)} 0 0;
  z-index: 10;
`;

const TurnoutBar = styled.div`
  display: flex;
  display: row;
  border: ${pxToRem(2)} solid #404040;
  border-radius: ${pxToRem(40)};
  width: 100%;
  overflow: hidden;
  box-shadow: 0 ${pxToRem(4)} 0 0 #404040;
`;

const ARatio = styled.div<{
  ratio: number;
  votedValue: string | null;
  postColor: string;
}>`
  padding: ${pxToRem(8)} ${pxToRem(24)} 0 ${pxToRem(24)};
  justify-content: center;
  align-items: center;
  border-right: ${pxToRem(1)} solid;
  font-size: ${pxToRem(18)};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  width: ${(props) => props.ratio}%;
  display: ${(props) => (props.ratio == 0 ? 'none' : 'flex')};
  background-color: ${(props) =>
    props.votedValue === 'A' ? props.postColor : '#e5e5e5'};
`;

const BRatio = styled.div<{
  ratio: number;
  votedValue: string | null;
  postColor: string;
}>`
  padding: ${pxToRem(8)} ${pxToRem(24)} 0 ${pxToRem(24)};
  justify-content: center;
  align-items: center;
  border-left: ${pxToRem(1)} solid;
  font-size: ${pxToRem(18)};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  width: ${(props) => props.ratio}%;
  display: ${(props) => (props.ratio == 0 ? 'none' : 'flex')};
  background-color: ${(props) =>
    props.votedValue === 'B' ? props.postColor : '#e5e5e5'};
`;
