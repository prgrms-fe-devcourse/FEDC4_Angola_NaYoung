import styled from '@emotion/styled';
import PostList from '@components/PostList';
import UserList from '@components/UserList';
import { PARAM_VALUES, SEARCH_VALUES } from '@constants/index';

interface SearchProps {
  target?: string;
  keyword?: string;
  sort?: string;
}

const SearchPage = ({ target = 'post', keyword, sort }: SearchProps) => {
  return (
    <Container>
      {target === PARAM_VALUES.TARGET.USER ? (
        <UserList
          keyword={keyword}
          sort={sort || SEARCH_VALUES.SORT.FOLLOWER}
        />
      ) : (
        <PostList
          keyword={keyword}
          sort={sort || SEARCH_VALUES.SORT.RECENT}
        />
      )}
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  width: 100%;
  padding-bottom: 32px;
`;
