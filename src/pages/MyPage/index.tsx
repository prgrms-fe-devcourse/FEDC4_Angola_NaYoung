import styled from '@emotion/styled';
import { calculateLevel, getUserLevelInfo } from '@utils';
import { useRecoilValue } from 'recoil';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchUserPosts } from '@apis/post';
import { useFetchUser } from '@apis/user';
import useCurrentPage from '@hooks/useCurrentPage';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import MyInfo from './MyInfo';
import { MY_PAGE, MY_POSTS_TITLE } from './constants';

const MyPage = () => {
  const auth = useRecoilValue(authInfoState);
  const { name } = useCurrentPage();
  const { userData, isUserLoading } = useFetchUser(auth?.userId as string);
  const { userPostsData, isUserPostsLoading } = useFetchUserPosts(
    auth?.userId as string,
  );

  if (isUserLoading || isUserPostsLoading) {
    return <Spinner />;
  }

  return (
    <MyPageWrapper>
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
      <PostsListContainer>
        <PostsListUl>
          <PostsListTitle>
            {userPostsData?.length === 0
              ? MY_POSTS_TITLE.NO_POSTS
              : MY_POSTS_TITLE.POSTS}
          </PostsListTitle>
          {userPostsData?.map((post) => (
            <PostListItem
              key={post._id}
              id={post._id}
              title={post.title}
              canDeletePost={name === MY_PAGE}
            />
          ))}
        </PostsListUl>
      </PostsListContainer>
    </MyPageWrapper>
  );
};

export default MyPage;

const MyPageWrapper = styled.div`
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
