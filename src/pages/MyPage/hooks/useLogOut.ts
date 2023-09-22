import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchLogOut } from '@apis/auth';

const useLogOut = () => {
  const navigate = useNavigate();
  const { logOutMutate, isLogOutError, isLogOutSuccess } = useFetchLogOut();
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const handleClickLogOut = () => {
    logOutMutate();
  };

  useEffect(() => {
    if (isLogOutSuccess) {
      navigate('/');
    }
    if (isLogOutError) {
      setIsLogOutModalOpen(true);
    }
  }, [isLogOutError, isLogOutSuccess, navigate]);

  return { handleClickLogOut, isLogOutModalOpen, setIsLogOutModalOpen };
};

export default useLogOut;
