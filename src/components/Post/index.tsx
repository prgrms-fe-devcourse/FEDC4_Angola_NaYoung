import { useFetchPost } from '@apis/post';

interface PostProps {
  postId: string;
}

const Post = ({ postId }: PostProps) => {
  const { postData, isPostError, isPostLoading, isPostSuccess } =
    useFetchPost(postId);
  return (
    <div>
      <h1>Post</h1>
      <h2>Author: {postData?.author.fullName}</h2>
      <h2>Title: {postData?.title}</h2>
      <div>error: {isPostError ? 'error' : 'none'}</div>
      <div>loading: {isPostLoading ? 'loading' : 'done'}</div>
      <div>success: {isPostSuccess ? 'success' : 'fail'}</div>
    </div>
  );
};

export default Post;
