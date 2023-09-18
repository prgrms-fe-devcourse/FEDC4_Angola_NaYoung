import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
  style?: CSSProperties;
}

const LinkButton = ({ to, children, ...style }: LinkButtonProps) => {
  return (
    <LinkStyled
      to={to}
      {...style}>
      {children}
    </LinkStyled>
  );
};

export default LinkButton;

const LinkStyled = styled(Link)`
  box-sizing: border-box;
  display: flex;
  width: 60px;
  height: 60px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;

  border-radius: 30px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};

  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }
`;
