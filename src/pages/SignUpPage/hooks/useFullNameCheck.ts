import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { checkFullNamePattern } from '@utils';
import { useFetchUsers } from '@apis/user';
import { MSG, SIGNUP_INITIAL_VALUE } from '../constants';

interface useFullNameCheckProps {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

const useFullNameCheck = ({ setIsSubmitted }: useFullNameCheckProps) => {
  const [fullName, setFullName] = useState<string>(
    SIGNUP_INITIAL_VALUE.FULLNAME,
  );
  const [isDuplicatedFullNameChecked, setIsDuplicatedFullNameChecked] =
    useState<boolean>(false);
  const [validFullNameMsg, setValidFullNameMsg] = useState<string>('');
  const [invalidFullNameMsg, setInvalidFullNameMsg] = useState<string>('');
  const { usersData, isUsersError } = useFetchUsers();

  const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setIsDuplicatedFullNameChecked(false);
    setValidFullNameMsg('');
    setIsSubmitted(false);

    if (!e.target.value) {
      setInvalidFullNameMsg(MSG.WARNING.EMPTY.FULLNAME);
    } else {
      setInvalidFullNameMsg('');
    }
  };

  const handleClickDuplicatedFullNameCheckBtn = () => {
    const { isValidFullName, msg } = checkFullNamePattern({
      fullName,
      usersData,
    });

    if (isUsersError || !usersData) {
      console.error(MSG.ERROR.DUPLICATE_CHECK);
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

  return {
    fullName,
    isDuplicatedFullNameChecked,
    validFullNameMsg,
    invalidFullNameMsg,
    handleChangeFullName,
    handleClickDuplicatedFullNameCheckBtn,
  };
};

export default useFullNameCheck;
