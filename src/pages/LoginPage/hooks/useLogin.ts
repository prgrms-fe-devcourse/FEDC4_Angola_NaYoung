import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useFetchLogin } from '@apis/auth';
import { LOGIN_INITIAL_VALUE } from '../constants';

interface useLoginProps {
  isLoginButtonActive: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => boolean;
}

const useLogin = ({ isLoginButtonActive }: useLoginProps) => {
  const [email, setEmail] = useState(LOGIN_INITIAL_VALUE);
  const [password, setPassword] = useState(LOGIN_INITIAL_VALUE);
  const { loginMutate, isLoginError, isLoginSuccess } = useFetchLogin();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    isLoginButtonActive({ email, password }) &&
      loginMutate({
        email,
        password,
      });
  };

  return {
    email,
    password,
    isLoginError,
    isLoginSuccess,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  };
};

export default useLogin;
