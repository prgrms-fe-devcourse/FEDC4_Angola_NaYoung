import { ChangeEvent, FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { ButtonStyled } from '@components/Button';
import { pxToRem } from './pxToRem';

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
  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitComment(votedValue, comment);
  };

  return (
    <MakeCommentContainer>
      <Form onSubmit={handleSubmit}>
        <ItemButtonsContainer>
          <ItemButtonA
            type="button"
            size="sm"
            onClick={() => handleClickItem('A')}
            votedValue={votedValue}>
            A
          </ItemButtonA>
          <ItemButtonB
            type="button"
            size="sm"
            onClick={() => handleClickItem('B')}
            votedValue={votedValue}>
            B
          </ItemButtonB>
        </ItemButtonsContainer>
        <Comment
          placeholder="의견을 작성해주세요!&#13;&#10;투표만 하고 싶다면, 오른쪽 버튼을 클릭해주세요."
          onChange={handleChangeComment}
        />
        <SubmitButton
          size="md"
          disabled={votedValue ? false : true}
          votedValue={votedValue}>
          참여하기
        </SubmitButton>
      </Form>
    </MakeCommentContainer>
  );
};

export default MakeComment;

const MakeCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${pxToRem(16)};
  border: 1px solid black;
  z-index: 10;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${pxToRem(16)};
`;

const ItemButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${pxToRem(120)};
`;

const ItemButtonA = styled(ButtonStyled)<{ votedValue: string }>`
  width: ${pxToRem(80)};
  height: 50%;
  padding-top: ${pxToRem(24)};
  justify-content: center;
  align-items: center;
  box-shadow: none;
  font-size: ${pxToRem(24)};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  border-radius: ${pxToRem(40)} ${pxToRem(40)} 0 0;
  border-bottom: none;

  color: ${(props) => (props.votedValue === 'A' ? '#404040' : '#9a9a9a')};
`;

const ItemButtonB = styled(ButtonStyled)<{ votedValue: string }>`
  width: ${pxToRem(80)};
  height: 50%;
  justify-content: center;
  align-items: center;
  font-size: ${pxToRem(24)};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  border-radius: 0 0 ${pxToRem(40)} ${pxToRem(40)};

  color: ${(props) => (props.votedValue === 'B' ? '#404040' : '#9a9a9a')};
`;

const Comment = styled.textarea`
  display: flex;
  flex-direction: column;
  padding: ${pxToRem(16)} ${pxToRem(24)};
  height: ${pxToRem(120)};
  align-items: flex-start;
  flex: 1 0 0;
  border-radius: ${pxToRem(40)};
  border: ${pxToRem(2)} solid #404040;
  background-color: #e5e5e5;
  box-shadow: 0px 6px 0px 0px rgba(64, 64, 64, 0.5) inset;
  resize: none;
  font-size: ${pxToRem(16)};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.352px;
`;

const SubmitButton = styled(ButtonStyled)<{ votedValue: string }>`
  width: ${pxToRem(120)};
  height: ${pxToRem(120)};
  padding: ${pxToRem(16)} 0;
  justify-content: center;
  align-items: center;
  border-radius: ${pxToRem(40)};
  font-size: ${pxToRem(20)};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;

  color: ${(props) => (props.votedValue ? '#404040' : '#9a9a9a')};
`;
