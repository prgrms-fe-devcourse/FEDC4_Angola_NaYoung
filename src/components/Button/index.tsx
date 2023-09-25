import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  size?: 'sm' | 'md';
  toggle?: boolean;
}

const Button = ({
  children,
  size = 'sm',
  type = 'submit',
  toggle,
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyled
      type={type}
      toggle={toggle}
      size={size}
      {...props}>
      {children}
    </ButtonStyled>
  );
};

export default Button;

export const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  background-color: ${ANGOLA_STYLES.color.white};
  border-radius: 44px;
  border: ${ANGOLA_STYLES.border.default};
  cursor: pointer;

  background-color: ${({ toggle }) =>
    toggle ? `${ANGOLA_STYLES.color.gray}` : `${ANGOLA_STYLES.color.white}`};

  ${(props) =>
    props.size === 'sm'
      ? `box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};`
      : `width: 150px; height: 45px; box-shadow: ${ANGOLA_STYLES.shadow.button.default};`}

  &:hover {
    border: 3px solid ${ANGOLA_STYLES.color.text};

    ${(props) =>
      props.size === 'sm'
        ? `box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};`
        : `box-shadow: ${ANGOLA_STYLES.shadow.button.hover};`}
  }

  &:disabled {
    border: ${ANGOLA_STYLES.border.default};
    background-color: ${ANGOLA_STYLES.color.dark};
    box-shadow: ${ANGOLA_STYLES.shadow.button.default};
    cursor: default;
  }
`;
