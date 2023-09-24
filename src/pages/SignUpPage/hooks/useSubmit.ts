import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useFetchSignUp } from '@apis/auth';

interface useSubmitProps {
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  isAllPassed: boolean;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

const useSubmit = ({
  email,
  password,
  passwordConfirm,
  fullName,
  isAllPassed,
  setIsSubmitted,
}: useSubmitProps) => {
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
  const { signUpMutate, isSignUpSuccess, isSignUpError } = useFetchSignUp();

  useEffect(() => {
    email.length > 5 &&
    password.length > 4 &&
    password.length < 16 &&
    passwordConfirm.length > 4 &&
    passwordConfirm.length < 16 &&
    fullName.length > 2 &&
    fullName.length < 9
      ? setIsSignUpDisabled(false)
      : setIsSignUpDisabled(true);
  }, [email, password, passwordConfirm, fullName]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    isAllPassed &&
      signUpMutate({
        email,
        password,
        fullName,
      });
  };

  return { isSignUpDisabled, handleSubmit, isSignUpError, isSignUpSuccess };
};

export default useSubmit;
