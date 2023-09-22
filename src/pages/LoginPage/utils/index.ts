import { LOGIN_INITIAL_VALUE } from '../constants';

interface isLoginButtonActiveProps {
  email: string;
  password: string;
}

export const isLoginButtonActive = ({
  email,
  password,
}: isLoginButtonActiveProps): boolean => {
  if (
    email &&
    password &&
    email !== LOGIN_INITIAL_VALUE &&
    password !== LOGIN_INITIAL_VALUE
  ) {
    return true;
  }
  return false;
};
