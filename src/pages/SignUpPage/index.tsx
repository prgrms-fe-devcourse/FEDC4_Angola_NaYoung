import { ChangeEvent, FormEvent, useState } from 'react';
import { BsCheckAll, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  checkEmailPattern,
  checkFullNamePattern,
  checkPassWordPattern,
} from '@utils';
import { useFetchSignUp } from '@apis/auth';
import { useFetchUsers } from '@apis/user';
import { SignUpFailModal, SignUpSuccessModal } from './SignUpModals';

const SignUpPage = () => {
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
  const { signUpMutate, isSignUpSuccess, isSignUpError } = useFetchSignUp();
  const { usersData, isUsersError } = useFetchUsers();

  const [invalidEmailMsg, setInvalidEmailMsg] = useState<string>('');
  const [validEmailMsg, setValidEmailMsg] = useState<string>('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState<string>('');
  const [invalidPasswordConfirmMsg, setInvalidPasswordConfirmMsg] =
    useState<string>('');
  const [validPasswordConfirmMsg, setValidPasswordConfirmMsg] =
    useState<string>('');
  const [invalidFullNameMsg, setInvalidFullNameMsg] = useState<string>('');
  const [validFullNameMsg, setValidFullNameMsg] = useState<string>('');

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsDuplicatedEmailChecked(false);
    setValidEmailMsg('');

    if (!e.target.value) {
      setInvalidEmailMsg('이메일을 입력해주세요.');
    }
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { passwordMsg: msg, isValidPassword } = checkPassWordPattern({
      newPassWord: e.target.value,
    });
    setPassword(e.target.value);

    if (!e.target.value) {
      setInvalidPasswordMsg('비밀번호를 입력해주세요.');
    } else if (!isValidPassword) {
      setInvalidPasswordMsg(msg);
    } else {
      setInvalidPasswordMsg('');
    }
  };
  const handleChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const { passwordConfirmMsg: msg, isValidPasswordConfirm } =
      checkPassWordPattern({
        newPassWord: password,
        confirmNewPassWord: e.target.value,
      });
    setPasswordConfirm(e.target.value);
    setValidPasswordConfirmMsg('');

    if (!isValidPasswordConfirm) {
      setInvalidPasswordConfirmMsg(msg);
    } else {
      setValidPasswordConfirmMsg(msg);
      setInvalidPasswordConfirmMsg('');
    }
  };
  const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setIsDuplicatedFullNameChecked(false);
    setValidFullNameMsg('');

    if (!e.target.value) {
      setInvalidFullNameMsg('닉네임을 입력해주세요.');
    }
  };

  const handleClickDuplicatedEmailCheckBtn = () => {
    const { isValidEmail, msg } = checkEmailPattern({ email, usersData });

    if (isUsersError || !usersData) {
      console.error('중복검사를 위해 유저 정보를 가져오는데 실패하였습니다.');
      return;
    }
    if (!isValidEmail) {
      setInvalidEmailMsg(msg);
    } else {
      setValidEmailMsg(msg);
      setInvalidEmailMsg('');
      setIsDuplicatedEmailChecked(true);
    }
  };

  const handleClickDuplicatedFullNameCheckBtn = () => {
    const { isValidFullName, msg } = checkFullNamePattern({
      fullName,
      usersData,
    });

    if (isUsersError || !usersData) {
      console.error('중복검사를 위해 유저 정보를 가져오는데 실패하였습니다.');
      return;
    }
    if (!isValidFullName) {
      setInvalidFullNameMsg(msg);
    } else {
      setValidFullNameMsg(msg);
      setInvalidFullNameMsg('');
      setIsDuplicatedFullNameChecked(true);
    }
  };

  const handleClickPasswordShown = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  const handleClickPasswordConfirmShown = () => {
    setIsPasswordConfirmShown(!isPasswordConfirmShown);
  };

  const handleSubmit = (e: FormEvent) => {
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

    signUpMutate({
      email,
      password,
      fullName,
    });
  };

  return (
    <>
      <SignUpContainer>
        <Form onSubmit={handleSubmit}>
          <Wrapper>
            <Label>1. 이메일을 입력해주세요.</Label>
            <InputContainer>
              <InputWrapper>
                <Input onChange={handleChangeEmail} />
                {isDuplicatedEmailChecked && <DoubleCheckIcon />}
              </InputWrapper>
              <DuplicatedCheckBtn
                type="button"
                onClick={handleClickDuplicatedEmailCheckBtn}>
                중복 검사
              </DuplicatedCheckBtn>
            </InputContainer>
            {invalidEmailMsg && <InputWarning>{invalidEmailMsg}</InputWarning>}
            {validEmailMsg && (
              <InputWarning style={{ color: '#78D968' }}>
                {validEmailMsg}
              </InputWarning>
            )}
          </Wrapper>
          <Wrapper>
            <Label>2. 비밀번호를 입력하세요</Label>
            <InputWrapper>
              <Input
                type={isPasswordShown ? 'text' : 'password'}
                onChange={handleChangePassword}
              />
              {isPasswordShown ? (
                <VisibleEyeIcon onClick={handleClickPasswordShown} />
              ) : (
                <InvisibleEyeIcon onClick={handleClickPasswordShown} />
              )}
              {invalidPasswordMsg && (
                <InputWarning>{invalidPasswordMsg}</InputWarning>
              )}
            </InputWrapper>
            <InputWrapper>
              <Input
                type={isPasswordConfirmShown ? 'text' : 'password'}
                onChange={handleChangePasswordConfirm}
              />
              {isPasswordConfirmShown ? (
                <VisibleEyeIcon onClick={handleClickPasswordConfirmShown} />
              ) : (
                <InvisibleEyeIcon onClick={handleClickPasswordConfirmShown} />
              )}
            </InputWrapper>
            {invalidPasswordConfirmMsg && (
              <InputWarning>{invalidPasswordConfirmMsg}</InputWarning>
            )}
            {validPasswordConfirmMsg && (
              <InputWarning style={{ color: '#78D968' }}>
                {validPasswordConfirmMsg}
              </InputWarning>
            )}
          </Wrapper>
          <Wrapper>
            <Label>3. 닉네임을 입력하세요</Label>
            <InputContainer>
              <InputWrapper>
                <Input onChange={handleChangeFullName} />
                {isDuplicatedFullNameChecked && <DoubleCheckIcon />}
              </InputWrapper>
              <DuplicatedCheckBtn
                type="button"
                onClick={handleClickDuplicatedFullNameCheckBtn}>
                중복 검사
              </DuplicatedCheckBtn>
            </InputContainer>
            {invalidFullNameMsg && (
              <InputWarning>{invalidFullNameMsg}</InputWarning>
            )}
            {validFullNameMsg && (
              <InputWarning style={{ color: '#78D968' }}>
                {validFullNameMsg}
              </InputWarning>
            )}
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

export default SignUpPage;

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
  padding-left: 1rem;
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
  fill: #78d968;
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
