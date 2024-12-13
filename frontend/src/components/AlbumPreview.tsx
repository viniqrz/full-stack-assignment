import styled from "styled-components";
import { Album } from "../types";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants/routes";

const StyledAlbumPreviewContainer = styled.div`
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
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
