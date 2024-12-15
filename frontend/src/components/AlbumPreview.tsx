import styled from "styled-components";
import { Album } from "../types";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants/routes";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledAlbumPreviewContainer = styled.div`
  cursor: pointer;
  border: 3px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: whitesmoke;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  &:hover {
    background-color: #f5f5f5b9;
    border-color: #008cff;
  }
`;

export const AlbumPreview: React.FC<{
  album: Album;
  onDelete?: () => void;
}> = ({ album, onDelete }) => {
  const navigate = useNavigate();
  const isLocalAlbum = album.id < 0;

  return (
    <Tooltip title="Click to open photos">
      <StyledAlbumPreviewContainer
        onClick={() =>
          navigate(ROUTES.ALBUM(album.userId, album.id), {
            state: { album: isLocalAlbum ? album : undefined },
          })
        }
      >
        <h2>{album.title}</h2>
        {onDelete && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <DeleteIcon style={{ fill: "red" }} />
          </IconButton>
        )}
      </StyledAlbumPreviewContainer>
    </Tooltip>
  );
};
