import { authInfoState } from '@/atoms';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { AuthNavbar, CommonNavbar, NonAuthNavbar } from './components';

const Navbar = () => {
	const auth = useRecoilValue(authInfoState);
	return (
		<NavbarContainer>
			<CommonNavbar />
			<MenubarContainer>
				{auth?.token ? <AuthNavbar /> : <NonAuthNavbar />}
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
