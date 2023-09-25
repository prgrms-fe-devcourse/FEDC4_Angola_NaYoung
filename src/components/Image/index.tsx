import type { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface ImageProps {
  src: string;
  alt: string;
  size?: number;
  style?: CSSProperties;
}

const Image = ({ src, alt, size = 150, ...props }: ImageProps) => {
  return (
    <ImageStyles
      src={src}
      alt={alt}
      size={size}
      {...props}
    />
  );
};

export default Image;

const ImageStyles = styled.img<ImageProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  border: ${ANGOLA_STYLES.border.default};
  object-fit: cover;
`;
