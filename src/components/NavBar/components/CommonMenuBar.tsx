import { Icon, LinkButton, SearchBar } from '@components';
import { useCurrentPage } from '@hooks';

const SEARCH = 'search';

const CommonMenuBar = () => {
  const { name } = useCurrentPage();

  return (
    <>
      <LinkButton to="/">
        <img
          src="/images/LOGO_SMALL.svg"
          alt="logo"
          width={'48px'}
        />
      </LinkButton>
      {name === SEARCH ? (
        <SearchBar />
      ) : (
        <LinkButton to="/search">
          <Icon
            name="search"
            size={'30'}
          />
        </LinkButton>
      )}
    </>
  );
};

export default CommonMenuBar;
