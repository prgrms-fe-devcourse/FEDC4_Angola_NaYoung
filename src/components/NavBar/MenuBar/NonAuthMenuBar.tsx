import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';

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
