import { useMutation, useQuery } from 'react-query';
import { Post } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import useAxiosInstance from './instance';

const CHANNEL_ID = '64fab06721f5351a7dd21a66'; // todo : env 파일에 추가

export const useFetchAllPosts = () => {
  const { baseInstance } = useAxiosInstance();
  const path = `/posts/channel/${CHANNEL_ID}`;

  const { data, isError, isLoading, isSuccess } = useQuery<
    AxiosResponse<Post[]>,
    AxiosError
  >('allPosts', () => baseInstance.get(path));

  console.log(`useAllSearchPosts 서버 통신 data:  ${data?.data}`);
  return {
    allPostsData: data?.data,
    allPostsSuccess: isSuccess,
    allPostsError: isError,
    allPostsLoading: isLoading,
  };
};

export const useFetchUserPosts = (authorId: string) => {
  const { baseInstance } = useAxiosInstance();
  const path = `/posts/author/${authorId}`;

  const { data, isError, isLoading, isSuccess } = useQuery<
    AxiosResponse<Post[]>,
    AxiosError
  >('userPosts', () => baseInstance.get(path));

  return {
    userPostsData: data?.data,
    userPostsError: isError,
    userPostsLoading: isLoading,
    userPostsSuccess: isSuccess,
  };
};

export const useFetchPost = (postId: string) => {
  const { baseInstance } = useAxiosInstance();
  const path = `/posts/${postId}`;

  const { data, isLoading, isSuccess, isError } = useQuery<
    AxiosResponse<Post>,
    AxiosError
  >('post', () => baseInstance.get(path));
  return {
    postData: data?.data as Post,
    postLoading: isLoading,
    postSuccess: isSuccess,
    postError: isError,
  };
};

interface CreatePostRequestBody {
  title: string;
}

export const useFetchCreatePost = () => {
  const { authInstance } = useAxiosInstance();
  const path = `/posts/create`;

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    'createPostMutation',
    (body: CreatePostRequestBody) => {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('image', '');
      formData.append('channelId', CHANNEL_ID);
      return authInstance.post(path, formData);
    },
  );
  return {
    createPostMutate: mutate,
    createPostLoading: isLoading,
    createPostSuccess: isSuccess,
    createPostError: isError,
  };
};

interface DeletePostRequestBody {
  id: string;
}

export const useFetchDeletePost = () => {
  const { authInstance } = useAxiosInstance();
  const path = `/posts/delete`;

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    'deletePostMutation',
    (body: DeletePostRequestBody) => authInstance.delete(path, { data: body }),
  );
  return {
    deletePostMutate: mutate,
    deletePostLoading: isLoading,
    deletePostSuccess: isSuccess,
    deletePostError: isError,
  };
};
