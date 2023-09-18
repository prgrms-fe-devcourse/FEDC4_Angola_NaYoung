import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import Icon from '@components/Icon';

const AuthMenuBar = () => {
  return (
    <>
      <RightMenuLinkButton to="/create-post"> <Icon
            name="post"
            size={"30"} 
          /></RightMenuLinkButton>
      <RightMenuLinkButton to="/mypage"><Icon
            name="user"
            size={"30"} 
          /></RightMenuLinkButton>
      <NotificationButton><Icon
            name="alert"
            size={"30"} 
          /></NotificationButton>
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

  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }
`;
