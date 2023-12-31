import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { TAB_BAR_VALUE } from '../constants';
import { handleClickTabBar } from '../utils';

interface TabBarListProps {
  name: string;
  TARGET_VALUE?: string;
}

const TabBarList = ({ name, TARGET_VALUE }: TabBarListProps) => {
  const navigate = useNavigate();
  return (
    <List
      className={TARGET_VALUE === name ? 'select' : ''}
      onClick={() =>
        handleClickTabBar({ value: name, TARGET_VALUE, navigate })
      }>
      {name === 'user' ? TAB_BAR_VALUE.USER : TAB_BAR_VALUE.POST}
    </List>
  );
};

export default TabBarList;

const List = styled.li`
  color: ${ANGOLA_STYLES.color.white};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.select {
    text-shadow:
      -2.5px 0 black,
      0 2.5px black,
      2.5px 0 black,
      0 -2.5px black;
  }

  @media (max-width: 1000px) {
    font-size: ${ANGOLA_STYLES.textSize.text};
  }
`;
