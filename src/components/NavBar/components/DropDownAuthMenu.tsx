import { useState } from 'react';
import { Icon, LinkButton, NotificationViewer } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';

const DropDownAuthMenu = () => {
  const [isNotificationViewerShow, setIsNotificationViewerShow] =
    useState(false);
  const [isDropped, setIsDropped] = useState(false);

  return (
    <DropDownWrapper>
      <Drop onClick={() => setIsDropped((prev) => !prev)}>
        <Icon
          name="menu"
          size={'30'}
        />
      </Drop>
      {isDropped && (
        <DropDownContainer>
          <DropDownLinkButton
            to="/create-post"
            onClick={() => setIsDropped(false)}>
            {' '}
            <Icon
              name="post"
              size={'20'}
            />
            <Text>포스트 작성</Text>
          </DropDownLinkButton>
          <DropDownLinkButton
            to="/mypage"
            onClick={() => setIsDropped(false)}>
            <Icon
              name="user"
              size={'20'}
            />
            <Text>마이페이지</Text>
          </DropDownLinkButton>
          <NotificationButton
            onClick={() => {
              setIsDropped(false);
              setIsNotificationViewerShow((prev) => !prev);
            }}>
            <Icon
              name="alert"
              size={'20'}
            />
            <Text>알림</Text>
          </NotificationButton>
        </DropDownContainer>
      )}
      {isNotificationViewerShow && (
        <NotificationViewer
          handleClickCloseViewer={() => {
            setIsNotificationViewerShow(false);
          }}
        />
      )}
    </DropDownWrapper>
  );
};

export default DropDownAuthMenu;

const DropDownWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const Drop = styled.button`
  box-sizing: border-box;
  display: flex;
  width: 60px;
  height: 60px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  cursor: pointer;
  border-radius: 30px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};
  transition: 0.2s;
  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
  border: ${ANGOLA_STYLES.border.default};
`;

const DropDownLinkButton = styled(LinkButton)`
  padding: 8px;
  width: 120px;
  height: fit-content;
  border-radius: 0;
  box-shadow: none;
  border: none;
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  &:hover {
    background-color: ${ANGOLA_STYLES.color.gray};
    box-shadow: none;
  }
`;

const Text = styled.div`
  white-space: nowrap;
  font-size: ${ANGOLA_STYLES.textSize.text};
`;

const NotificationButton = styled.button`
  padding: 8px;
  width: 120px;
  height: fit-content;
  border-radius: 0;
  box-shadow: none;
  border: none;
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  background-color: ${ANGOLA_STYLES.color.white};
  &:hover {
    background-color: ${ANGOLA_STYLES.color.gray};
    box-shadow: none;
  }
`;
