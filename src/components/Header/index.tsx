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
      {sortProps && (
        <SortSelect
          id="orderSelect"
          name="order"
          value={selectValue}
          onChange={(e) => {
            handleChangeSelect(e.target.value);
          }}>
          {target === 'user' ? (
            <>
              <option value="follower">팔로워 순</option>
              <option value="level">레벨 순</option>
            </>
          ) : (
            <>
              <option value="recent">최신 순</option>
              <option value="like">좋아요 순</option>
            </>
          )}
        </SortSelect>
      )}

      <Title>
        <Keyword>{keyword || ''}</Keyword>
        {title}
      </Title>

      {keyword && (
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
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  height: 84px;
  padding: 0px 60px;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  border-radius: 55px 55px 0px 0px;
  border-bottom: 4px solid var(--text, #404040);
  background: var(--dark, #9a9a9a);
`;

const SortSelect = styled.select`
  position: absolute;
  left: 40px;
  width: 100px;
  border-radius: 20px;
  cursor: pointer;
  padding: 5px 10px;
  outline: none;
`;

const Title = styled.div`
  color: var(--white, #fff);
  justify-self: center;
  font-family: Noto Sans KR;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const Keyword = styled.span`
  font-weight: 600;
`;

const TabBar = styled.ul`
  display: flex;
  position: absolute;
  right: 40px;
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
