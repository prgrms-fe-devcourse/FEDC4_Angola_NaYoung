import { useState } from 'react';

const useClickEye = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(false);

  const handleClickPasswordShown = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  const handleClickPasswordConfirmShown = () => {
    setIsPasswordConfirmShown(!isPasswordConfirmShown);
  };

  return {
    isPasswordShown,
    isPasswordConfirmShown,
    handleClickPasswordShown,
    handleClickPasswordConfirmShown,
  };
};

export default useClickEye;
