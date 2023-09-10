import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPathname } from '@utils/index';
import LinkButton from '../LinkButton';
import SearchBar from '../SearchBar';

const SEARCH = 'search';

const CommonMenubar = () => {
  const navigate = useNavigate();
  const isSearchPage = getPathname(1) === SEARCH;
  const [searchBarVisible, setSearchBarVisible] = useState(isSearchPage);

  const onClickSearchButton = () => {
    if (!isSearchPage) {
      setSearchBarVisible(true);
      navigate('/search');
    }
  };

  const renderSearchBar = isSearchPage && searchBarVisible;

  return (
    <>
      <LinkButton
        to="/"
        style={{ backgroundColor: 'orange', fontSize: 20, fontWeight: 'bold' }}>
        홈
      </LinkButton>
      {!renderSearchBar && (
        <button onClick={onClickSearchButton}>검색버튼</button>
      )}
      {renderSearchBar && <SearchBar />}
    </>
  );
};

export default CommonMenubar;
