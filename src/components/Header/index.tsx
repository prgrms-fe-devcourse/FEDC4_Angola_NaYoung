import styled from '@emotion/styled';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import useSelect from './Hooks/useSelect';
import TabBarList from './TabBarList';
import { SELECT_OPTION } from './constants';

interface HeaderProps {
  title: string;
  sortProps?: {
    target: string;
    sort: string;
  };
  keyword?: string;
}

const Header = ({ title, sortProps, keyword }: HeaderProps) => {
  const TARGET_VALUE = sortProps?.target;
  const SORT_VALUE = sortProps?.sort;

  const { selectValue, handleChangeSelect } = useSelect({ SORT_VALUE });

  return (
    <Container>
      {sortProps && (
        <SelectContainer>
          <SortSelect
            value={selectValue}
            onChange={(e) => {
              handleChangeSelect(e.target.value);
            }}>
            {TARGET_VALUE === 'user' ? (
              <>
                <option value="follower">{SELECT_OPTION.FOLLOWER}</option>
                <option value="level">{SELECT_OPTION.LEVEL}</option>
              </>
            ) : (
              <>
                <option value="recent">{SELECT_OPTION.RECENT}</option>
                <option value="like">{SELECT_OPTION.LIKE}</option>
              </>
            )}
          </SortSelect>
          <SortIcon>
            <Icon
              name="select_down"
              size="26"
            />
          </SortIcon>
        </SelectContainer>
      )}

      <Title>
        {keyword || ''}
        {title}
      </Title>

      {keyword && (
        <TabBar>
          <TabBarList
            name="user"
            TARGET_VALUE={TARGET_VALUE}
          />
          |
          <TabBarList
            name="post"
            TARGET_VALUE={TARGET_VALUE}
          />
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
  border-radius: 55px 55px 0px 0px;
  background: ${ANGOLA_STYLES.color.dark};
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
  background: ${ANGOLA_STYLES.color.white};
  appearance: none;
  outline: none;
  cursor: pointer;
`;

const SortIcon = styled.div`
  position: absolute;
  top: 0;
  right: 16px;
  bottom: 0;
  cursor: pointer;
  pointer-events: none;
`;

const Title = styled.div`
  color: ${ANGOLA_STYLES.color.white};
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
  color: ${ANGOLA_STYLES.color.white};
  position: absolute;
  top: 50%;
  right: -60px;
  transform: translate(-50%, -50%);
`;
