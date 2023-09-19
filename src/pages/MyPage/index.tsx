import styled from '@emotion/styled';
import { calculateLevel, getUserLevelInfo } from '@utils';
import { useRecoilValue } from 'recoil';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchUserPosts } from '@apis/post';
import { useFetchUser } from '@apis/user';
import useCurrentPage from '@hooks/useCurrentPage';
import { authInfoState } from '@store/auth';
import MyInfo from './MyInfo';

const MyPage = () => {
  const auth = useRecoilValue(authInfoState);
  const { userData, isUserLoading } = useFetchUser(auth?.userId as string);
  const { userPostsData, isUserPostsLoading } = useFetchUserPosts(
    auth?.userId as string,
  );
  const { name } = useCurrentPage();

  if (isUserLoading || isUserPostsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {userData && (
        <MyInfo
          id={userData._id}
          image={userData.image}
          name={userData.fullName}
          likes={userData.likes?.length}
          followers={userData.followers?.length}
          following={userData.following?.length}
          myLevel={calculateLevel(userData)}
          myColor={getUserLevelInfo(calculateLevel(userData)).userColor}
          myEmoji={getUserLevelInfo(calculateLevel(userData)).userEmoji}
        />
      )}
      <ul>
        {userPostsData?.length === 0 ? (
          <NoPostMessage>작성한 글이 없습니다.</NoPostMessage>
        ) : (
          userPostsData?.map((post) => (
            <PostListItem
              key={post._id}
              id={post._id}
              title={post.title}
              canDeletePost={name === 'myPage'}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default MyPage;

const NoPostMessage = styled.div`
  display: flex;
  margin-top: 30px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;
