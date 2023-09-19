import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  checkEmailPattern,
  checkFullNamePattern,
  checkPassWordPattern,
} from '@utils';
import Icon from '@components/Icon';
import { useFetchSignUp } from '@apis/auth';
import { useFetchUsers } from '@apis/user';
import { ANGOLA_STYLES } from '../../styles/commonStyles';
import { SignUpFailModal, SignUpSuccessModal } from './SignUpModals';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('init');
  const [password, setPassword] = useState('init');
  const [passwordConfirm, setPasswordConfirm] = useState('init');
  const [fullName, setFullName] = useState('in');
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
    const {
      passwordMsg,
      passwordConfirmMsg,
      isValidPassword,
      isValidPasswordConfirm,
    } = checkPassWordPattern({
      newPassWord: e.target.value,
      confirmNewPassWord: passwordConfirm,
    });
    setPassword(e.target.value);

    if (!e.target.value) {
      setInvalidPasswordMsg('비밀번호를 입력해주세요.');
    } else if (!isValidPassword) {
      setInvalidPasswordMsg(passwordMsg);
    } else {
      setInvalidPasswordMsg('');
    }
    if (!isValidPasswordConfirm) {
      setInvalidPasswordConfirmMsg(passwordConfirmMsg);
      setValidPasswordConfirmMsg('');
    } else {
      setValidPasswordConfirmMsg(passwordConfirmMsg);
      setInvalidPasswordConfirmMsg('');
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
            <Label>1. 이메일을 입력하세요.</Label>
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
            <Label>2. 비밀번호를 입력하세요.</Label>
            <InputWrapper>
              <Input
                type={isPasswordShown ? 'text' : 'password'}
                onChange={handleChangePassword}
                placeholder="5자리 이상 15자 이하 문자, 숫자, 특수문자로 입력해주세요."
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
            {invalidPasswordMsg && (
              <InputWarning style={{ marginBottom: '1rem' }}>
                {invalidPasswordMsg}
              </InputWarning>
            )}
            <InputWrapper>
              <Input
                type={isPasswordConfirmShown ? 'text' : 'password'}
                onChange={handleChangePasswordConfirm}
                placeholder="동일한 비밀번호를 다시 입력해주세요."
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
            <Label>3. 닉네임을 입력하세요.</Label>
            <InputContainer>
              <InputWrapper>
                <Input
                  onChange={handleChangeFullName}
                  placeholder="3자 이상 8자 이하의 닉네임을 지어주세요."
                />
                {isDuplicatedFullNameChecked && (
                  <DoubleCheckIcon>
                    <Icon
                      name={'double_check'}
                      color={'#78D968'}
                    />
                  </DoubleCheckIcon>
                )}
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
          <SubmitButton type="submit">가입 완료하기</SubmitButton>
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
  width: 100%;
  height: 100%;
  padding: 80px;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: ${ANGOLA_STYLES.textSize.title};
  line-height: 150%;
  padding-left: 1rem;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  width: 85%;
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

const DoubleCheckIcon = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(0, -50%);
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`;
