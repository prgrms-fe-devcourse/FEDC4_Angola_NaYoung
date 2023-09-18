import styled from '@emotion/styled';
import { calculateLevel, getUserLevelInfo } from '@utils';
import { useRecoilValue } from 'recoil';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchUserPosts } from '@apis/post';
import { useFetchUser } from '@apis/user';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import UserInfo from './UserInfo';
import { NO_POSTS_LIST_TITLE, POSTS_LIST_TITLE } from './constants';

interface UserPageProps {
  userId: string;
}

const UserPage = ({ userId = '' }: UserPageProps) => {
  const auth = useRecoilValue(authInfoState);
  const { userData, isUserLoading } = useFetchUser(userId);
  const { userPostsData, isUserPostsLoading } = useFetchUserPosts(userId);

  if (isUserLoading || isUserPostsLoading) {
    return <Spinner />;
  }

  return (
    <UserPageWrapper>
      {userData && (
        <UserInfo
          userId={userId}
          image={userData.image}
          name={userData.fullName}
          likes={userData.likes?.length}
          followers={userData.followers?.length}
          following={userData.following?.length}
          followerId={
            userData.followers.find(
              (follower) => follower.follower === auth?.userId,
            )?._id
          }
          userLevel={calculateLevel(userData)}
          userEmoji={getUserLevelInfo(calculateLevel(userData)).userEmoji}
        />
      )}
      <PostsListContainer>
        <PostsListUl>
          <PostsListTitle>
            {userPostsData?.length === 0
              ? NO_POSTS_LIST_TITLE
              : POSTS_LIST_TITLE}
          </PostsListTitle>
          {userPostsData?.map((post) => (
            <PostListItem
              key={post._id}
              id={post._id}
              title={post.title}
            />
          ))}
        </PostsListUl>
      </PostsListContainer>
    </UserPageWrapper>
  );
};

export default UserPage;

const UserPageWrapper = styled.div`
  display: flex;
  padding: 32px 40px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  flex: 1 0 0;
  align-self: stretch;
`;

const PostsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const PostsListUl = styled.ul`
  width: 100%;
`;

const PostsListTitle = styled.div`
  color: ${ANGOLA_STYLES.color.dark};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.title};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;
