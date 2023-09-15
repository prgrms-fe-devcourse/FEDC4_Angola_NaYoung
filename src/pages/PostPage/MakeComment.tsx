import { ChangeEvent, FormEvent, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

// import { useFetchCreateComment } from '@apis/comment';
// import { joinDataBySeparator } from '@utils/parseDataBySeparator';

interface MakeCommentProps {
  votedValue: string;
  handleClickItem: (value: string) => void;
  handleSubmitComment: (voteValue: string, comment: string) => void;
}

const MakeComment = ({
  votedValue,
  handleClickItem,
  handleSubmitComment,
}: MakeCommentProps) => {
  const [comment, setComment] = useState<string>('');
  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitComment(votedValue, comment);
  };

  return (
    <>
      <MakeCommentContainer>
        <ItemButtonsContainer>
          <ItemButtonA
            onClick={() => handleClickItem('a')}
            votedValue={votedValue}>
            A
          </ItemButtonA>
          <ItemButtonB
            onClick={() => handleClickItem('b')}
            votedValue={votedValue}>
            B
          </ItemButtonB>
        </ItemButtonsContainer>
        <Form onSubmit={handleSubmit}>
          <Comment
            placeholder="의견 입력창"
            onChange={handleChangeComment}></Comment>
          <SubmitButton disabled={votedValue ? false : true}>
            <p>submit</p>
            <p>또는</p>
            <p>skip</p>
          </SubmitButton>
        </Form>
      </MakeCommentContainer>
    </>
  );
};

export default MakeComment;

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

const ItemButtonA = styled.button<{ votedValue: string }>`
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 1.5rem;
  border-bottom: solid;
  cursor: pointer;
  background-color: ${(props) =>
    props.votedValue === 'a' ? 'orangered' : 'none'};

  &:hover {
    background-color: #80808030;
  }
`;

const ItemButtonB = styled.button<{ votedValue: string }>`
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.votedValue === 'b' ? 'orangered' : 'none'};

  &:hover {
    background-color: #80808030;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
`;

const Comment = styled.input`
  border: 1px solid black;
  border-radius: 3rem;
  padding: 1rem;
  width: 100%;
`;

const SubmitButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 2rem;
  cursor: pointer;

  &:hover {
    background-color: #80808030;
  }
  &:disabled {
    background-color: #999da020;
  }
`;
