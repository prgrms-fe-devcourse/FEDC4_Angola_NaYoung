import { useNavigate } from 'react-router-dom';
import { useFetchLogOut } from '@apis/auth';

const useLogOut = () => {
  const navigate = useNavigate();
  const { logOutMutate } = useFetchLogOut();

  const handleClickLogOut = () => {
    logOutMutate();
    navigate('/');
  };

  return { handleClickLogOut };
};

export default useLogOut;
