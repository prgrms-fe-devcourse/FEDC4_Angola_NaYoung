import { PostList, UserList } from '@components';
import { PARAM_VALUES, SEARCH_VALUES } from '@constants';
import styled from '@emotion/styled';

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
