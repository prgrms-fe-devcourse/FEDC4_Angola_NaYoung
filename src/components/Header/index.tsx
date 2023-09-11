import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

interface HeaderProps {
  title: string;
  sortProps?: {
    target: string;
    sort: string;
  };
  keyword?: string;
}

const Header = ({ title, sortProps, keyword }: HeaderProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const target = sortProps?.target;
  const sort = sortProps?.sort;

  const [selectValue, setSelectValue] = useState(sort);

  const handleChangeSelect = (value: string) => {
    searchParams.set('sort', value);
    setSelectValue(value);
    setSearchParams(searchParams);
  };

  const handleClickTabBar = (value: string) => {
    if (value === 'user') {
      if (target === 'user') {
        return;
      }
      navigate('/search/user?sort=follower');
    }

    if (value === 'post') {
      if (target === 'post') {
        return;
      }
      navigate('/search/post?sort=recent');
    }
  };

  return (
    <Container>
      {sortProps ? (
        <SortSelect
          id="orderSelect"
          name="order"
          value={selectValue}
          onChange={(e) => {
            handleChangeSelect(e.target.value);
          }}>
          {target === 'user' ? (
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
        <Keyword>{keyword || ''}</Keyword>
        {title}
      </Title>

      {keyword ? (
        <TabBar>
          <TabBarList
            className={target === 'user' ? 'bold' : ''}
            onClick={() => handleClickTabBar('user')}>
            유저
          </TabBarList>
          <TabBarList
            className={target === 'post' ? 'bold' : ''}
            onClick={() => handleClickTabBar('post')}>
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
