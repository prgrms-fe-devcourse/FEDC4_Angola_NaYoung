import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Notification } from '@type';
import { useFetchPost } from '@apis/post';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';

const LikeNotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  const navigate = useNavigate();
  // 알림 객체의 postId 값인 notification.post를 가지고 포스트 정보 조회 API 호출

  const { postData, postRefetch, isPostSuccess } = useFetchPost(
    notification.post!,
  );

  // TODO: 서버 데이터를 바로 못 받아오는 에러 발생 => refetch 써주니까 어느정도 해결은 됨
  // => 근데 처음 홈화면에서는 여전히 에러고, 특정 포스트 상세보기 들어간다음부터는 알림을 제대로 받아옴
  // => 특정 포스트 상세보기에서도 이 API를 한번 호출해서 그런 것 같음,,?
  console.log('리페치');

  useEffect(() => {
    postRefetch();
  }, [isPostSuccess, postRefetch]);

  // 응답으로 받은 postData의 title 중, 특수문자 빼고 실제 포스트제목만 return
  const { title: postTitle } = splitPostBySeparator(postData.title);

  // TODO: title span 태그 및, 아이템 전체에 등록할 핸들러
  // 1. 포스트 페이지로 이동
  // 2. 이 Viewer닫기 => 페이지 이동해도 NavBar 컴포넌트는 계속 살아있으므로 onClose따로 받아서 처리해줘야 함
  const handleClickMoveToPostPage = () => {
    navigate(`/post/${notification.post}`);
  };

  // TODO: 추가구현
  // 유저 이름 클릭 시,해당 유저 페이지로 이동

  // 유저이름이 내 포스트제목 포스트에 좋아요를 눌렀습니다 를 렌더링 해줘야 함
  return (
    <LikeListItemContent onClick={handleClickMoveToPostPage}>
      <UserFullNameSpan>{notification.author.fullName}</UserFullNameSpan>님이 내
      <PostTitleSpan>{postTitle}</PostTitleSpan> 포스트에 좋아요를 눌렀습니다.
    </LikeListItemContent>
  );
};

export default LikeNotificationItem;

const LikeListItemContent = styled.p`
  box-sizing: border-box;
`;

const UserFullNameSpan = styled.span`
  box-sizing: border-box;
`;

const PostTitleSpan = styled.span`
  box-sizing: border-box;
`;
