import LinkButton from '../LinkButton';

const NonAuthNavbar = () => {
	return (
		<>
			<LinkButton to="/login">로그인</LinkButton>
			<LinkButton to="/signup">회원가입</LinkButton>
		</>
	);
};

export default NonAuthNavbar;
