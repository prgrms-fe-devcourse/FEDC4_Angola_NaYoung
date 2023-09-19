import { ChangeEvent, useState } from 'react';
import { useFetchUpdatePassword } from '@apis/profile';
import { checkPassWordPattern } from '@utils/userAuthentication';

const useUpdatePassWord = () => {
  const { updatePasswordMutate, updatePasswordData } = useFetchUpdatePassword();
  const [newPassWord, setNewPassWord] = useState(updatePasswordData.password);
  const [confirmNewPassWord, setConfirmNewPassWord] = useState('');
  const [isEditingPassWord, setIsEditingPassWord] = useState(false);

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
    setNewPassWord(e.target.value);
  };

  const handleChangeConfirmPassWord = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassWord(e.target.value);
  };

  return {
    isEditingPassWord,
    newPassWord,
    handleChangePassWord,
    handleClickUpdatePassWord,
    confirmNewPassWord,
    handleChangeConfirmPassWord,
  };
};

export default useUpdatePassWord;
