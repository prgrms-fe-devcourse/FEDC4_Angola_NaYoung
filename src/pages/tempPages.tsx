import Post from '@components/Post';

export const CreatePostPage = () => {
  return <div>CreatePostPage</div>;
};
export const HomePage = () => {
  return <div>HomePage</div>;
};
export const UserPage = () => {
  return <div>UserPage</div>;
};
export const MyPage = () => {
  return <div>MyPage</div>;
};

export interface PostPageProps {
  postId?: string;
  show?: 'true';
  voted?: 'a' | 'b';
}
export const PostPage = ({ postId = '', show, voted }: PostPageProps) => {
  return (
    <div>
      <Post postId={postId} />
    </div>
  );
};
