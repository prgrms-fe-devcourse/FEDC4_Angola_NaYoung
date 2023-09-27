import { useQuery } from 'react-query';
import type { User } from '@type';
import type { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { userArchives } from '@store/level';
import useAxiosInstance from './instance';

export const useFetchUserArchives = () => {
  const { authInstance } = useAxiosInstance();
  const setUserArchives = useSetRecoilState(userArchives);
  const { data, isSuccess, isError, isLoading } = useQuery<
    AxiosResponse<User>,
    AxiosError
  >('userArchives', () => authInstance.get('/auth-user'), {
    onSuccess: ({ data }) => {
      if (data) {
        setUserArchives({
          commentsLength: data.comments.length,
          postsLength: data.posts.length,
        });
      }
    },
  });

  return {
    userArchivesData: data,
    isUserArchivesSuccess: isSuccess,
    isUserArchivesError: isError,
    isUserArchivesLoading: isLoading,
  };
};
