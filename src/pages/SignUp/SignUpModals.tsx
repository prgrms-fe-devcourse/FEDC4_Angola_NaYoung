import styled from '@emotion/styled';

interface SignUpModalsProps {
	onClick: () => void;
}

export const SignUpSuccessModal = ({ onClick }: SignUpModalsProps) => {
	return (
		<Modal>
			<Content>
				<p>회원 가입이 완료되었습니다!</p>
				<button onClick={onClick}>확인</button>
			</Content>
		</Modal>
	);
};

export const SignUpFailModal = ({ onClick }: SignUpModalsProps) => {
	return (
		<Modal>
			<Content>
				<p>회원 가입에 실패하였습니다!</p>
				<button onClick={onClick}>확인</button>
			</Content>
		</Modal>
	);
};

const Modal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10;
`;

const Content = styled.div`
	background-color: #fff;
	border-radius: 5px;
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
`;
