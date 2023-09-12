import LinkButton from '@components/NavBar/LinkButton';

const AuthMenuBar = () => {
  return (
    <>
      <LinkButton to="/mypage">마이페이지</LinkButton>
      <LinkButton to="/create-post">포스트 작성</LinkButton>
    </>
  );
};

export default AuthMenuBar;
