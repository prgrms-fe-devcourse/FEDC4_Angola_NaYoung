import { useMutation } from 'react-query';
import { useArchives } from '@hooks';
import useAxiosInstance from './instance';

interface CreateCommentRequestBody {
  comment: string;
  postId: string;
}

export const useFetchCreateComment = () => {
  const { authInstance } = useAxiosInstance();

  const { addCommentArchive } = useArchives();

  const fetcher = (body: CreateCommentRequestBody) =>
    authInstance.post('/comments/create', body);

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    'createCommentMutation',
    fetcher,
    {
      onSuccess: () => {
        addCommentArchive();
      },
    },
  );

  return {
    createCommentMutate: mutate,
    isCreateCommentLoading: isLoading,
    isCreateCommentError: isError,
    isCreateCommentSuccess: isSuccess,
  };
};

interface DeleteCommentRequestBody {
  id: string;
}

export const useFetchDeleteComment = () => {
  const { authInstance } = useAxiosInstance();

  const { removeCommentArchive } = useArchives();

  const fetcher = (body: DeleteCommentRequestBody) =>
    authInstance.delete('/comments/delete', { data: body });

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    'deleteCommentMutation',
    fetcher,
    {
      onSuccess: () => {
        removeCommentArchive();
      },
    },
  );

  return {
    deleteCommentMutate: mutate,
    isDeleteCommentLoading: isLoading,
    isDeleteCommentError: isError,
    isDeleteCommentSuccess: isSuccess,
  };
};
