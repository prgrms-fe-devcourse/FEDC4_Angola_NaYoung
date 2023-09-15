import LinkButton from '@components/LinkButton';

const NonAuthMenuBar = () => {
  return (
    <>
      <LinkButton to="/login">로그인</LinkButton>
      <LinkButton to="/signup">회원가입</LinkButton>
    </>
  );
};

export default NonAuthMenuBar;
