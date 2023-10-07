import type { ChangeEvent } from 'react';
import { Button, Icon } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { BUTTON, COLOR, INPUT } from '../constants';

interface InputFullName {
  handleChangeFullName: (e: ChangeEvent<HTMLInputElement>) => void;
  isDuplicatedFullNameChecked: boolean;
  handleClickDuplicatedFullNameCheckBtn: VoidFunction;
  invalidFullNameMsg: string;
  validFullNameMsg: string;
}

const InputFullName = ({
  handleChangeFullName,
  isDuplicatedFullNameChecked,
  handleClickDuplicatedFullNameCheckBtn,
  invalidFullNameMsg,
  validFullNameMsg,
}: InputFullName) => {
  return (
    <>
      <InputContainer>
        <InputWrapper>
          <Input
            onChange={handleChangeFullName}
            placeholder={INPUT.PLACEHOLDER.FULL_NAME}
          />
          {isDuplicatedFullNameChecked && (
            <DoubleCheckIcon>
              <Icon
                name={'double_check'}
                color={COLOR.ICON.DOUBLE_CHECK}
              />
            </DoubleCheckIcon>
          )}
        </InputWrapper>
        <Button
          disabled={invalidFullNameMsg || validFullNameMsg == '' ? true : false}
          type="button"
          onClick={handleClickDuplicatedFullNameCheckBtn}
          style={
            screen.width > 400
              ? {
                  width: '100px',
                  height: '36px',
                  padding: '8px 0px',
                  fontSize: ANGOLA_STYLES.textSize.titleSm,
                }
              : {
                  width: '76px',
                  height: '28px',
                  padding: '6px 0px',
                  fontSize: '14px',
                }
          }>
          {BUTTON.DUPLICATE_CHECK}
        </Button>
      </InputContainer>
      {invalidFullNameMsg && (
        <InputWarning>
          <Icon
            name={'warn'}
            color={COLOR.ICON.WARN}
          />
          {invalidFullNameMsg}
        </InputWarning>
      )}
      {validFullNameMsg && (
        <InputWarning style={{ color: COLOR.MSG.VALID }}>
          {validFullNameMsg}
        </InputWarning>
      )}
    </>
  );
};

export default InputFullName;

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

    @media (max-width: 1024px) {
      font-size: 10px;
    }
    @media (max-width: 700px) {
      font-size: 8px;
    }
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
