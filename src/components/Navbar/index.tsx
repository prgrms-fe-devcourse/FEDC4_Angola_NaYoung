import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@atoms/index';
import { AuthMenubar, CommonMenubar, NonAuthMenubar } from './Menubar';

const Navbar = () => {
  const auth = useRecoilValue(authInfoState);
  return (
    <NavbarContainer>
      <CommonMenubar />
      <MenubarContainer>
        {auth?.token ? <AuthMenubar /> : <NonAuthMenubar />}
      </MenubarContainer>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenubarContainer = styled.div`
  display: flex;
  margin-left: auto;
`;
