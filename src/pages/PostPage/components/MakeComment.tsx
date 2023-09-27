import type { ChangeEvent, FormEvent } from 'react';
import styled from '@emotion/styled';
import Button, { ButtonStyled } from '@components/Button';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { CREATE_COMMENT, VOTED_VALUES } from '../constants';

interface MakeCommentProps {
  myId: string | undefined;
  votedValue: string;
  handleClickItem: (value: string) => void;
  handleSubmitComment: (e: FormEvent) => void;
  handleChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  authorLevel: number;
}

const MakeComment = ({
  myId,
  votedValue,
  handleClickItem,
  handleSubmitComment,
  handleChangeComment,
  authorLevel,
}: MakeCommentProps) => (
  <MakeCommentContainer>
    <Form onSubmit={handleSubmitComment}>
      <VoteContainer>
        <ItemButtonsContainer>
          <Button
            disabled={myId ? false : true}
            type="button"
            onClick={() => handleClickItem(VOTED_VALUES.A)}
            style={{
              width: '60px',
              height: '50%',
              paddingTop: '24px',
              borderRadius: '30px 30px 0 0',
              borderBottom: 'none',
              color:
                votedValue === VOTED_VALUES.A
                  ? ANGOLA_STYLES.color.text
                  : ANGOLA_STYLES.color.dark,
              background:
                votedValue === VOTED_VALUES.A
                  ? ANGOLA_STYLES.color.levels[authorLevel].fill
                  : 'white',
            }}>
            {VOTED_VALUES.A}
          </Button>
          <Button
            disabled={myId ? false : true}
            type="button"
            onClick={() => handleClickItem(VOTED_VALUES.B)}
            style={{
              width: '60px',
              height: '50%',
              borderRadius: '0 0 30px 30px',
              color:
                votedValue === VOTED_VALUES.B
                  ? ANGOLA_STYLES.color.text
                  : ANGOLA_STYLES.color.dark,
              background:
                votedValue === VOTED_VALUES.B
                  ? ANGOLA_STYLES.color.levels[authorLevel].fill
                  : 'white',
            }}>
            {VOTED_VALUES.B}
          </Button>
        </ItemButtonsContainer>
        <CommentWrapper>
          <Comment
            placeholder={CREATE_COMMENT.INPUT.PLACEHOLDER_MSG}
            onChange={handleChangeComment}
          />
        </CommentWrapper>
      </VoteContainer>
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const VoteContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ItemButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  @media (max-width: 450px) {
    display: none;
  }
`;

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 14px 18px;
  border-radius: 40px;
  background-color: ${ANGOLA_STYLES.color.gray};
  border: ${ANGOLA_STYLES.border.default};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  @media (max-width: 800px) {
    height: 120px;
  }
  &:has(textarea:focus) {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const Comment = styled.textarea`
  flex: 1 0 0;
  outline: none;
  border: none;
  background-color: transparent;
  resize: none;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  letter-spacing: -0.352px;

  ::placeholder {
    font-size: ${ANGOLA_STYLES.textSize.text};
  }
  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: rgba(255, 255, 255, 1);
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const SubmitButton = styled(ButtonStyled)<{ votedValue: string }>`
  width: 120px;
  height: 120px;
  padding: 16px 0;

  &:hover {
    ${(props) =>
      !props.votedValue &&
      `${ANGOLA_STYLES.shadow.buttonSm.hover}; ${ANGOLA_STYLES.border.default};`};
  }

  @media (max-width: 800px) {
    height: 60px;
    width: 120px;
  }
`;
