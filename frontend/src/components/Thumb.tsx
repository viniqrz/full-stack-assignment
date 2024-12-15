import { Tooltip } from "@mui/material";
import styled from "styled-components";

const StyledThumbImg = styled.img`
  cursor: pointer;
  transition: all 0.1s;

  width: 150px;
  height: 150px;
  object-fit: cover;

  &:hover {
    border: 3px solid #556cd6;
    scale: 1.2;
    z-index: 10;
  }
`;

export const Thumb: React.FC<{
  src: string;
  alt: string;
  className: string;
  onSelect: () => void;
}> = ({ src, alt, className, onSelect }) => {
  return (
    <Tooltip title={alt}>
      <StyledThumbImg
        onClick={onSelect}
        src={src}
        className={className}
        alt={alt}
      />
    </Tooltip>
  );
};
