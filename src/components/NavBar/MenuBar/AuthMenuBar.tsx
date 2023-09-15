import { useState } from 'react';
import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';
import NotificationViewer from '@components/NotificationViewer';

const AuthMenuBar = () => {
  const [isNotificationViewerShow, setIsNotificationViewerShow] =
    useState(false);
    
  return (
    <>
      <StyledLinkButton to="/create-post">포스트 작성</StyledLinkButton>
      <StyledLinkButton to="/mypage">마이페이지</StyledLinkButton>
      <StyledNotificaionButton
        onClick={() => {
          setIsNotificationViewerShow((prev) => !prev);
        }}>
        알림 목록
      </StyledNotificaionButton>
      {isNotificationViewerShow && <NotificationViewer/>}
    </>
  );
};

export default AuthMenuBar;

const StyledLinkButton = styled(LinkButton)`
  box-sizing: border-box;
  display: flex;
  width: 88px;
  height: 88px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 44px;
  border: 4px solid var(--text, #404040);
  background: var(--white, #fff);
  box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.25);
`;

const StyledNotificaionButton = styled.button`
  box-sizing: border-box;
  display: flex;
  width: 88px;
  height: 88px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 44px;
  border: 4px solid var(--text, #404040);
  background: var(--white, #fff);
  box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.25);
`;
