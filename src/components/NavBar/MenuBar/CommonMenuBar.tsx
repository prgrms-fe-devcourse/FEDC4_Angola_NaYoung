import LinkButton from '@components/NavBar/LinkButton';
import SearchBar from '@components/SearchBar';
import useCurrentPage from '@hooks/useCurrentPage';

const SEARCH = 'search';

const CommonMenuBar = () => {
  const { name } = useCurrentPage();
  return (
    <>
      <LinkButton
        to="/"
        style={{ backgroundColor: 'orange', fontSize: 20, fontWeight: 'bold' }}>
        홈
      </LinkButton>
      {name === SEARCH ? (
        <SearchBar />
      ) : (
        <LinkButton to="/search">검색</LinkButton>
      )}
    </>
  );
};

export default CommonMenuBar;