import { ChangeEvent, FormEvent, useState } from 'react';
import { BsCheckAll, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useFetchSignUp } from '@apis/auth';
import { useFetchUsers } from '@apis/user';
import { SignUpFailModal, SignUpSuccessModal } from './SignUpModals';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('initial');
  const [password, setPassword] = useState('initial');
  const [passwordConfirm, setPasswordConfirm] = useState('initial');
  const [fullName, setFullName] = useState('initial');
  const [isDuplicatedEmailChecked, setIsDuplicatedEmailChecked] =
    useState(false);
  const [isDuplicatedFullNameChecked, setIsDuplicatedFullNameChecked] =
    useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(false);
  const { signUp, isSignUpSuccess, isSignUpError } = useFetchSignUp();
  const { usersData, isUsersError } = useFetchUsers();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsDuplicatedEmailChecked(false);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };
  const onChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setIsDuplicatedFullNameChecked(false);
  };

  const onClickDuplicatedEmailCheckBtn = () => {
    if (isUsersError || !usersData) {
      console.error('중복검사를 위해 유저 정보를 가져오는데 실패하였습니다.');
      return;
    }
    if (email.length < 10) {
      alert('이메일은 10자 이상 입력해주세요.');
      return;
    }
    if (usersData.find((user) => user.email === email)) {
      alert('이미 가입된 이메일입니다.');
    } else {
      alert('사용할 수 있는 이메일입니다.');
      setIsDuplicatedEmailChecked(true);
    }
  };

  const onClickDuplicatedFullNameCheckBtn = () => {
    if (isUsersError || !usersData) {
      console.error('중복검사를 위해 유저 정보를 가져오는데 실패하였습니다.');
      return;
    }
    if (fullName.length < 3 || fullName.length > 10 || fullName == 'initial') {
      alert('닉네임은 3자 이상 10자 이하로 입력해주세요.');
      return;
    }
    if (usersData.find((user) => user.fullName === fullName)) {
      alert('이미 가입된 닉네임입니다.');
    } else {
      alert('사용할 수 있는 닉네임입니다.');
      setIsDuplicatedFullNameChecked(true);
    }
  };

  const onClickPasswordShown = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  const onClickPasswordConfirmShown = () => {
    setIsPasswordConfirmShown(!isPasswordConfirmShown);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isSignUpError) {
      window.location.reload();
      return;
    }
    if (isSignUpSuccess) {
      navigate('/login');
      return;
    }

    if (isDuplicatedEmailChecked === false) {
      alert('이메일 중복 검사를 확인해주세요.');
      return;
    }
    if (!password || password === 'initial') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 서로 다릅니다.');
      return;
    }
    if (isDuplicatedFullNameChecked === false) {
      alert('닉네임 중복 검사를 확인해주세요.');
      return;
    }

    signUp({
      email,
      password,
      fullName,
    });
  };

  return (
    <>
      <SignUpContainer>
        <Form onSubmit={onSubmit}>
          <Wrapper>
            <Label>1. 이메일을 입력해주세요.</Label>
            <InputContainer>
              <InputWrapper>
                <Input onChange={onChangeEmail} />
                {isDuplicatedEmailChecked && <DoubleCheckIcon />}
              </InputWrapper>
              <DuplicatedCheckBtn
                type="button"
                onClick={onClickDuplicatedEmailCheckBtn}>
                중복 검사
              </DuplicatedCheckBtn>
            </InputContainer>
            <InputWarning style={{ display: email ? `none` : 'block' }}>
              이메일을 입력해주세요.
            </InputWarning>
          </Wrapper>
          <Wrapper>
            <Label>2. 비밀번호를 입력하세요</Label>
            <InputWrapper>
              <Input
                type={isPasswordShown ? 'text' : 'password'}
                onChange={onChangePassword}
              />
              {isPasswordShown ? (
                <VisibleEyeIcon onClick={onClickPasswordShown} />
              ) : (
                <InvisibleEyeIcon onClick={onClickPasswordShown} />
              )}
            </InputWrapper>
            <InputWarning style={{ display: password ? `none` : 'block' }}>
              비밀번호를 입력해주세요.
            </InputWarning>
            <InputWrapper>
              <Input
                type={isPasswordConfirmShown ? 'text' : 'password'}
                onChange={onChangePasswordConfirm}
              />
              {isPasswordConfirmShown ? (
                <VisibleEyeIcon onClick={onClickPasswordConfirmShown} />
              ) : (
                <InvisibleEyeIcon onClick={onClickPasswordConfirmShown} />
              )}
            </InputWrapper>
            <InputWarning
              style={{ display: passwordConfirm ? `none` : 'block' }}>
              비밀번호를 재입력해주세요.
            </InputWarning>
          </Wrapper>
          <Wrapper>
            <Label>3. 닉네임을 입력하세요</Label>
            <InputContainer>
              <InputWrapper>
                <Input onChange={onChangeFullName} />
                {isDuplicatedFullNameChecked && <DoubleCheckIcon />}
              </InputWrapper>
              <DuplicatedCheckBtn
                type="button"
                onClick={onClickDuplicatedFullNameCheckBtn}>
                중복 검사
              </DuplicatedCheckBtn>
            </InputContainer>
            <InputWarning style={{ display: fullName ? `none` : 'block' }}>
              닉네임을 입력해주세요.
            </InputWarning>
          </Wrapper>
          <SubmitButton type="submit">가입하기</SubmitButton>
        </Form>
        {isSignUpSuccess && (
          <SignUpSuccessModal onClick={() => navigate('/login')} />
        )}
        {isSignUpError && (
          <SignUpFailModal onClick={() => window.location.reload()} />
        )}
      </SignUpContainer>
    </>
  );
};

export default SignUp;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Form = styled.form`
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border: 3px solid black;
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`;

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 500;
  line-height: 150%;
  padding-left: 1rem;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const InputWrapper = styled.div`
  width: 70%;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.4rem 1rem;
  border: 1.5px solid gray;
  border-radius: 4rem;
  box-sizing: border-box;
  font-size: 18px;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 2px solid black;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  color: red;
  background-color: #47e1a8;

  &:hover {
    background-color: rgba(90, 120, 100, 0.4);
    cursor: pointer;
  }
`;

const InputWarning = styled.div`
  font-size: 15px;
  color: red;
  padding-left: 2rem;
`;

const DuplicatedCheckBtn = styled.button`
  padding: 0.4rem 1rem;
  border: 1px solid black;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    background-color: rgba(90, 120, 100, 0.4);
    cursor: pointer;
  }
`;

const DoubleCheckIcon = styled(BsCheckAll)`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(0, -50%);
  color: #00e676;
`;

const VisibleEyeIcon = styled(BsFillEyeFill)`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`;

const InvisibleEyeIcon = styled(BsFillEyeSlashFill)`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`;
