import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@store/auth';
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
  box-sizing: border-box;
  display: flex;
  max-height: 100px;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`;

const MenuBarContainer = styled.div`
  position: relative; // NotificationViewer를 absolute로 보여주기 위해 
  box-sizing: border-box;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;
