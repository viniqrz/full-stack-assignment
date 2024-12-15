import React, { useState } from "react";
import { Album, User } from "../types";
import { AlbumPreview } from "./AlbumPreview";
import { useMutation } from "react-query";
import { useSession } from "../hooks/useSession";
import { createAlbum } from "../services/createAlbum";
import { LoadingButton } from "@mui/lab";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 2rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 1rem auto;
  max-width: 95%;
  width: 960px;
  background-color: #f9f9f975;
`;

export const AlbumsList: React.FC<{ user: User; albums: Album[] }> = ({
  albums,
  user,
}) => {
  const { user: myUser } = useSession();

  const [albumTitle, setAlbumTitle] = useState("");

  // This is a local state to store the albums created by the user
  const [localAlbums, setLocalAlbums] = useState<Album[]>([]);

  const { mutate: createAlbumMutate, isLoading: isLoadingAlbumMutate } =
    useMutation(
      "ShouldCreateAlbum",
      (title: string) => {
        return createAlbum(title, user.id);
      },
      {
        onSuccess: () => {
          setLocalAlbums([
            {
              id: albums.length + 1,
              title: albumTitle,
              userId: user.id,
            },
            ...localAlbums,
          ]);
          setAlbumTitle("");
          alert(`Album created!`);
        },
      }
    );

  return (
    <>
      <h2>Albums</h2>
      {myUser?.id === user.id && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAlbumMutate(albumTitle);
          }}
        >
          <input
            type="text"
            name="albumTitle"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            required
            placeholder="Album title"
          />
          <LoadingButton
            loading={isLoadingAlbumMutate}
            type="submit"
            variant="contained"
          >
            Create Album
          </LoadingButton>
        </form>
      )}
      <StyledList>
        {[...localAlbums, ...albums].map((album, index) => (
          <AlbumPreview key={`album-${index}`} album={album} />
        ))}
      </StyledList>
    </>
  );
};
