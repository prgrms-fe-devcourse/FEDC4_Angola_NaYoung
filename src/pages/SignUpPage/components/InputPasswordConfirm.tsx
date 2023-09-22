import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { COLOR, INPUT } from '../constants';

interface InputPasswordConfirmProps {
  isPasswordConfirmShown: boolean;
  handleChangePasswordConfirm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickPasswordConfirmShown: VoidFunction;
  invalidPasswordConfirmMsg: string;
  validPasswordConfirmMsg: string;
}

const InputPasswordConfirm = ({
  isPasswordConfirmShown,
  handleChangePasswordConfirm,
  handleClickPasswordConfirmShown,
  invalidPasswordConfirmMsg,
  validPasswordConfirmMsg,
}: InputPasswordConfirmProps) => {
  return (
    <>
      <InputContainer>
        <InputWrapper>
          <Input
            type={
              isPasswordConfirmShown ? INPUT.TYPE.TEXT : INPUT.TYPE.PASSWORD
            }
            onChange={handleChangePasswordConfirm}
            placeholder={INPUT.PLACEHOLDER.PASSWORD_CONFIRM}
            autoComplete={INPUT.AUTO_COMPLETE}
          />
          {isPasswordConfirmShown ? (
            <EyeIcon onClick={handleClickPasswordConfirmShown}>
              <Icon name={'eye'} />
            </EyeIcon>
          ) : (
            <EyeIcon onClick={handleClickPasswordConfirmShown}>
              <Icon name={'eye_slash'} />
            </EyeIcon>
          )}
        </InputWrapper>
        <div style={{ width: '100px' }}></div>
      </InputContainer>
      {invalidPasswordConfirmMsg && (
        <InputWarning>
          <Icon
            name={'warn'}
            color={COLOR.ICON.WARN}
          />
          {invalidPasswordConfirmMsg}
        </InputWarning>
      )}
      {validPasswordConfirmMsg && (
        <InputWarning style={{ color: COLOR.MSG.VALID }}>
          {validPasswordConfirmMsg}
        </InputWarning>
      )}
    </>
  );
};

export default InputPasswordConfirm;

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

const EyeIcon = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
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
  }
`;
