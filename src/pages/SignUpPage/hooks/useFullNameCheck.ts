import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { checkDuplicatedFullName, checkFullNamePattern } from '@utils';
import { useFetchUsers } from '@apis/user';
import { MSG, SIGNUP_INITIAL_VALUE } from '../constants';

interface useFullNameCheckProps {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

const useFullNameCheck = ({ setIsSubmitted }: useFullNameCheckProps) => {
  const [fullName, setFullName] = useState<string>(
    SIGNUP_INITIAL_VALUE.FULL_NAME,
  );
  const [isDuplicatedFullNameChecked, setIsDuplicatedFullNameChecked] =
    useState<boolean>(false);
  const [validFullNameMsg, setValidFullNameMsg] = useState<string>('');
  const [invalidFullNameMsg, setInvalidFullNameMsg] = useState<string>('');
  const { usersData, isUsersError } = useFetchUsers();

  const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    const { isValidFullName, msg } = checkFullNamePattern({
      fullName: e.target.value,
    });
    setFullName(e.target.value);
    setIsDuplicatedFullNameChecked(false);
    setValidFullNameMsg('');
    setIsSubmitted(false);

    if (!e.target.value) {
      setInvalidFullNameMsg(MSG.WARNING.EMPTY.FULL_NAME);
    } else if (!isValidFullName) {
      setInvalidFullNameMsg(msg);
    } else {
      setInvalidFullNameMsg('');
      setValidFullNameMsg(msg);
    }
  };

  // const handleClickDuplicatedEmailCheckBtn = () => {
  //   usersDataRefetch().then((res) => {
  //     if (!res.data) {
  //       console.error(MSG.ERROR.DUPLICATE_CHECK);
  //       return;
  //     }
  //     const { isValidEmail, msg } = checkDuplicatedEmail({
  //       email,
  //       usersData: res.data,
  //     });
  //     if (!isValidEmail) {
  //       setValidEmailMsg('');
  //       setInvalidEmailMsg(msg);
  //     } else {
  //       setValidEmailMsg(msg);
  //       setIsDuplicatedEmailChecked(true);
  //     }
  //   });
  // };

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
