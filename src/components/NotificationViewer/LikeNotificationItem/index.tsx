import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Notification } from '@type';
import { useFetchPost, useFetchPostNotification } from '@apis/post';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';

const LikeNotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  const navigate = useNavigate();

  // 알림 객체의 postId 값인 notification.post를 가지고 포스트 정보 조회 API 호출
  const { postData, isPostSuccess } = useFetchPostNotification(
    notification.post!,
  );
  // FIXME: 이게 비동기적으로 실행되기 때문에, 밑에 있는 postData의 title을 불러오는 부분이 먼저 실행되서 그런거 아닐까

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
    isPostSuccess && (
      <LikeListItemContent onClick={handleClickMoveToPostPage}>
        <UserFullNameSpan>{notification.author.fullName}</UserFullNameSpan>님이
        내
        <PostTitleSpan>
          {splitPostBySeparator(postData.title).title}
        </PostTitleSpan>{' '}
        포스트에 좋아요를 눌렀습니다.
      </LikeListItemContent>
    )
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
