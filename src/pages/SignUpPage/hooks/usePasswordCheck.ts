import { ChangeEvent, useState } from 'react';
import { checkPassWordPattern } from '@utils';
import { MSG, SIGNUP_INITIAL_VALUE } from '../constants';

const usePasswordCheck = () => {
  const [password, setPassword] = useState<string>(
    SIGNUP_INITIAL_VALUE.PASSWORD,
  );
  const [passwordConfirm, setPasswordConfirm] = useState<string>(
    SIGNUP_INITIAL_VALUE.PASSWORD,
  );
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState<string>('');
  const [invalidPasswordConfirmMsg, setInvalidPasswordConfirmMsg] =
    useState<string>('');
  const [validPasswordConfirmMsg, setValidPasswordConfirmMsg] =
    useState<string>('');

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    const {
      passwordMsg,
      passwordConfirmMsg,
      isValidPassword,
      isValidPasswordConfirm,
    } = checkPassWordPattern({
      newPassWord: passwordValue,
      confirmNewPassWord: passwordConfirm,
    });
    setPassword(passwordValue);

    if (!passwordValue) {
      setInvalidPasswordMsg(MSG.WARNING.EMPTY.PASSWORD);
    } else if (!isValidPassword) {
      setInvalidPasswordMsg(passwordMsg);
    } else {
      setInvalidPasswordMsg('');
    }

    if (passwordConfirm == SIGNUP_INITIAL_VALUE.PASSWORD || !passwordConfirm) {
      return;
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
    const passwordConfirmValue = e.target.value;
    const { passwordConfirmMsg: msg, isValidPasswordConfirm } =
      checkPassWordPattern({
        newPassWord: password,
        confirmNewPassWord: passwordConfirmValue,
      });
    setPasswordConfirm(passwordConfirmValue);
    setValidPasswordConfirmMsg('');

    if (!passwordConfirmValue) {
      setInvalidPasswordConfirmMsg('');
    } else if (!isValidPasswordConfirm) {
      setInvalidPasswordConfirmMsg(msg);
    } else {
      setValidPasswordConfirmMsg(msg);
      setInvalidPasswordConfirmMsg('');
    }
  };

  return {
    password,
    passwordConfirm,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    validPasswordConfirmMsg,
    handleChangePassword,
    handleChangePasswordConfirm,
  };
};

export default usePasswordCheck;
