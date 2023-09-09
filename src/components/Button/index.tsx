import styled from '@emotion/styled';

interface ButtonProps {
	text: string;
	disabled?: boolean;
	onClick?: () => void;
}

const Button = ({ text, onClick, disabled = false }: ButtonProps) => {
	return (
		<ButtonStyled
			disabled={disabled}
			onClick={onClick}>
			{text}
		</ButtonStyled>
	);
};

export default Button;

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
