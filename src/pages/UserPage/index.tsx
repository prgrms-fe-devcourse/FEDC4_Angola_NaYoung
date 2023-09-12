import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchUserPosts } from '@apis/post';
import { useFetchUser } from '@apis/user';
import useCurrentPage from '@hooks/useCurrentPage';
import UserInfo from './UserInfo';

const UserPage = () => {
  const { params } = useCurrentPage();
  const { userData, isUserLoading } = useFetchUser(params.userId as string);
  const { userPostsData, isUserPostsLoading } = useFetchUserPosts(
    params.userId as string,
  );

  if (isUserLoading || isUserPostsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {userData && (
        <UserInfo
          id={userData._id}
          image={userData.image}
          name={userData.fullName}
          likes={userData.likes.length}
          followers={userData.followers.length}
          following={userData.following.length}
        />
      )}
      <ul>
        {userPostsData?.map((post) => (
          <PostListItem
            key={post._id}
            id={post._id}
            title={post.title}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
