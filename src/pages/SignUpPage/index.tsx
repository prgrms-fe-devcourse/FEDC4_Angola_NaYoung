import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import {
  InputEmail,
  InputFullName,
  InputPassword,
  InputPasswordConfirm,
} from './components';
import {
  CheckEmailModal,
  CheckFullNameModal,
  CheckPasswordModal,
  SignUpFailModal,
  SignUpSuccessModal,
} from './components/Modals';
import { BUTTON, INPUT } from './constants';
import {
  useAllValidationPass,
  useClickEye,
  useEmailCheck,
  useFullNameCheck,
  usePasswordCheck,
  useSubmit,
} from './hooks';

const SignUpPage = () => {
  const myId = useRecoilValue(authInfoState)?.userId;
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    email,
    isDuplicatedEmailChecked,
    validEmailMsg,
    invalidEmailMsg,
    handleChangeEmail,
    handleClickDuplicatedEmailCheckBtn,
  } = useEmailCheck({ setIsSubmitted });

  const {
    fullName,
    isDuplicatedFullNameChecked,
    validFullNameMsg,
    invalidFullNameMsg,
    handleChangeFullName,
    handleClickDuplicatedFullNameCheckBtn,
  } = useFullNameCheck({ setIsSubmitted });

  const {
    password,
    passwordConfirm,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    validPasswordConfirmMsg,
    handleChangePassword,
    handleChangePasswordConfirm,
  } = usePasswordCheck();

  const {
    isPasswordShown,
    isPasswordConfirmShown,
    handleClickPasswordShown,
    handleClickPasswordConfirmShown,
  } = useClickEye();

  const { isAllPassed } = useAllValidationPass({
    isDuplicatedEmailChecked,
    isDuplicatedFullNameChecked,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    password,
    passwordConfirm,
  });

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
    <SignUpContainer>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Label>{INPUT.LABEL.EMAIL}</Label>
          <InputEmail
            handleChangeEmail={handleChangeEmail}
            handleClickDuplicatedEmailCheckBtn={
              handleClickDuplicatedEmailCheckBtn
            }
            isDuplicatedEmailChecked={isDuplicatedEmailChecked}
            invalidEmailMsg={invalidEmailMsg}
            validEmailMsg={validEmailMsg}
          />
        </Wrapper>
        <Wrapper>
          <Label>{INPUT.LABEL.PASSWORD}</Label>
          <InputPassword
            isPasswordShown={isPasswordShown}
            handleChangePassword={handleChangePassword}
            handleClickPasswordShown={handleClickPasswordShown}
            invalidPasswordMsg={invalidPasswordMsg}
          />
          <InputPasswordConfirm
            isPasswordConfirmShown={isPasswordConfirmShown}
            handleChangePasswordConfirm={handleChangePasswordConfirm}
            handleClickPasswordConfirmShown={handleClickPasswordConfirmShown}
            invalidPasswordConfirmMsg={invalidPasswordConfirmMsg}
            validPasswordConfirmMsg={validPasswordConfirmMsg}
          />
        </Wrapper>
        <Wrapper>
          <Label>{INPUT.LABEL.FULL_NAME}</Label>
          <InputFullName
            handleChangeFullName={handleChangeFullName}
            isDuplicatedFullNameChecked={isDuplicatedFullNameChecked}
            handleClickDuplicatedFullNameCheckBtn={
              handleClickDuplicatedFullNameCheckBtn
            }
            invalidFullNameMsg={invalidFullNameMsg}
            validFullNameMsg={validFullNameMsg}
          />
        </Wrapper>
        <Button
          type="submit"
          size="md"
          style={{
            width: '150px',
            fontSize: ANGOLA_STYLES.textSize.title,
          }}
          disabled={isSignUpDisabled}>
          {BUTTON.SIGN_UP}
        </Button>
      </Form>
      {isSignUpSuccess && (
        <SignUpSuccessModal onClick={() => navigate('/login')} />
      )}
      {isSignUpError && (
        <SignUpFailModal onClick={() => window.location.reload()} />
      )}
      {isSubmitted && (
        <>
          {!isDuplicatedEmailChecked ? (
            <CheckEmailModal onClick={() => setIsSubmitted(false)} />
          ) : (
            <>
              {(invalidPasswordMsg || invalidPasswordConfirmMsg) && (
                <CheckPasswordModal onClick={() => setIsSubmitted(false)} />
              )}
              {!(invalidPasswordMsg || invalidPasswordConfirmMsg) &&
                !isDuplicatedFullNameChecked && (
                  <CheckFullNameModal onClick={() => setIsSubmitted(false)} />
                )}
            </>
          )}
        </>
      )}
      {myId && !isSignUpSuccess && <Navigate to="/" />}
    </SignUpContainer>
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

  @media only screen and (max-width: 1024px) {
    padding: 0px;
  }

  @media only screen and (max-width: 700px) {
    height: auto;
    padding: 0px;
    padding-bottom: 30px;
  }

  @media only screen and (max-width: 400px) {
    width: calc(100% + 80px);
    margin: -32px -40px 0 -40px;
    padding-top: 30px;
  }

  @media only screen and (min-width: 1024px) and (max-height: 800px) {
    height: auto;
    padding-bottom: 30px;
  }
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

  @media screen and (max-width: 1024px) {
    width: 80%;
  }
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`;

const Label = styled.label`
  font-size: ${ANGOLA_STYLES.textSize.title};
  line-height: 150%;
  padding-left: 1rem;

  @media screen and (max-width: 700px) {
    text-align: center;
    padding-left: 0px;
    font-size: ${ANGOLA_STYLES.textSize.titleSm};
  }

  @media screen and (max-width: 320px) {
    font-size: ${ANGOLA_STYLES.textSize.text};
  }
`;
