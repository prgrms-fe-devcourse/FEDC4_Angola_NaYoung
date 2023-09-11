import { authInfoState } from '@atoms';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { AuthMenuBar, CommonMenuBar, NonAuthMenuBar } from './MenuBar';

const NavBar = () => {
  const auth = useRecoilValue(authInfoState);
  return (
    <NavBarContainer>
      <CommonMenuBar />
      <MenuBarContainer>
        {auth?.token ? <AuthMenuBar /> : <NonAuthMenuBar />}
      </MenuBarContainer>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenuBarContainer = styled.div`
  display: flex;
  margin-left: auto;
`;
