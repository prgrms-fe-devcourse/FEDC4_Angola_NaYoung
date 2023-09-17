import styled from '@emotion/styled';

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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid var(--text, #404040);
`;
