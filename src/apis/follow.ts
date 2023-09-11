import { useMutation } from 'react-query';
import { Follow } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

interface FollowRequestBody {
  userId: string;
}

interface UnFollowRequestBody {
  id: string;
}

export const useFetchFollow = () => {
  const { authInstance } = useAxiosInstance();
  const { mutate, data, isSuccess, isError, isLoading } = useMutation<
    AxiosResponse<Follow>,
    AxiosError,
    FollowRequestBody
  >('followMutation', (body: FollowRequestBody) =>
    authInstance.post('/follow/create', body),
  );
  return {
    followMutate: mutate,
    followData: {
      followId: data?.data._id,
      userId: data?.data.user,
      follower: data?.data.follower,
    },
    isFollowSuccess: isSuccess,
    isFollowError: isError,
    isFollowLoading: isLoading,
  };
};

export const useFetchUnFollow = () => {
  const { authInstance } = useAxiosInstance();
  const { mutate, isSuccess, isError, isLoading } = useMutation<
    AxiosResponse<Follow>,
    AxiosError,
    UnFollowRequestBody
  >('unFollowMutation', (body: UnFollowRequestBody) =>
    authInstance.delete('/follow/delete', { data: body }),
  );
  return {
    unFollowMutate: mutate,
    isUnFollowSuccess: isSuccess,
    isUnFollowError: isError,
    isUnFollowLoading: isLoading,
  };
};
