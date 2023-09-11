import { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

const Button = ({ text, onClick, disabled = false, style }: ButtonProps) => {
  return (
    <ButtonStyled
      disabled={disabled}
      onClick={handleClick}
      style={style}>
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
  font-size: 20px;

  &:hover {
    background-color: rgba(60, 100, 105, 0.3);
  }
`;
