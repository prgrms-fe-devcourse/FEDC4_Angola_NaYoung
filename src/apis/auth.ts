import { useMutation } from 'react-query';
import type { User } from '@type';
import type { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { authInfoState } from '@store/auth';
import { userArchives } from '@store/level';
import useAxiosInstance from './instance';

interface SignUpRequestBody {
  email: string;
  fullName: string;
  password: string;
}

export const useFetchSignUp = () => {
  const { baseInstance } = useAxiosInstance();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    'signUp',
    (body: SignUpRequestBody) => baseInstance.post('/signup', body),
  );
  return {
    signUpMutate: mutate,
    isSignUpLoading: isLoading,
    isSignUpError: isError,
    isSignUpSuccess: isSuccess,
  };
};

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const useFetchLogin = () => {
  const { baseInstance } = useAxiosInstance();
  const setAuth = useSetRecoilState(authInfoState);
  const setUserArchives = useSetRecoilState(userArchives);

  const { mutate, data, isSuccess, isError, isLoading } = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError,
    LoginRequestBody
  >('login', (body: LoginRequestBody) => baseInstance.post('/login', body), {
    onSuccess: ({ data }) => {
      setAuth({
        userId: data.user._id,
        token: data.token,
        userFullName: data.user.fullName,
      });
      setUserArchives({
        commentsLength: data.user.comments.length,
        postsLength: data.user.posts.length,
      });
    },
  });

  return {
    loginMutate: mutate,
    loginData: {
      userId: data?.data.user._id,
      fullName: data?.data.user.fullName,
    },
    isLoginSuccess: isSuccess,
    isLoginError: isError,
    isLoginLoading: isLoading,
  };
};

export const useFetchLogOut = () => {
  const { authInstance } = useAxiosInstance();
  const setAuth = useSetRecoilState(authInfoState);
  const setUserArchives = useSetRecoilState(userArchives);

  const { mutate, isSuccess, isError, isLoading } = useMutation(
    'logOut',
    () => authInstance.post('/logout'),
    {
      onSuccess: () => {
        setAuth(null);
        setUserArchives(null);
      },
    },
  );

  return {
    logOutMutate: mutate,
    isLogOutSuccess: isSuccess,
    isLogOutError: isError,
    isLogOutLoading: isLoading,
  };
};
