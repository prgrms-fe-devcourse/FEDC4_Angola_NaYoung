import { useEffect } from 'react';
import styled from '@emotion/styled';

interface imsyProps {
  voteValue: string;
  onVote: (value: string) => void;
}

const TestComponent = ({ voteValue, onVote }: imsyProps) => {
  useEffect(() => {
    console.log(voteValue);
  }, [voteValue]);
  return (
    <>
      <ComponentContainer>
        <TitleContainer>
          <User>작성자</User>
          <Title>한 줄 설명</Title>
        </TitleContainer>
        <VoteContainer>
          <VoteButton
            style={
              voteValue === 'A'
                ? { backgroundColor: '#F0000080' }
                : { backgroundColor: '#8EE2E2' }
            }
            onClick={() => onVote('A')}>
            <p
              style={{
                color: 'white',
                fontSize: '1.5rem',
                paddingBottom: '1rem',
              }}>
              A
            </p>
            <p>어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌미구구</p>
          </VoteButton>
          <VS>VS</VS>
          <VoteButton
            style={
              voteValue === 'B'
                ? { backgroundColor: '#F0000080' }
                : { backgroundColor: '#C4A8FF' }
            }
            onClick={() => onVote('B')}>
            <p
              style={{
                color: 'white',
                fontSize: '1.5rem',
                paddingBottom: '1rem',
              }}>
              B
            </p>
            <p>어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌미구</p>
          </VoteButton>
        </VoteContainer>
        <LikeCommentContainer>
          <LikeComment>좋아요</LikeComment>
          <LikeComment>댓글</LikeComment>
        </LikeCommentContainer>
      </ComponentContainer>
    </>
  );
};

export default TestComponent;

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  gap: 1.5rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 50px;
  position: relative;
  border: 1px solid black;
  width: 100%;
`;

const User = styled.div`
  z-index: 10;
  border-radius: 50px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  padding: 1rem;
  border: 1px solid black;
`;

const Title = styled.div`
  padding: 1rem;
  text-align: center;
  width: 100%;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const VoteButton = styled.button`
  padding: 1.5rem;
  border: 1px solid black;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    scale: 1.05;
  }
`;

const VS = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const LikeCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const LikeComment = styled.button`
  border: 1px solid black;
  border-radius: 45%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: gray;
  }
`;
