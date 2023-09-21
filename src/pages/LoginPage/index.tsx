import { ChangeEvent, FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@components/Button';
import { useFetchLogin } from '@apis/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';

const LoginPage = () => {
  const [email, setEmail] = useState('init');
  const [password, setPassword] = useState('init');
  const { loginMutate, isLoginError, isLoginSuccess } = useFetchLogin();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || email === 'init' || !password || password === 'init') {
      return;
    }

    loginMutate({
      email,
      password,
    });
  };
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
            <Label>이메일</Label>
            <InputStyled onChange={handleChangeEmail} />
            {!email && <InputWarning>이메일을 입력하세요.</InputWarning>}
          </Wrapper>
          <Wrapper>
            <Label>비밀번호</Label>
            <InputStyled
              onChange={handleChangePassword}
              type={'password'}
            />
            {!password && <InputWarning>비밀번호를 입력하세요.</InputWarning>}
          </Wrapper>
          <LoginErrorMsg style={{ display: isLoginError ? `block` : 'none' }}>
            아이디 또는 비밀번호를 확인하세요.
          </LoginErrorMsg>
          <Button
            type="submit"
            size="md"
            style={{
              width: '150px',
              fontSize: ANGOLA_STYLES.textSize.title,
            }}
            disabled={
              email && password && email !== 'init' && password !== 'init'
                ? false
                : true
            }>
            로그인 하기
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
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const LoginErrorMsg = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  color: #f66;
`;
