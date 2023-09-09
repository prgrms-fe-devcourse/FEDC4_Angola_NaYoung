import LinkButton from '../LinkButton';

const CommonMenubar = () => {
  return (
    <>
      <LinkButton
        to="/"
        style={{ backgroundColor: 'orange', fontSize: 20, fontWeight: 'bold' }}>
        홈
      </LinkButton>
      <LinkButton to="/search/*">검색</LinkButton>
    </>
  );
};

export default CommonMenubar;
