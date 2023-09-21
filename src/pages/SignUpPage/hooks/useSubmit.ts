import { Dispatch, FormEvent, SetStateAction } from 'react';
import { useFetchSignUp } from '@apis/auth';

interface useSubmitProps {
  email: string;
  password: string;
  fullName: string;
  isAllPassed: boolean;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

const useSubmit = ({
  email,
  password,
  fullName,
  isAllPassed,
  setIsSubmitted,
}: useSubmitProps) => {
  const { signUpMutate, isSignUpSuccess, isSignUpError } = useFetchSignUp();

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

  return { handleSubmit, isSignUpError, isSignUpSuccess };
};

export default useSubmit;
