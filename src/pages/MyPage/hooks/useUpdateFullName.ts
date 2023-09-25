import { ChangeEvent, useEffect, useState } from 'react';
import { CHECK_MSG } from '@constants';
import { useRecoilValue } from 'recoil';
import { useFetchUpdateFullName } from '@apis/profile';
import { useFetchUsers } from '@apis/user';
import { authInfoState } from '@store/auth';
import { checkFullNamePattern } from '@utils/userAuthentication';

interface useUpdateFullNameProps {
  name: string;
}

const useUpdateFullName = ({ name }: useUpdateFullNameProps) => {
  const {
    updateFullNameMutate,
    isUpdateFullNameError,
    isUpdateFullNameSuccess,
  } = useFetchUpdateFullName();
  const [newFullName, setNewFullName] = useState(name);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const { usersData, usersDataRefetch } = useFetchUsers();
  const [invalidFullNameMsg, setInvalidFullNameMsg] = useState('');
  const [validFullNameMsg, setValidFullNameMsg] = useState('');
  const [isDuplicatedFullNameChecked, setIsDuplicatedFullNameChecked] =
    useState(false);
  const [isFullNameModalOpen, setIsFullNameModalOpen] = useState(false);
  const auth = useRecoilValue(authInfoState);
  const myFullName = auth?.userFullName || '';

  useEffect(() => {
    setNewFullName(name);
  }, [name]);

  const handleClickUpdateFullName = () => {
    if (isEditingFullName) {
      if (
        checkFullNamePattern({
          fullName: newFullName,
          usersData,
          myFullName,
        })
      ) {
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
      setInvalidFullNameMsg(`${CHECK_MSG.FULL_NAME}`);
    }
    setNewFullName(e.target.value);
    setIsDuplicatedFullNameChecked(false);
    setValidFullNameMsg('');
  };

  const handleClickDuplicatedFullNameCheckButton = () => {
    const { isValidFullName, msg } = checkFullNamePattern({
      fullName: newFullName,
      usersData,
      myFullName,
    });

    if (!usersData) {
      console.error(`${CHECK_MSG.ERROR}`);
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

  useEffect(() => {
    if (isUpdateFullNameError) {
      setIsFullNameModalOpen(true);
      setNewFullName(name);
    }
  }, [isUpdateFullNameError, setNewFullName, name]);

  useEffect(() => {
    if (isUpdateFullNameSuccess) {
      usersDataRefetch();
    }
  }, [isUpdateFullNameSuccess, usersDataRefetch]);

  return {
    newFullName,
    isEditingFullName,
    handleChangeFullName,
    handleClickUpdateFullName,
    invalidFullNameMsg,
    validFullNameMsg,
    isDuplicatedFullNameChecked,
    handleClickDuplicatedFullNameCheckButton,
    isFullNameModalOpen,
    setIsFullNameModalOpen,
  };
};

export default useUpdateFullName;
