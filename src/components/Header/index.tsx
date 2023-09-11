import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { getPathname } from '@utils';
import { getTitle } from './utils';

const Header = () => {
  const INITIAL_KEYWORD =
    getPathname(2) === 'post' ? '전체 포스트' : '전체 유저';

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectValue, setSelectValue] = useState<string>('follower');
  const [keyword, setKeyword] = useState(INITIAL_KEYWORD);
  const [tabValue, setTabValue] = useState('post');
  const title = getTitle(location.pathname);

  const onChangeSelect = (value: string) => {
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  const onClickTabBar = (value: string) => {
    const checkPath = getPathname(2);

    if (value === 'user') {
      if (checkPath === 'user') {
        return;
      }

      navigate('/search/user?sort=follower');
    }

    if (value === 'post') {
      if (checkPath === 'post') {
        return;
      }

      navigate('/search/post?sort=recent');
    }
  };

  useEffect(() => {
    const currentSort = searchParams.get('sort');
    const currentKeyword = searchParams.get('keyword');

    if (currentSort) {
      setSelectValue(currentSort);
    }

    if (currentKeyword) {
      setKeyword(currentKeyword);
    }
  }, [searchParams]);

  useEffect(() => {
    setTabValue(getPathname(2) ?? 'post');

    const currentKeyword = searchParams.get('keyword');

    if (!currentKeyword) {
      setKeyword(INITIAL_KEYWORD);
    }
  }, [tabValue, location.pathname, INITIAL_KEYWORD, searchParams]);

  return (
    <Container>
      {['', 'post', 'search'].some((path) => path === getPathname(1)) ? (
        <SortSelect
          id="orderSelect"
          name="order"
          value={selectValue}
          onChange={(e) => {
            onChangeSelect(e.target.value);
          }}>
          {tabValue === 'user' ? (
            <>
              <option value="follower">팔로워순</option>
              <option value="like">좋아요순</option>
            </>
          ) : (
            <>
              <option value="recent">최신순</option>
              <option value="like">좋아요순</option>
            </>
          )}
        </SortSelect>
      ) : (
        <div />
      )}

      <Title>
        <Keyword>
          {keyword && getPathname(1) === 'search' ? keyword : null}
        </Keyword>
        {title}
      </Title>

      {getPathname(1) === 'search' ? (
        <TabBar>
          <TabBarList
            className={tabValue === 'user' ? 'bold' : ''}
            onClick={() => onClickTabBar('user')}>
            유저
          </TabBarList>
          <TabBarList
            className={tabValue === 'post' ? 'bold' : ''}
            onClick={() => onClickTabBar('post')}>
            포스트
          </TabBarList>
        </TabBar>
      ) : (
        <div />
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border: 1px solid black;
  border-radius: 20px 20px 0 0;
  padding: 0 10px;
  height: 50px;
`;
const SortSelect = styled.select`
  border-radius: 20px;
  cursor: pointer;
  padding: 5px 10px;
  outline: none;
`;

const Title = styled.div``;

const Keyword = styled.span`
  font-weight: 600;
`;

const TabBar = styled.ul`
  display: flex;
  list-style: none;
`;

const TabBarList = styled.li`
  padding-left: 10px;
  cursor: pointer;

  &:first-of-type {
    padding-right: 10px;
    border-right: 1px solid black;
  }

  &.bold {
    font-weight: 800;
  }
`;
