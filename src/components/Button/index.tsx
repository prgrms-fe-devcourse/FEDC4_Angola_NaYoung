import { CSSProperties } from 'react';
import styled from '@emotion/styled';

// interface ButtonProps {
//   text: string;
//   disabled?: boolean;
//   handleClick?: () => void;
//   style?: CSSProperties;
//   size?: 'sm' | 'md';
// }

interface ButtonProps {
  children?: string;
  disabled?: boolean;
  handleClick?: () => void;
  style?: CSSProperties;
  size?: 'sm' | 'md';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  children,
  disabled = false,
  handleClick,
  style,
  size = 'sm',
  type = 'submit',
}: ButtonProps) => {
  return (
    <ButtonStyled
      size={size}
      disabled={disabled}
      onClick={handleClick}
      style={style}
      type={type}>
      {children}
    </ButtonStyled>
  );
};

export default Button;

// Todo(hayamaster): pxToRem util함수 구현 되면 import해서 적용시키기.
const pxToRem = (pxValue: number) => {
  return `${pxValue / 16}rem`;
};

const ButtonStyled = styled.button<{ size: string }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-start;
  height: ${pxToRem(88)};
  padding: ${pxToRem(16)} ${pxToRem(24)};
  background-color: #fff;
  border-radius: ${pxToRem(44)};
  border: ${pxToRem(2)} solid #404040;

  ${(props) =>
    props.size === 'sm'
      ? `width: ${pxToRem(88)}; box-shadow: 0px 4px 0px 0px #404040;`
      : `width: ${pxToRem(240)}; box-shadow: 0px 6px 0px 0px #404040;`}

  &:hover {
    border: ${pxToRem(3)} solid #404040;

    ${(props) =>
      props.size === 'sm'
        ? `box-shadow: 0px 6px 0px 0px #404040;`
        : `box-shadow: 0px 10px 0px 0px #404040;`}
  }
`;
