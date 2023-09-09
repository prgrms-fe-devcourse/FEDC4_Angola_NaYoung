import styled from '@emotion/styled';

interface ButtonType {
	text: string;
	disabled?: boolean;
	onClick?: () => void;
}

const Button = ({ text, onClick, disabled = false }: ButtonType) => {
	return (
		<ButtonStyled
			disabled={disabled}
			onClick={onClick}>
			{text}
		</ButtonStyled>
	);
};

const ButtonStyled = styled.button`
	border-radius: 54px;
	width: 100px;
	height: 30px;
	border: 4px solid black;
	background-color: white;
	text-size: 20px;

	&:hover {
		background-color: rgba(60, 100, 105, 0.3);
	}
`;

export default Button;
