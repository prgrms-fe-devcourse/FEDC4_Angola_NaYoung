import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@store/auth';

export const useRedirectByAuth = (to = '/') => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authInfoState);

  const redirectByAuth = () => {
    if (auth) return;
    navigate(to, { replace: true });
  };

  return redirectByAuth;
};
