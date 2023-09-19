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

// TODO: 유저페이지와 마이페이지의 포스트 리스트 부분이 똑같다..! 공통으로 빼야 할까?

const NO_POSTS_LIST_TITLE = '작성한 글이 없습니다.';
const POSTS_LIST_TITLE = '작성한 포스트';

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
      <UserPostsListContainer>
        <UserPostsListUl>
          <UserPostsListTitle>
            {userPostsData?.length === 0
              ? NO_POSTS_LIST_TITLE
              : POSTS_LIST_TITLE}
          </UserPostsListTitle>
          {userPostsData?.map((post) => (
            <PostListItem
              key={post._id}
              id={post._id}
              title={post.title}
              canDeletePost={name === 'myPage'}
            />
          ))}
        </UserPostsListUl>
      </UserPostsListContainer>
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

const UserPostsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const UserPostsListUl = styled.ul`
  width: 100%;
`;

const UserPostsListTitle = styled.div`
  color: ${ANGOLA_STYLES.color.dark};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.title};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;
