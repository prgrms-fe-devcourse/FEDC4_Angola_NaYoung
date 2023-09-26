import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { useWindowWidth } from '@hooks/useWindowWidth';
import { authInfoState } from '@store/auth';
import {
  AuthMenuBar,
  CommonMenuBar,
  DropDownAuthMenu,
  DropDownNonAuthMenu,
  NonAuthMenuBar,
} from './components';

const NavBar = () => {
  const auth = useRecoilValue(authInfoState);
  const windowWidth = useWindowWidth();

  const MenuBar = () => {
    if (auth) {
      return windowWidth > 800 ? <AuthMenuBar /> : <DropDownAuthMenu />;
    }
    return windowWidth > 800 ? <NonAuthMenuBar /> : <DropDownNonAuthMenu />;
  };

  return (
    <NavBarContainer>
      <MenuBarContainer>
        <CommonMenuBar />
      </MenuBarContainer>
      <MenuBarContainer>{<MenuBar />}</MenuBarContainer>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  max-height: 100px;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`;

const MenuBarContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
