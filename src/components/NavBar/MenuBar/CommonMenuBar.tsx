import styled from '@emotion/styled';
import LinkButton from '@components/LinkButton';
import SearchBar from '@components/SearchBar';
import useCurrentPage from '@hooks/useCurrentPage';
import SearchIcon from '@styles/icons/SearchIcon';

const SEARCH = 'search';

const CommonMenuBar = () => {
  const { name } = useCurrentPage();
  return (
    <>
      <StyledLinkButton to="/">홈</StyledLinkButton>
      {name === SEARCH ? (
        <SearchBar />
      ) : (
        <StyledLinkButton to="/search">
          <SearchIcon />
        </StyledLinkButton>
      )}
    </>
  );
};

export default CommonMenuBar;

const StyledLinkButton = styled(LinkButton)`
  box-sizing: border-box;
  display: flex;
  width: 88px;
  height: 88px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 44px;
  border: 4px solid var(--text, #404040);
  background: var(--white, #fff);
  box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.25);
`;
