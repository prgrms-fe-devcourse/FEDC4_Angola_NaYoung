import { useCurrentPage } from '@hooks';
import Icon from '@components/Icon';
import LinkButton from '@components/LinkButton';
import SearchBar from '@components/SearchBar';

const SEARCH = 'search';

const CommonMenuBar = () => {
  const { name } = useCurrentPage();

  return (
    <>
      <LinkButton to="/">
        <img
          src="/images/LOGO_SMALL.svg"
          alt="logo"
          width={'54px'}
        />
      </LinkButton>
      {name === SEARCH ? (
        <SearchBar />
      ) : (
        <LinkButton to="/search">
          <Icon
            name="search"
            size={'30'} // TODO:MinwooP - 아이콘 크기도 commonStyle에 유틸화 ?
          />
        </LinkButton>
      )}
    </>
  );
};

export default CommonMenuBar;
