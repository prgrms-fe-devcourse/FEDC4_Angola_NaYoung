import { ChangeEvent, FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import Button, { ButtonStyled } from '@components/Button';
import { ANGOLA_STYLES } from '../../styles/commonStyles';

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
          <Button
            type="button"
            onClick={() => handleClickItem('A')}
            style={{
              width: '80px',
              height: '50%',
              paddingTop: '24px',
              borderRadius: '40px 40px 0 0',
              borderBottom: 'none',
              color:
                votedValue === 'A'
                  ? ANGOLA_STYLES.color.text
                  : ANGOLA_STYLES.color.dark,
            }}>
            A
          </Button>
          <Button
            type="button"
            onClick={() => handleClickItem('B')}
            style={{
              width: '80px',
              height: '50%',
              borderRadius: '0 0 40px 40px',
              color:
                votedValue === 'B'
                  ? ANGOLA_STYLES.color.text
                  : ANGOLA_STYLES.color.dark,
            }}>
            B
          </Button>
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
  padding: 16px;
  border: ${ANGOLA_STYLES.border.default};
  border-radius: 24px 24px 0 0;
  z-index: 10;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
`;

const ItemButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
`;

const Comment = styled.textarea`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  align-items: flex-start;
  flex: 1 0 0;
  border-radius: 40px;
  border: ${ANGOLA_STYLES.border.default};
  background-color: ${ANGOLA_STYLES.color.gray};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  resize: none;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  letter-spacing: -0.352px;

  &:focus {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
  ::placeholder {
    font-size: ${ANGOLA_STYLES.textSize.text};
  }
`;

const SubmitButton = styled(ButtonStyled)<{ votedValue: string }>`
  width: 120px;
  height: 120px;
  padding: 16px 0;

  color: ${(props) =>
    props.votedValue ? ANGOLA_STYLES.color.text : ANGOLA_STYLES.color.dark};

  &:hover {
    ${(props) =>
      !props.votedValue &&
      `${ANGOLA_STYLES.shadow.buttonSm.hover}; ${ANGOLA_STYLES.border.default};`};
  }
`;
