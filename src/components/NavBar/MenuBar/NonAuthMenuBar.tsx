import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';

const NonAuthMenuBar = () => {
  return (
    <>
      <RightMenuLinkButton to="/login">로그인</RightMenuLinkButton>
      <RightMenuLinkButton to="/signup">회원가입</RightMenuLinkButton>
    </>
  );
};

export default NonAuthMenuBar;

const RightMenuLinkButton = styled(LinkButton)`
  width: auto;
  height: 56px;
  border-radius: 44px;
`;
