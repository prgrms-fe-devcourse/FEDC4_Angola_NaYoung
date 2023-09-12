import styled from '@emotion/styled';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchUserPosts } from '@apis/post';
import { useFetchUser } from '@apis/user';
import useCurrentPage from '@hooks/useCurrentPage';

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
      <Profile>프로필{userData?.image}</Profile>
      <div>닉네임: {userData?.fullName}</div>
      <div>
        받은 포스트 좋아요 수:
        {userPostsData
          ?.map((data) => data.likes.length)
          .reduce((acc, cur) => acc + cur, 0)}
      </div>
      <div>follower: {userData?.followers.length}</div>
      <div>following: {userData?.following.length}</div>
      <div>작성한 포스트</div>
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

const Profile = styled.div``;
