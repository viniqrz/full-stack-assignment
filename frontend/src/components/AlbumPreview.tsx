import styled from "styled-components";
import { Album } from "../types";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants/routes";

const StyledAlbumPreviewContainer = styled.div`
  cursor: pointer;
  padding: 10px;
  border: 3px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: whitesmoke;
  color: black;

  &:hover {
    background-color: #f5f5f5b9;
    border-color: #008cff;
  }
`;

export const AlbumPreview: React.FC<{ album: Album }> = ({ album }) => {
  const navigate = useNavigate();

  return (
    <StyledAlbumPreviewContainer
      onClick={() => navigate(ROUTES.ALBUM(album.id, album.userId))}
    >
      <h2>{album.title}</h2>
    </StyledAlbumPreviewContainer>
  );
};
