import { Icon } from '@components';
import { PARAM_VALUES, SEARCH_VALUES } from '@constants';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { TabBarList } from './components';
import { SELECT_OPTION } from './constants';
import { useSelect } from './hooks';
import { getTruncatedKeyword } from './utils';

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

  const { handleChangeSelect } = useSelect({ SORT_VALUE });

  return (
    <Container>
      {sortProps ? (
        <SelectContainer>
          <SortSelect
            value={SORT_VALUE}
            onChange={(e) => {
              handleChangeSelect(e.target.value);
            }}>
            {TARGET_VALUE === PARAM_VALUES.TARGET.USER ? (
              <>
                <option value={SEARCH_VALUES.SORT.FOLLOWER}>
                  {SELECT_OPTION.FOLLOWER}
                </option>
                <option value={SEARCH_VALUES.SORT.LEVEL}>
                  {SELECT_OPTION.LEVEL}
                </option>
              </>
            ) : (
              <>
                <option value={SEARCH_VALUES.SORT.RECENT}>
                  {SELECT_OPTION.RECENT}
                </option>
                <option value={SEARCH_VALUES.SORT.LIKE}>
                  {SELECT_OPTION.LIKE}
                </option>
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
      ) : (
        <div />
      )}

      <Title>
        {keyword ? getTruncatedKeyword({ keyword }) || '' : null}
        {title}
      </Title>

      {keyword ? (
        <TabBar>
          <TabBarList
            name={PARAM_VALUES.TARGET.USER}
            TARGET_VALUE={TARGET_VALUE}
          />
          |
          <TabBarList
            name={PARAM_VALUES.TARGET.POST}
            TARGET_VALUE={TARGET_VALUE}
          />
        </TabBar>
      ) : (
        <div />
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 20px;
  height: 48px;
  padding: 0px 60px;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 55px 55px 0px 0px;
  background: ${ANGOLA_STYLES.color.dark};
  border-bottom: ${ANGOLA_STYLES.border.default};
`;

const SelectContainer = styled.div`
  position: relative;
`;

const SortSelect = styled.select`
  display: flex;
  width: 200px;
  height: 40px;
  padding: 0px 20px 0px 44px;
  border-radius: 40px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  appearance: none;
  outline: none;
  cursor: pointer;

  @media (max-width: 1000px) {
    width: 130px;
    padding: 0px 20px;
    font-size: ${ANGOLA_STYLES.textSize.text};
  }
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

  @media (max-width: 1000px) {
    font-size: ${ANGOLA_STYLES.textSize.titleSm};
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const TabBar = styled.ul`
  height: 100%;
  display: flex;
  list-style: none;
  align-items: center;
  gap: 40px;
  color: ${ANGOLA_STYLES.color.white};

  @media (max-width: 1000px) {
    gap: 20px;
  }
`;
