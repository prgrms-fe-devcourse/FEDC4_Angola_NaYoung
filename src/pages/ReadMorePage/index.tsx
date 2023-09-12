import { MouseEvent, useRef, useState } from 'react';
import styled from '@emotion/styled';
import TestComponent from '@pages/ReadMorePage/TestComponent';

// postData && ( // postData 가 있을 때만 Post 컴포넌트를 렌더링 해주세요!
//   <Post
//     postId={postId}
//     authorName={postData.author.fullName}
//     authorId={postData.author._id}
//     postTitle={postData.title}
//     voteValue={votedValue} // detail page 에서만
//     onVote={(value: string) => setVotedValue(value)} // detail page 에서만
//   />
// );

const ReadMorePage = () => {
  const [votedValue, setVotedValue] = useState('');
  const buttonARef = useRef<HTMLButtonElement | null>(null);
  const buttonBRef = useRef<HTMLButtonElement | null>(null);

  const handleClickItemA = (e: MouseEvent<HTMLButtonElement>) => {
    if (votedValue === 'A') {
      e.currentTarget.classList.remove('A');
      setVotedValue('');
      return;
    }
    buttonBRef.current && buttonBRef.current.classList.remove('B');
    e.currentTarget.classList.add('A');
    setVotedValue('A');
  };

  const handleClickItemB = (e: MouseEvent<HTMLButtonElement>) => {
    if (votedValue === 'B') {
      e.currentTarget.classList.remove('B');
      setVotedValue('');
      return;
    }
    buttonARef.current && buttonARef.current.classList.remove('A');
    e.currentTarget.classList.add('B');
    setVotedValue('B');
  };

  return (
    <>
      <ReadMorePageContainer>
        <TestComponent />
        <CommentsContainer>
          <MakeCommentContainer>
            <ItemButtonsContainer>
              <ItemButtonA
                ref={buttonARef}
                onClick={handleClickItemA}>
                A
              </ItemButtonA>
              <ItemButtonB
                ref={buttonBRef}
                onClick={handleClickItemB}>
                B
              </ItemButtonB>
            </ItemButtonsContainer>
            <MakeComment placeholder="의견 입력창"></MakeComment>
            <SubmitButton>
              <p>submit</p>
              <p>또는</p>
              <p>skip</p>
            </SubmitButton>
          </MakeCommentContainer>
          <CommentWrapper>
            <MakerName>작성자 이름</MakerName>
            <CommentSubWrapper>
              <VotedItem>A</VotedItem>
              <Comment>의견 한 줄</Comment>
            </CommentSubWrapper>
          </CommentWrapper>
        </CommentsContainer>
      </ReadMorePageContainer>
    </>
  );
};

export default ReadMorePage;

const ReadMorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const MakeCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border: 1px solid black;
  z-index: 100;
  gap: 1rem;
`;

const ItemButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 40px;
  overflow: hidden;
  width: 3rem;
  height: 6rem;
`;

const ItemButtonA = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 1.5rem;
  border-bottom: solid;
  cursor: pointer;

  &.A {
    background-color: pink;
  }
  &:hover {
    background-color: gray;
  }
`;

const ItemButtonB = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &.B {
    background-color: pink;
  }
  &:hover {
    background-color: gray;
  }
`;

const MakeComment = styled.input`
  border: 1px solid black;
  border-radius: 3rem;
  padding: 1rem;
  width: 80%;
`;

const SubmitButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 2rem;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
`;

// here

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const CommentSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const MakerName = styled.p`
  padding-left: 1rem;
`;

const VotedItem = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const Comment = styled.div`
  padding: 1rem;
  border: 1px solid black;
  border-radius: 50px;
  width: 80%;
`;
