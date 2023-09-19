import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';

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
        <SelectContainer>
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
          <SortDirection>
            <Icon
              name="select_down"
              size="26"
            />
          </SortDirection>
        </SelectContainer>
      )}

      <Title>
        {keyword || ''}
        {title}
      </Title>

      {keyword && (
        <TabBar>
          <TabBarList
            className={target === 'user' ? 'bold' : ''}
            onClick={() => handleClickTabBar('user')}>
            유저
          </TabBarList>
          |
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
  height: 48px;
  padding: 0px 60px;
  position: relative;
  align-items: center;
  width: 100%;
  overflow: hidden;
  border-radius: 55px 55px 0px 0px;
  border: ${ANGOLA_STYLES.border.default};
  background: var(--dark, #9a9a9a);
`;

const SelectContainer = styled.div`
  position: relative;
  position: absolute;
  top: 50%;
  left: 160px;
  transform: translate(-50%, -50%);
`;

const SortSelect = styled.select`
  display: flex;
  width: 200px;
  height: 40px;
  padding: 0px 20px 0px 44px;
  border-radius: 40px;
  border: ${ANGOLA_STYLES.border.default};
  background: var(--white, #fff);
  appearance: none;
  outline: none;
  cursor: pointer;
`;

const SortDirection = styled.div`
  position: absolute;
  top: 0;
  right: 16px;
  bottom: 0;
  cursor: pointer;
  pointer-events: none;
`;

const Title = styled.div`
  color: var(--white, #fff);
  font-size: ${ANGOLA_STYLES.textSize.title};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TabBar = styled.ul`
  width: 200px;
  height: 40px;
  display: flex;
  padding: 0px 20px;
  list-style: none;
  justify-content: space-between;
  align-items: center;
  color: var(--white, #fff);
  position: absolute;
  top: 50%;
  right: -60px;
  transform: translate(-50%, -50%);
`;

const TabBarList = styled.li`
  color: var(--white, #fff);
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  cursor: pointer;
  &.bold {
    text-shadow:
      -2.5px 0 black,
      0 2.5px black,
      2.5px 0 black,
      0 -2.5px black;
  }
`;
