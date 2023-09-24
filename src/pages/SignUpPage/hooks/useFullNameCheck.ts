import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { checkDuplicatedFullName, checkFullNamePattern } from '@utils';
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
    const { isValidFullName, msg } = checkFullNamePattern({
      fullName: e.target.value,
      usersData,
    });
    setFullName(e.target.value);
    setIsDuplicatedFullNameChecked(false);
    setValidFullNameMsg('');
    setIsSubmitted(false);

    if (!e.target.value) {
      setInvalidFullNameMsg(MSG.WARNING.EMPTY.FULLNAME);
    } else if (msg === '이미 가입된 닉네임입니다.') {
      setValidFullNameMsg('닉네임 형식이 올바릅니다.');
    } else if (!isValidFullName) {
      setInvalidFullNameMsg(msg);
    } else {
      setInvalidFullNameMsg('');
      setValidFullNameMsg('닉네임 형식이 올바릅니다.');
    }
  };

  const handleClickDuplicatedFullNameCheckBtn = () => {
    const { isValidFullName, msg } = checkDuplicatedFullName({
      fullName,
      usersData,
    });

    if (isUsersError || !usersData) {
      console.error(MSG.ERROR.DUPLICATE_CHECK);
      return;
    }
    if (!isValidFullName) {
      setValidFullNameMsg('');
      setInvalidFullNameMsg(msg);
    } else {
      setValidFullNameMsg(msg);
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
