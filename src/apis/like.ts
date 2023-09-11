import { useMutation } from 'react-query';
import { Like } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

interface LikeRequestBody {
  postId: string;
}

interface UnLikeRequestBody {
  id: string;
}

export const useFetchLike = () => {
  const { authInstance } = useAxiosInstance();
  const { mutate, data, isSuccess, isError, isLoading } = useMutation<
    AxiosResponse<Like>,
    AxiosError,
    LikeRequestBody
  >('likeMutation', (body: LikeRequestBody) =>
    authInstance.post('/likes/create', body),
  );
  return {
    likeMutate: mutate,
    likeData: {
      likeId: data?.data._id,
      userId: data?.data.user,
      postId: data?.data.post,
    },
    isLikeSuccess: isSuccess,
    isLikeError: isError,
    isLikeLoading: isLoading,
  };
};

export const useFetchUnLike = () => {
  const { authInstance } = useAxiosInstance();
  const { mutate, isSuccess, isError, isLoading } = useMutation<
    AxiosResponse<Like>,
    AxiosError,
    UnLikeRequestBody
  >('unLikeMutation', (body: UnLikeRequestBody) =>
    authInstance.delete('/likes/delete', { data: body }),
  );
  return {
    unLikeMutate: mutate,
    isUnLikeSuccess: isSuccess,
    isUnLikeError: isError,
    isUnLikeLoading: isLoading,
  };
};
