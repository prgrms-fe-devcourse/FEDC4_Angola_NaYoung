import { useMutation, useQuery } from 'react-query';
import { Post } from '@type';
import { AxiosError, AxiosResponse } from 'axios';
import { useArchives } from '@hooks/useArchives';
import useAxiosInstance from './instance';

const CHANNEL_ID = '650be15e89b54040ee691c0c'; // todo : env 파일에 추가

export const useFetchAllPosts = () => {
  const { baseInstance } = useAxiosInstance();
  const path = `/posts/channel/${CHANNEL_ID}`;

  const { data, isError, isLoading, isSuccess, refetch } = useQuery<
    AxiosResponse<Post[]>,
    AxiosError
  >('allPosts', () => baseInstance.get(path), {
    refetchOnWindowFocus: false,
  });

  return {
    allPostsData: data?.data,
    isAllPostsSuccess: isSuccess,
    isAllPostsError: isError,
    isAllPostsLoading: isLoading,
    allPostsRefetch: refetch,
  };
};

export const useFetchUserPosts = (authorId: string) => {
  const { baseInstance } = useAxiosInstance();
  const path = `/posts/author/${authorId}`;

  const { data, isError, isLoading, isSuccess, refetch } = useQuery<
    AxiosResponse<Post[]>,
    AxiosError
  >('userPosts', () => baseInstance.get(path));

  return {
    userPostsData: data?.data,
    isUserPostsError: isError,
    isUserPostsLoading: isLoading,
    isUserPostsSuccess: isSuccess,
    userPostsRefetch: refetch,
  };
};

export const useFetchPost = (postId: string) => {
  const { baseInstance } = useAxiosInstance();
  const path = `/posts/${postId}`;

  const { data, isLoading, isSuccess, isError, refetch } = useQuery<
    AxiosResponse<Post>,
    AxiosError
  >('post', () => baseInstance.get(path));
  return {
    postData: data?.data as Post,
    isPostLoading: isLoading,
    isPostSuccess: isSuccess,
    isPostError: isError,
    postRefetch: refetch, 
  };
};


// TODO:@MinwooP - 위 useFetchPost에 key만 다르게 넣을 수 있도록 변경하고, 합치기 
export const useFetchPostNotification = (postId: string) => {
  const { baseInstance } = useAxiosInstance();
  const path = `/posts/${postId}`;

  const { data, isLoading, isSuccess, isError, refetch } = useQuery<
    AxiosResponse<Post>,
    AxiosError
  >('postForNotification', () => baseInstance.get(path));
  return {
    postData: data?.data as Post,
    isPostLoading: isLoading,
    isPostSuccess: isSuccess,
    isPostError: isError,
    postRefetch: refetch,
  };
};

interface CreatePostRequestBody {
  title: string;
}

export const useFetchCreatePost = () => {
  const { authInstance } = useAxiosInstance();
  const path = `/posts/create`;
  const { addPostArchive } = useArchives();

  const { mutate, data, isLoading, isSuccess, isError } = useMutation<
    AxiosResponse<Post>,
    AxiosError,
    CreatePostRequestBody
  >(
    'createPostMutation',
    (body: CreatePostRequestBody) => {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('image', '');
      formData.append('channelId', CHANNEL_ID);
      return authInstance.post(path, formData);
    },
    {
      onSuccess: () => {
        addPostArchive();
      },
    },
  );
  return {
    createPostMutate: mutate,
    createPostData: data?.data._id,
    isCreatePostLoading: isLoading,
    isCreatePostSuccess: isSuccess,
    isCreatePostError: isError,
  };
};

interface DeletePostRequestBody {
  id: string;
}

export const useFetchDeletePost = () => {
  const { authInstance } = useAxiosInstance();
  const path = `/posts/delete`;
  const { removePostArchive } = useArchives();

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    'deletePostMutation',
    (body: DeletePostRequestBody) => authInstance.delete(path, { data: body }),
    {
      onSuccess: () => {
        removePostArchive();
      },
    },
  );
  return {
    deletePostMutate: mutate,
    isDeletePostLoading: isLoading,
    isDeletePostSuccess: isSuccess,
    isDeletePostError: isError,
  };
};

export const useFetchPartPosts = (offset: number, limit: number) => {
  const { baseInstance } = useAxiosInstance();
  const path = `/posts/channel/${CHANNEL_ID}`;

  const { data, isError, isLoading, isSuccess, refetch } = useQuery<
    AxiosResponse<Post[]>,
    AxiosError
  >(
    'partPosts',
    () =>
      baseInstance.get(path, {
        params: {
          offset,
          limit,
        },
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: 0,
    },
  );

  return {
    partPostsData: data?.data,
    isPartPostsSuccess: isSuccess,
    isPartPostsError: isError,
    isPartPostsLoading: isLoading,
    partPostsRefetch: refetch,
  };
};
