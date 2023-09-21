import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchLogOut } from '@apis/auth';

const useLogOut = () => {
  const navigate = useNavigate();
  const { logOutMutate, isLogOutError, isLogOutSuccess } = useFetchLogOut();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickLogOut = () => {
    logOutMutate();
  };

  useEffect(() => {
    if (isLogOutSuccess) {
      navigate('/');
    }
    if (isLogOutError) {
      setIsModalOpen(true);
    }
  }, [isLogOutError, isLogOutSuccess, navigate]);

  return { handleClickLogOut, isModalOpen, setIsModalOpen };
};

export default useLogOut;
