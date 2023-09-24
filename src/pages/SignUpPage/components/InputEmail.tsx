import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { BUTTON, COLOR, INPUT } from '../constants';

interface InputEmailProps {
  handleChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickDuplicatedEmailCheckBtn: () => void;
  isDuplicatedEmailChecked: boolean;
  invalidEmailMsg: string;
  validEmailMsg: string;
}

const InputEmail = ({
  handleChangeEmail,
  handleClickDuplicatedEmailCheckBtn,
  isDuplicatedEmailChecked,
  invalidEmailMsg,
  validEmailMsg,
}: InputEmailProps) => {
  return (
    <>
      <InputContainer>
        <InputWrapper>
          <Input
            onChange={handleChangeEmail}
            placeholder={INPUT.PLACEHOLDER.EMAIL}
          />
          {isDuplicatedEmailChecked && (
            <DoubleCheckIcon>
              <Icon
                name={'double_check'}
                color={COLOR.ICON.DOUBLE_CHECK}
              />
            </DoubleCheckIcon>
          )}
        </InputWrapper>
        <Button
          disabled={invalidEmailMsg || validEmailMsg == '' ? true : false}
          type="button"
          onClick={handleClickDuplicatedEmailCheckBtn}
          style={{
            width: '100px',
            height: '36px',
            padding: '8px 0px',
            fontSize: ANGOLA_STYLES.textSize.titleSm,
          }}>
          {BUTTON.DUPLICATE_CHECK}
        </Button>
      </InputContainer>
      {invalidEmailMsg && (
        <InputWarning>
          <Icon
            name={'warn'}
            color={COLOR.ICON.WARN}
          />
          {invalidEmailMsg}
        </InputWarning>
      )}
      {validEmailMsg && (
        <InputWarning style={{ color: COLOR.MSG.VALID }}>
          {validEmailMsg}
        </InputWarning>
      )}
    </>
  );
};

export default InputEmail;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
`;

const InputWrapper = styled.div`
  width: 80%;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 4px 16px;
  border: ${ANGOLA_STYLES.border.default};
  border-radius: 40px;
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};

  ::placeholder {
    color: ${ANGOLA_STYLES.color.dark};
    font-size: ${ANGOLA_STYLES.textSize.text};
  }

  &:focus {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const DoubleCheckIcon = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(0, -50%);
`;

const InputWarning = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: ${COLOR.MSG.INVALID};
  padding-left: 1rem;
  gap: 8px;

  @media screen and (max-width: 700px) {
    justify-content: center;
    font-size: 13px;
    padding-top: 10px;
  }
`;
