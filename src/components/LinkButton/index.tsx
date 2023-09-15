import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 0;
  background-color: pink;
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  color: black;
`;
