import styled from '@emotion/styled';
import PostList from '@components/PostList';
import UserList from '@components/UserList';

interface SearchProps {
  target: string;
  keyword?: string;
  sort: string;
}

const SearchPage = ({ target = 'post', keyword, sort }: SearchProps) => {
  return (
    <Container>
      {target === 'user' ? (
        <UserList
          keyword={keyword}
          sort={sort}
        />
      ) : (
        <PostList
          keyword={keyword}
          sort={sort}
        />
      )}
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  width: 80%;
  border: 1px solid black;
  border-top: none;
  padding: 20px 10px;
`;
