import { useQuery } from 'react-query';
import { User } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { userArchives } from '@store/level';
import useAxiosInstance from './instance';

export const useFetchUserArchives = async () => {
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
