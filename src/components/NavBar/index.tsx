import { authInfoState } from '@atoms';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { AuthMenuBar, CommonMenuBar, NonAuthMenuBar } from './MenuBar';

const NavBar = () => {
  const auth = useRecoilValue(authInfoState);
  return (
    <NavBarContainer>
      <MenuBarContainer>
        <CommonMenuBar />
      </MenuBarContainer>
      <MenuBarContainer>
        {auth?.token ? <AuthMenuBar /> : <NonAuthMenuBar />}
      </MenuBarContainer>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  max-height: 144px;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`;

const MenuBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;
