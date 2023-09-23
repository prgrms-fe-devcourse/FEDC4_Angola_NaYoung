import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { checkEmailPattern } from '@utils';
import { useFetchUsers } from '@apis/user';
import { MSG, SIGNUP_INITIAL_VALUE } from '../constants';

interface useEmailCheckProps {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

const useEmailCheck = ({ setIsSubmitted }: useEmailCheckProps) => {
  const [email, setEmail] = useState(SIGNUP_INITIAL_VALUE.EMAIL);
  const [isDuplicatedEmailChecked, setIsDuplicatedEmailChecked] =
    useState<boolean>(false);
  const [validEmailMsg, setValidEmailMsg] = useState<string>('');
  const [invalidEmailMsg, setInvalidEmailMsg] = useState<string>('');
  const { usersData, isUsersError } = useFetchUsers();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsDuplicatedEmailChecked(false);
    setValidEmailMsg('');
    setIsSubmitted(false);

    if (!e.target.value) {
      setInvalidEmailMsg(MSG.WARNING.EMPTY.EMAIL);
    } else {
      setInvalidEmailMsg('');
    }
  };

  const handleClickDuplicatedEmailCheckBtn = () => {
    const { isValidEmail, msg } = checkEmailPattern({ email, usersData });

    if (isUsersError || !usersData) {
      console.error(MSG.ERROR.DUPLICATE_CHECK);
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

  return {
    email,
    isDuplicatedEmailChecked,
    validEmailMsg,
    invalidEmailMsg,
    handleChangeEmail,
    handleClickDuplicatedEmailCheckBtn,
  };
};

export default useEmailCheck;
