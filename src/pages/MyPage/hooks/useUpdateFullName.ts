import { ChangeEvent, useEffect, useState } from 'react';
import { useFetchUpdateFullName } from '@apis/profile';
import { useFetchUsers } from '@apis/user';
import { checkFullNamePattern } from '@utils/userAuthentication';

interface useUpdateFullNameProps {
  name: string;
}

const useUpdateFullName = ({ name }: useUpdateFullNameProps) => {
  const { updateFullNameMutate } = useFetchUpdateFullName();
  const [newFullName, setNewFullName] = useState(name);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const { usersData } = useFetchUsers();
  const [invalidFullNameMsg, setInvalidFullNameMsg] = useState('');
  const [validFullNameMsg, setValidFullNameMsg] = useState('');
  const [isDuplicatedFullNameChecked, setIsDuplicatedFullNameChecked] =
    useState(false);

  useEffect(() => {
    setNewFullName(name);
  }, [name]);

  const handleClickUpdateFullName = () => {
    if (isEditingFullName) {
      if (checkFullNamePattern({ fullName: newFullName, usersData })) {
        updateFullNameMutate({ fullName: newFullName });
      } else {
        setNewFullName('');
        return;
      }
    }
    setIsEditingFullName(!isEditingFullName);
  };

  const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setInvalidFullNameMsg('닉네임을 입력해주세요.');
    }
    setNewFullName(e.target.value);
    setIsDuplicatedFullNameChecked(false);
    setValidFullNameMsg('');
  };

  const handleClickDuplicatedFullNameCheckBtn = () => {
    const { isValidFullName, msg } = checkFullNamePattern({
      fullName: newFullName,
      usersData,
    });

    if (!usersData) {
      console.error('중복검사를 위해 유저 정보를 가져오는데 실패하였습니다.');
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
    newFullName,
    isEditingFullName,
    handleChangeFullName,
    handleClickUpdateFullName,
    invalidFullNameMsg,
    validFullNameMsg,
    isDuplicatedFullNameChecked,
    handleClickDuplicatedFullNameCheckBtn,
  };
};

export default useUpdateFullName;
