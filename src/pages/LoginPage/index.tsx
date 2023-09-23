import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@components/Button';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { LABEL, LOGIN_BUTTON_MSG, MSG } from './constants';
import { useLogin } from './hooks';
import { isLoginButtonActive } from './utils';

const LoginPage = () => {
  const {
    email,
    password,
    isLoginError,
    isLoginSuccess,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  } = useLogin({ isLoginButtonActive });

  return (
    <>
      <LoginContainer>
        <Form onSubmit={handleSubmit}>
          <img
            src="/images/LOGO_FULL.svg"
            alt="logo"
            width={'200px'}
          />
          <Wrapper>
            <Label>{LABEL.EMAIL}</Label>
            <InputStyled onChange={handleChangeEmail} />
            {!email && <InputWarning>{MSG.WARNING.EMAIL}</InputWarning>}
          </Wrapper>
          <Wrapper>
            <Label>{LABEL.PASSWORD}</Label>
            <InputStyled
              onChange={handleChangePassword}
              type={'password'}
            />
            {!password && <InputWarning>{MSG.WARNING.PASSWORD}</InputWarning>}
          </Wrapper>
          <LoginErrorMsg isLoginError={isLoginError}>{MSG.ERROR}</LoginErrorMsg>
          <Button
            type="submit"
            size="md"
            style={{
              width: '150px',
              fontSize: ANGOLA_STYLES.textSize.title,
            }}
            disabled={isLoginButtonActive({ email, password }) ? false : true}>
            {LOGIN_BUTTON_MSG}
          </Button>
        </Form>
        {isLoginSuccess && <Navigate to="/" />}
      </LoginContainer>
    </>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 80px;

  @media screen and (max-width: 700px) {
    padding: 40px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const Wrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (max-width: 700px) {
    width: 90%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: ${ANGOLA_STYLES.textSize.title};
  line-height: 150%;
  padding-left: 8px;
`;

const InputStyled = styled.input`
  width: 100%;
  padding: 12px 16px 4px 16px;
  border: ${ANGOLA_STYLES.border.default};
  border-radius: 40px;
  box-sizing: border-box;
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  font-size: ${ANGOLA_STYLES.textSize.title};

  &:focus {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const InputWarning = styled.div`
  display: flex;
  align-items: center;
  font-size: ${ANGOLA_STYLES.textSize.text};
  color: #f66;
  padding-left: 1rem;
  gap: 8px;
`;

const LoginErrorMsg = styled.div<{ isLoginError: boolean }>`
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  color: #f66;

  display: ${({ isLoginError }) => (isLoginError ? 'block' : 'none')};
`;
