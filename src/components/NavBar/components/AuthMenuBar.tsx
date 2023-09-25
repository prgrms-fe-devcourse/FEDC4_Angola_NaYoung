import { useState } from 'react';
import { Icon, LinkButton } from '@components';
import { NotificationViewer } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';

const AuthMenuBar = () => {
  const [isNotificationViewerShow, setIsNotificationViewerShow] =
    useState(false);

  return (
    <>
      <RightMenuLinkButton to="/create-post">
        {' '}
        <Icon
          name="post"
          size={'30'}
        />
      </RightMenuLinkButton>
      <RightMenuLinkButton to="/mypage">
        <Icon
          name="user"
          size={'30'}
        />
      </RightMenuLinkButton>
      <NotificationButton
        onClick={() => {
          setIsNotificationViewerShow((prev) => !prev);
        }}>
        <Icon
          name="alert"
          size={'30'}
        />
      </NotificationButton>

      {isNotificationViewerShow && (
        <NotificationViewer
          handleClickCloseViewer={() => {
            setIsNotificationViewerShow(false);
          }}
        />
      )}
    </>
  );
};

export default AuthMenuBar;

const RightMenuLinkButton = styled(LinkButton)`
  width: auto;
  height: 56px;
  border-radius: 44px;
`;

const NotificationButton = styled.button`
  box-sizing: border-box;
  display: flex;
  height: 56px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 44px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};
  cursor: pointer;

  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }
`;
