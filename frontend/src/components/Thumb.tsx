import styled from "styled-components";

const StyledThumbImg = styled.img`
  cursor: pointer;

  &:hover {
    border: 3px solid #333;
  }
`;

export const Thumb: React.FC<{
  src: string;
  alt: string;
  className: string;
}> = ({ src, alt, className }) => {
  return <StyledThumbImg src={src} className={className} alt={alt} />;
};
