import { IconButton, Tooltip } from "@mui/material";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledThumbContainer = styled.div`
  transition: all 0.1s;
  width: 150px;
  height: 150px;
  box-sizing: content-box;

  button {
    outline: none;
  }

  img {
    cursor: pointer;
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin: 0;
  }

  &:hover {
    border: 3px solid #556cd6;
    scale: 1.4;
    z-index: 10;
  }
`;

export const Thumb: React.FC<{
  src: string;
  alt: string;
  className: string;
  onSelect: () => void;
  onDelete?: () => void;
}> = ({ src, alt, className, onSelect, onDelete }) => {
  return (
    <Tooltip title={alt}>
      <StyledThumbContainer style={{ position: "relative" }}>
        <img onClick={onSelect} src={src} className={className} alt={alt} />
        {onDelete && (
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={onDelete}
          >
            <DeleteIcon style={{ fill: "white" }} />
          </IconButton>
        )}
      </StyledThumbContainer>
    </Tooltip>
  );
};
