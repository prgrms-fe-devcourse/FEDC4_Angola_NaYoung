import { ChangeEvent } from 'react';
import { Icon } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { COLOR, INPUT } from '../constants';

interface InputPasswordProps {
  isPasswordShown: boolean;
  handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickPasswordShown: VoidFunction;
  invalidPasswordMsg: string;
}

const InputPassword = ({
  isPasswordShown,
  handleChangePassword,
  handleClickPasswordShown,
  invalidPasswordMsg,
}: InputPasswordProps) => {
  return (
    <>
      <InputContainer>
        <InputWrapper>
          <Input
            type={isPasswordShown ? INPUT.TYPE.TEXT : INPUT.TYPE.PASSWORD}
            onChange={handleChangePassword}
            placeholder={INPUT.PLACEHOLDER.PASSWORD}
            autoComplete={INPUT.AUTO_COMPLETE}
          />
          {isPasswordShown ? (
            <EyeIcon onClick={handleClickPasswordShown}>
              <Icon name={'eye'} />
            </EyeIcon>
          ) : (
            <EyeIcon onClick={handleClickPasswordShown}>
              <Icon name={'eye_slash'} />
            </EyeIcon>
          )}
        </InputWrapper>
        <div style={{ width: '100px' }}></div>
      </InputContainer>
      {invalidPasswordMsg && (
        <InputWarning style={{ marginBottom: '1rem' }}>
          <Icon
            name={'warn'}
            color={COLOR.ICON.WARN}
          />
          {invalidPasswordMsg}
        </InputWarning>
      )}
    </>
  );
};

export default InputPassword;

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
