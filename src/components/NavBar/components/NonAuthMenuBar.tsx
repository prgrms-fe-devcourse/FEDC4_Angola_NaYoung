import { LinkButton } from '@components';
import styled from '@emotion/styled';

const NonAuthMenuBar = () => {
  return (
    <>
      <RightMenuLinkButton to="/login">login</RightMenuLinkButton>
      <RightMenuLinkButton to="/signup">sign up</RightMenuLinkButton>
    </>
  );
};

export default NonAuthMenuBar;

const RightMenuLinkButton = styled(LinkButton)`
  width: auto;
  height: 56px;
  border-radius: 44px;
`;
