import { useEffect, useState } from 'react';
import { SIGNUP_INITIAL_VALUE } from '../constants';

interface useAllValidationPassProps {
  isDuplicatedEmailChecked: boolean;
  isDuplicatedFullNameChecked: boolean;
  invalidPasswordMsg: string;
  invalidPasswordConfirmMsg: string;
  password: string;
  passwordConfirm: string;
}

const useAllValidationPass = ({
  isDuplicatedEmailChecked,
  isDuplicatedFullNameChecked,
  invalidPasswordMsg,
  invalidPasswordConfirmMsg,
  password,
  passwordConfirm,
}: useAllValidationPassProps) => {
  const [isAllPassed, setIsAllPassed] = useState<boolean>(false);

  useEffect(() => {
    setIsAllPassed(
      isDuplicatedEmailChecked &&
        isDuplicatedFullNameChecked &&
        password !== SIGNUP_INITIAL_VALUE.PASSWORD &&
        passwordConfirm !== SIGNUP_INITIAL_VALUE.PASSWORD &&
        !invalidPasswordMsg &&
        !invalidPasswordConfirmMsg,
    );
  }, [
    isDuplicatedEmailChecked,
    isDuplicatedFullNameChecked,
    password,
    passwordConfirm,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
  ]);

  return { isAllPassed };
};

export default useAllValidationPass;
