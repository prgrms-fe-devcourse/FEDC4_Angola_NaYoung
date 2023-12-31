import { useEffect } from 'react';
import { PostListItem, Spinner } from '@components';
import { USER_POSTS_TITLE } from '@constants';
import styled from '@emotion/styled';
import { useCurrentPage } from '@hooks';
import { calculateLevel, getUserLevelInfo } from '@utils';
import { useRecoilValue } from 'recoil';
import { useFetchDeletePost } from '@apis/post';
import { useFetchUser } from '@apis/user';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import MyInfo from './components/MyInfo';
import { MY_PAGE } from './constants';

const MyPage = () => {
  const auth = useRecoilValue(authInfoState);
  const { name } = useCurrentPage();

  const { userData, isUserLoading, userDataRefetch } = useFetchUser(
    auth?.userId as string,
  );
  const { deletePostMutate, isDeletePostSuccess } = useFetchDeletePost();

  const isSameId = () => {
    return userData?._id === auth?.userId;
  };

  useEffect(() => {
    if (isDeletePostSuccess) {
      userDataRefetch();
    }
  }, [isDeletePostSuccess, userDataRefetch]);

  if (isUserLoading) {
    return <Spinner />;
  }

  return (
    <MyPageWrapper>
      {isSameId() ? (
        <>
          {userData && (
            <MyInfo
              id={userData._id}
              image={userData.image}
              name={userData.fullName}
              likes={userData.posts.reduce(
                (likes, post) => likes + post.likes.length,
                0,
              )}
              followers={userData.followers?.length}
              following={userData.following?.length}
              myLevel={calculateLevel(userData)}
              myColor={getUserLevelInfo(calculateLevel(userData)).userColor}
              myEmoji={getUserLevelInfo(calculateLevel(userData)).userEmoji}
            />
          )}
          <PostsListContainer>
            <PostsListTitle>
              {userData?.posts.length === 0
                ? USER_POSTS_TITLE.NO_POSTS
                : USER_POSTS_TITLE.POSTS}
            </PostsListTitle>
            <PostsListUl>
              {userData?.posts?.map((post) => (
                <PostListItem
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  canDeletePost={name === MY_PAGE}
                  deletePostMutate={deletePostMutate}
                />
              ))}
            </PostsListUl>
          </PostsListContainer>
        </>
      ) : (
        <Spinner />
      )}
    </MyPageWrapper>
  );
};

export default MyPage;

const MyPageWrapper = styled.div`
  display: flex;
  padding: 32px 40px;
  @media (max-width: 450px) {
    padding: 32px 4px;
  }
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
