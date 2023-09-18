import styled from '@emotion/styled';
import { calculateLevel, getUserLevelInfo } from '@utils';
import { useRecoilValue } from 'recoil';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchUserPosts } from '@apis/post';
import { useFetchUser } from '@apis/user';
import { authInfoState } from '@store/auth';
import UserInfo from './UserInfo';

const NO_POSTS_LIST_TITLE = '작성한 글이 없습니다.';
const POSTS_LIST_TITLE = '작성한 포스트';

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
          userColor={getUserLevelInfo(calculateLevel(userData)).userColor}
          userEmoji={getUserLevelInfo(calculateLevel(userData)).userEmoji}
        />
      )}
      <PostsListContainer>
        <PostsListUl>
          {/* TODO: 작성한 글이 없을 때는 색상 변경? (레드) */}
          <PostsListTitle>
            {userPostsData?.length === 0
              ? NO_POSTS_LIST_TITLE
              : POSTS_LIST_TITLE}
          </PostsListTitle>
          {/* {userPostsData?.length === 0 ? (
            <NoPostsListTitle>{NO_POSTS_MESSAGE}</NoPostsListTitle>
          ) : (
            <PostsListTitle>{POSTS_LIST_TITLE}</PostsListTitle>
          )} */}
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
  box-sizing: border-box;
  display: flex;
  padding: 32px 40px;
  flex-direction: column;
  align-items: center;
  gap: 60px;
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
  color: var(--dark, #9a9a9a);
  text-align: center;
  /* title */
  font-family: Mabinogi_Classic;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 28px */
`;

// const NoPostsListTitle = styled.div`
//   color: var(--dark, red);
//   text-align: center;
//   /* title */
//   font-family: Mabinogi_Classic;
//   font-size: 28px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 100%; /* 28px */
// `;
