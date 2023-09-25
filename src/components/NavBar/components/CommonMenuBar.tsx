import { Icon, LinkButton, SearchBar } from '@components';
import { useCurrentPage, useWindowWidth } from '@hooks';

const SEARCH = 'search';

const CommonMenuBar = () => {
  const { name } = useCurrentPage();
  const windowWidth = useWindowWidth();

  return (
    <>
      {!(windowWidth <= 400 && name === SEARCH) && (
        <LinkButton to="/">
          <img
            src="/images/LOGO_SMALL.svg"
            alt="logo"
            width={'48px'}
          />
        </LinkButton>
      )}
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
