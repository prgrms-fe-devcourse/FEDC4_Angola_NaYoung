import { ChangeEvent, FormEvent } from 'react';
import styled from '@emotion/styled';
import Button, { ButtonStyled } from '@components/Button';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { CREATE_COMMENT, VOTED_VALUES } from '../constants';

interface MakeCommentProps {
  votedValue: string;
  handleClickItem: (value: string) => void;
  handleSubmitComment: (e: FormEvent) => void;
  handleChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MakeComment = ({
  votedValue,
  handleClickItem,
  handleSubmitComment,
  handleChangeComment,
}: MakeCommentProps) => (
  <MakeCommentContainer>
    <Form onSubmit={handleSubmitComment}>
      <ItemButtonsContainer>
        <Button
          type="button"
          onClick={() => handleClickItem(VOTED_VALUES.A)}
          style={{
            width: '80px',
            height: '50%',
            paddingTop: '24px',
            borderRadius: '40px 40px 0 0',
            borderBottom: 'none',
            color:
              votedValue === VOTED_VALUES.A
                ? ANGOLA_STYLES.color.text
                : ANGOLA_STYLES.color.dark,
          }}>
          {VOTED_VALUES.A}
        </Button>
        <Button
          type="button"
          onClick={() => handleClickItem(VOTED_VALUES.B)}
          style={{
            width: '80px',
            height: '50%',
            borderRadius: '0 0 40px 40px',
            color:
              votedValue === VOTED_VALUES.B
                ? ANGOLA_STYLES.color.text
                : ANGOLA_STYLES.color.dark,
          }}>
          {VOTED_VALUES.B}
        </Button>
      </ItemButtonsContainer>
      <Comment
        placeholder={CREATE_COMMENT.INPUT.PLACEHOLDER_MSG}
        onChange={handleChangeComment}
      />
      <SubmitButton
        size="md"
        disabled={votedValue ? false : true}
        votedValue={votedValue}>
        {CREATE_COMMENT.SUBMIT.BUTTON_MSG}
      </SubmitButton>
    </Form>
  </MakeCommentContainer>
);

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
  background-color: ${(props) => (props.votedValue ? 'none' : 'white')}

  color: ${(props) =>
    props.votedValue ? ANGOLA_STYLES.color.text : ANGOLA_STYLES.color.dark};

  &:hover {
    ${(props) =>
      !props.votedValue &&
      `${ANGOLA_STYLES.shadow.buttonSm.hover}; ${ANGOLA_STYLES.border.default};`};
  }
`;
