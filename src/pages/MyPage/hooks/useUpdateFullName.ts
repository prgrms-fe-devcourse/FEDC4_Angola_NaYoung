import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { CHECK_MSG } from '@constants';
import { useRecoilValue } from 'recoil';
import { useFetchUpdateFullName } from '@apis/profile';
import { useFetchUsers } from '@apis/user';
import { authInfoState } from '@store/auth';
import {
  checkDuplicatedFullName,
  checkFullNamePattern,
} from '@utils/userAuthentication';

interface useUpdateFullNameProps {
  name: string;
}

const useUpdateFullName = ({ name }: useUpdateFullNameProps) => {
  const { updateFullNameMutate, isUpdateFullNameError } =
    useFetchUpdateFullName();
  const [newFullName, setNewFullName] = useState(name);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const { usersDataRefetch } = useFetchUsers();
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
      updateFullNameMutate({ fullName: newFullName });
    }

    setIsEditingFullName(!isEditingFullName);
  };

  const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    const { isValidFullName, msg } = checkFullNamePattern({
      fullName: e.target.value,
    });
    setNewFullName(e.target.value);
    setIsDuplicatedFullNameChecked(false);
    setValidFullNameMsg('');

    if (!e.target.value) {
      setInvalidFullNameMsg(`${CHECK_MSG.FULL_NAME}`);
    } else if (!isValidFullName) {
      setInvalidFullNameMsg(msg);
    } else {
      setInvalidFullNameMsg('');
      setValidFullNameMsg(msg);
    }
  };

  const handleClickDuplicatedFullNameCheckButton = () => {
    usersDataRefetch().then((res) => {
      if (!res.data) {
        console.error(CHECK_MSG.ERROR);
        return;
      }
      const { isValidFullName, msg } = checkDuplicatedFullName({
        fullName: newFullName,
        usersData: res.data,
        myFullName,
      });
      if (!isValidFullName) {
        setIsDuplicatedFullNameChecked(false);
        setValidFullNameMsg('');
        setInvalidFullNameMsg(msg);
      } else {
        setValidFullNameMsg(msg);
        setInvalidFullNameMsg('');
        setIsDuplicatedFullNameChecked(true);
      }
    });
  };

  useEffect(() => {
    if (isUpdateFullNameError) {
      setIsFullNameModalOpen(true);
      setNewFullName(name);
    }
  }, [isUpdateFullNameError, setNewFullName, name]);

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
