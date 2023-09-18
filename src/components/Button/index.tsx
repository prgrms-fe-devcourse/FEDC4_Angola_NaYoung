import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';

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

const ButtonStyled = styled.button<{ size: string }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-start;
  height: 88px;
  padding: 16px 24px;
  background-color: ${ANGOLA_STYLES.color.white};
  border-radius: 44px;
  border: ${ANGOLA_STYLES.border.default};

  ${(props) =>
    props.size === 'sm'
      ? `width: 88px; box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};`
      : `width: 240px; box-shadow: ${ANGOLA_STYLES.shadow.button.default};`}

  &:hover {
    border: 3px solid ${ANGOLA_STYLES.color.text};

    ${(props) =>
      props.size === 'sm'
        ? `box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};`
        : `box-shadow: ${ANGOLA_STYLES.shadow.button.hover};`}
  }
`;
