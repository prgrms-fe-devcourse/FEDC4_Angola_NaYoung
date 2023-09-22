import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { calculateLevel, getUserLevelInfo } from '@utils';
import { useRecoilValue } from 'recoil';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchUser } from '@apis/user';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { USER_POSTS_TITLE } from '@constants/index';
import UserInfo from './UserInfo';
import './constants';

interface UserPageProps {
  userId?: string;
}

const UserPage = ({ userId = '' }: UserPageProps) => {
  const auth = useRecoilValue(authInfoState);
  const navigate = useNavigate();
  const { userData, userDataRefetch } = useFetchUser(userId);

  const isSameId = () => {
    return userData?._id === userId;
  };

  useEffect(() => {
    userDataRefetch();
  }, [userId, userDataRefetch]);

  if (userId === auth?.userId) {
    navigate('/mypage', { replace: true });
  }

  return (
    <UserPageWrapper>
      {isSameId() ? (
        <>
          {userData && (
            <UserInfo
              userId={userId}
              image={userData.image}
              name={userData.fullName}
              likes={userData.posts.reduce(
                (likes, post) => likes + post.likes.length,
                0,
              )}
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
            <PostsListTitle>
              {userData?.posts?.length === 0
                ? USER_POSTS_TITLE.NO_POSTS
                : USER_POSTS_TITLE.POSTS}
            </PostsListTitle>
            <PostsListUl>
              {userData?.posts.map((post) => (
                <PostListItem
                  key={post._id}
                  id={post._id}
                  image={userData.image}
                  title={post.title}
                />
              ))}
            </PostsListUl>
          </PostsListContainer>
        </>
      ) : (
        <Spinner />
      )}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;
`;

const PostsListTitle = styled.div`
  color: ${ANGOLA_STYLES.color.dark};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.title};
  line-height: 100%;
`;
