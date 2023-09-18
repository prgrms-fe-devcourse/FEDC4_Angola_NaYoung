import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface ImageProps {
  src: string;
  alt: string;
}

const Image = ({ src, alt, ...props }: ImageProps) => {
  return (
    <ImageStyles
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export default Image;

const ImageStyles = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: ${ANGOLA_STYLES.border.default};
`;
