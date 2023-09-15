import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Comment } from '@type';
import { voteRatio } from '@utils/voteRatio';

interface TurnoutProps {
  comments: Comment[];
}
const Turnout = ({ comments }: TurnoutProps) => {
  const [ratios, setRatio] = useState([0, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!comments) {
      return;
    }

    setRatio(voteRatio(comments));

    if (!searchParams.get('voted')) {
      searchParams.set('voted', 'true');
      setSearchParams(searchParams);
    }
  }, [comments, searchParams, setSearchParams]);
  return (
    <>
      <TurnoutContainer>
        <TurnoutBar>
          <ARatio ratio={ratios[0]}>A: {ratios[0]}</ARatio>
          <BRatio ratio={ratios[1]}>B: {ratios[1]}</BRatio>
        </TurnoutBar>
      </TurnoutContainer>
    </>
  );
};

export default Turnout;

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
  width: 100%;
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
