import { ChangeEvent, useEffect, useState } from 'react';
import { useFetchUpdatePassword } from '@apis/profile';
import { checkPassWordPattern } from '@utils/userAuthentication';
import { CHECK_MSG } from '@constants/index';
import { PASSWORD_CONFIRM_MESSAGE } from '../constants';

const useUpdatePassWord = () => {
  const { updatePasswordMutate, updatePasswordData, isUpdatePasswordError } =
    useFetchUpdatePassword();
  const [newPassWord, setNewPassWord] = useState(
    updatePasswordData.password as string,
  );
  const [confirmNewPassWord, setConfirmNewPassWord] = useState('');
  const [isEditingPassWord, setIsEditingPassWord] = useState(false);
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidPasswordConfirmMsg, setInvalidPasswordConfirmMsg] =
    useState('');
  const [validPasswordConfirmMsg, setValidPasswordConfirmMsg] = useState('');
  const [isPassWordModalOpen, setIsPassWordModalOpen] = useState(false);

  const resetPassWordFields = () => {
    setNewPassWord('');
    setConfirmNewPassWord('');
  };

  const handleClickUpdatePassWord = () => {
    if (isEditingPassWord && newPassWord) {
      if (checkPassWordPattern({ newPassWord, confirmNewPassWord })) {
        updatePasswordMutate({ password: newPassWord });
        resetPassWordFields();
      } else {
        resetPassWordFields();
        return;
      }
    }
    setIsEditingPassWord(!isEditingPassWord);
  };

  const handleChangePassWord = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      passwordMsg,
      passwordConfirmMsg,
      isValidPasswordConfirm,
      isValidPassword,
    } = checkPassWordPattern({
      newPassWord: e.target.value,
      confirmNewPassWord,
    });
    setNewPassWord(e.target.value);

    if (!e.target.value) {
      setInvalidPasswordMsg(`${CHECK_MSG.PASSWORD}`);
    } else if (!isValidPassword) {
      setInvalidPasswordMsg(passwordMsg);
    } else {
      setInvalidPasswordMsg('');
    }
    if (!isValidPasswordConfirm) {
      setInvalidPasswordConfirmMsg(passwordConfirmMsg);
      setValidPasswordConfirmMsg('');
    } else {
      setValidPasswordConfirmMsg(passwordConfirmMsg);
      setInvalidPasswordConfirmMsg('');
    }
  };

  const handleChangeConfirmPassWord = (e: ChangeEvent<HTMLInputElement>) => {
    const { passwordConfirmMsg, isValidPasswordConfirm } = checkPassWordPattern(
      {
        newPassWord,
        confirmNewPassWord: e.target.value,
      },
    );

    setConfirmNewPassWord(e.target.value);
    setValidPasswordConfirmMsg('');

    if (!e.target.value) {
      setInvalidPasswordConfirmMsg(`${PASSWORD_CONFIRM_MESSAGE}`);
    } else if (!isValidPasswordConfirm) {
      setInvalidPasswordConfirmMsg(passwordConfirmMsg);
    } else {
      setValidPasswordConfirmMsg(passwordConfirmMsg);
      setInvalidPasswordConfirmMsg('');
    }
  };

  const handleAcceptPassWordButton = () => {
    if (invalidPasswordConfirmMsg || invalidPasswordMsg) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isUpdatePasswordError) {
      setIsPassWordModalOpen(true);
    }
  }, [isUpdatePasswordError]);

  return {
    isEditingPassWord,
    newPassWord,
    handleChangePassWord,
    handleClickUpdatePassWord,
    confirmNewPassWord,
    handleChangeConfirmPassWord,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    validPasswordConfirmMsg,
    handleAcceptPassWordButton,
    setIsPassWordModalOpen,
    isPassWordModalOpen,
  };
};

export default useUpdatePassWord;
