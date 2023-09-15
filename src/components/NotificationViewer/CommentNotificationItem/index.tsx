import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Notification } from '@type';
import { useFetchPost } from '@apis/post';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';

const CommentNotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  const navigate = useNavigate();

  const { postData, postRefetch, isPostSuccess } = useFetchPost(
    notification.post!,
  );

  useEffect(() => {
    postRefetch();
  }, [isPostSuccess, postRefetch]);

  const { title: postTitle } = splitPostBySeparator(postData.title);

  // TODO: title span 태그 및, 아이템 전체에 등록할 핸들러
  // 1. 포스트 페이지로 이동
  // 2. 이 Viewer닫기 => 페이지 이동해도 NavBar 컴포넌트는 계속 살아있으므로 onClose따로 받아서 처리해줘야 함
  const handleClickMoveToPostPage = () => {
    navigate(`/post/${notification.post}`);
  };

  // TODO: 추가구현
  // 유저 이름 클릭 시,해당 유저 페이지로 이동

  return (
    <CommentListItemContent onClick={handleClickMoveToPostPage}>
      <UserFullNameSpan>{notification.author.fullName}</UserFullNameSpan>님이 내
      <PostTitleSpan>{postTitle}</PostTitleSpan> 포스트에 댓글을 남겼습니다.
    </CommentListItemContent>
  );
};

export default CommentNotificationItem;

const CommentListItemContent = styled.p`
  box-sizing: border-box;
`;

const UserFullNameSpan = styled.span`
  box-sizing: border-box;
`;

const PostTitleSpan = styled.span`
  box-sizing: border-box;
`;
