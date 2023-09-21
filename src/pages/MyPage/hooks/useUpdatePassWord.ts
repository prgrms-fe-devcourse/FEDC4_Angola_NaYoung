import { ChangeEvent, useState } from 'react';
import { useFetchUpdatePassword } from '@apis/profile';
import { checkPassWordPattern } from '@utils/userAuthentication';

const useUpdatePassWord = () => {
  const { updatePasswordMutate, updatePasswordData } = useFetchUpdatePassword();
  const [newPassWord, setNewPassWord] = useState(
    updatePasswordData.password as string,
  );
  const [confirmNewPassWord, setConfirmNewPassWord] = useState('');
  const [isEditingPassWord, setIsEditingPassWord] = useState(false);
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidPasswordConfirmMsg, setInvalidPasswordConfirmMsg] =
    useState('');
  const [validPasswordConfirmMsg, setValidPasswordConfirmMsg] = useState('');

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
      setInvalidPasswordMsg('비밀번호를 입력해주세요.');
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

    if (!isValidPasswordConfirm) {
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
  };
};

export default useUpdatePassWord;
