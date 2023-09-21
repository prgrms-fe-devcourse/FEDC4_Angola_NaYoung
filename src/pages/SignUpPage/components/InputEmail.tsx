import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface InputEmailProps {
  handleChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickDuplicatedEmailCheckBtn: () => void;
  isDuplicatedEmailChecked: boolean;
}

const InputEmail = ({
  handleChangeEmail,
  handleClickDuplicatedEmailCheckBtn,
  isDuplicatedEmailChecked,
}: InputEmailProps) => {
  return (
    <>
      <InputContainer>
        <InputWrapper>
          <Input
            onChange={handleChangeEmail}
            placeholder="angola@gmail.com"
          />
          {isDuplicatedEmailChecked && (
            <DoubleCheckIcon>
              <Icon
                name={'double_check'}
                color={'#78d968'}
              />
            </DoubleCheckIcon>
          )}
        </InputWrapper>
        <Button
          type="button"
          onClick={handleClickDuplicatedEmailCheckBtn}
          style={{
            width: '100px',
            padding: '0',
            fontSize: ANGOLA_STYLES.textSize.titleSm,
          }}>
          중복 검사
        </Button>
      </InputContainer>
    </>
  );
};

export default InputEmail;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
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
