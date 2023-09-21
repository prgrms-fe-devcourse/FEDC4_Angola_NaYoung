import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import {
  CheckEmailModal,
  CheckFullNameModal,
  CheckPasswordModal,
  SignUpFailModal,
  SignUpSuccessModal,
} from './Modals';
import { InputEmail, InputEmailMsg, InputPassword } from './components';
import {
  useAllValidationPass,
  useClickEye,
  useEmailCheck,
  useFullNameCheck,
  usePasswordCheck,
  useSubmit,
} from './hooks';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // email 이벤트 & 유효성 검사 hook
  const {
    email,
    isDuplicatedEmailChecked,
    validEmailMsg,
    invalidEmailMsg,
    handleChangeEmail,
    handleClickDuplicatedEmailCheckBtn,
  } = useEmailCheck({ setIsSubmitted });

  // fullName 이벤트 & 유효성 검사 hook
  const {
    fullName,
    isDuplicatedFullNameChecked,
    validFullNameMsg,
    invalidFullNameMsg,
    handleChangeFullName,
    handleClickDuplicatedFullNameCheckBtn,
  } = useFullNameCheck({ setIsSubmitted });

  // password 이벤트 & 유효성 검사 hook
  const {
    password,
    passwordConfirm,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    validPasswordConfirmMsg,
    handleChangePassword,
    handleChangePasswordConfirm,
  } = usePasswordCheck();

  // password 보이기/안보이기 hook
  const {
    isPasswordShown,
    isPasswordConfirmShown,
    handleClickPasswordShown,
    handleClickPasswordConfirmShown,
  } = useClickEye();

  // 모든 유효성 검사 통과 여부 hook
  const { isAllPassed } = useAllValidationPass({
    isDuplicatedEmailChecked,
    isDuplicatedFullNameChecked,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    password,
    passwordConfirm,
  });

  // SignUp 처리 hook
  const { isSignUpDisabled, handleSubmit, isSignUpError, isSignUpSuccess } =
    useSubmit({
      email,
      password,
      passwordConfirm,
      fullName,
      isAllPassed,
      setIsSubmitted,
    });

  return (
    <>
      <SignUpContainer>
        <Form onSubmit={handleSubmit}>
          <Wrapper>
            <Label>1. 이메일을 입력하세요.</Label>
            <InputEmail
              handleChangeEmail={handleChangeEmail}
              handleClickDuplicatedEmailCheckBtn={
                handleClickDuplicatedEmailCheckBtn
              }
              isDuplicatedEmailChecked={isDuplicatedEmailChecked}
            />
            <InputEmailMsg
              invalidEmailMsg={invalidEmailMsg}
              validEmailMsg={validEmailMsg}
            />
          </Wrapper>
          <Wrapper>
            <Label>2. 비밀번호를 입력하세요.</Label>
            <InputPassword
              isPasswordShown={isPasswordShown}
              handleChangePassword={handleChangePassword}
              handleClickPasswordShown={handleClickPasswordShown}
              invalidPasswordMsg={invalidPasswordMsg}
            />
            <InputWrapper>
              <Input
                type={isPasswordConfirmShown ? 'text' : 'password'}
                onChange={handleChangePasswordConfirm}
                placeholder="동일한 비밀번호를 다시 입력해주세요."
                autoComplete="on"
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
              <InputWarning>
                <Icon
                  name={'warn'}
                  color={'#F66'}
                />
                {invalidPasswordConfirmMsg}
              </InputWarning>
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
              <Button
                type="button"
                onClick={handleClickDuplicatedFullNameCheckBtn}
                style={{
                  width: '100px',
                  padding: '0',
                  fontSize: ANGOLA_STYLES.textSize.titleSm,
                }}>
                중복 검사
              </Button>
            </InputContainer>
            {invalidFullNameMsg && (
              <InputWarning>
                <Icon
                  name={'warn'}
                  color={'#F66'}
                />
                {invalidFullNameMsg}
              </InputWarning>
            )}
            {validFullNameMsg && (
              <InputWarning style={{ color: '#78D968' }}>
                {validFullNameMsg}
              </InputWarning>
            )}
          </Wrapper>
          <Button
            type="submit"
            size="md"
            style={{
              width: '150px',
              fontSize: ANGOLA_STYLES.textSize.title,
            }}
            disabled={isSignUpDisabled}>
            가입 완료하기
          </Button>
        </Form>
        {isSignUpSuccess && (
          <SignUpSuccessModal onClick={() => navigate('/login')} />
        )}
        {isSignUpError && (
          <SignUpFailModal onClick={() => window.location.reload()} />
        )}
        {isSubmitted && !isDuplicatedEmailChecked && (
          <CheckEmailModal onClick={() => setIsSubmitted(false)} />
        )}
        {isSubmitted &&
          isDuplicatedEmailChecked &&
          (invalidPasswordMsg || invalidPasswordConfirmMsg) && (
            <CheckPasswordModal onClick={() => setIsSubmitted(false)} />
          )}
        {isSubmitted &&
          isDuplicatedEmailChecked &&
          !(invalidPasswordMsg || invalidPasswordConfirmMsg) &&
          !isDuplicatedFullNameChecked && (
            <CheckFullNameModal onClick={() => setIsSubmitted(false)} />
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
  padding-right: 0px;
  margin-left: 20px;
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

const InputWarning = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #f66;
  padding-left: 1rem;
  gap: 8px;
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
