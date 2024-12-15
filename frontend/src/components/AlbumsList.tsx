import React, { useEffect, useState } from "react";
import { Album, User } from "../types";
import { AlbumPreview } from "./AlbumPreview";
import { useMutation } from "react-query";
import { useSession } from "../hooks/useSession";
import { createAlbum } from "../services/createAlbum";
import { LoadingButton } from "@mui/lab";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { deleteAlbum } from "../services/deleteAlbum";

const StyledList = styled.ul`
  list-style: none;
  padding: 2rem;
  border-radius: 5px;
  margin: 1rem auto;
  max-width: 95%;
  width: 960px;
  border: 1px solid #ccc;
  background-color: whitesmoke;
`;

const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
  margin: 1rem auto;
  border-radius: 5px;
  padding: 1rem;
  width: 960px;
  max-width: 95%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ccc;
  background-color: whitesmoke;
`;

export const AlbumsList: React.FC<{ user: User; albums: Album[] }> = ({
  albums,
  user,
}) => {
  const { user: myUser } = useSession();

  const [albumTitle, setAlbumTitle] = useState("");

  // This is a local state to store the albums since the dummy API doesn't persist changes
  const [localAlbums, setLocalAlbums] = useState<Album[]>([]);
  useEffect(() => {
    setLocalAlbums(albums);
  }, [albums]);

  const { mutate: createAlbumMutate, isLoading: isLoadingAlbumMutate } =
    useMutation(
      "createAlbumMutate",
      (title: string) => {
        return createAlbum(title, user.id);
      },
      {
        onSuccess: () => {
          setLocalAlbums([
            {
              id: -localAlbums.length - 1,
              title: albumTitle,
              userId: user.id,
            },
            ...localAlbums,
          ]);
          setAlbumTitle("");
        },
      }
    );

  const { mutate: deleteAlbumMutate } = useMutation(
    "deleteAlbumMutate",
    deleteAlbum
  );

  return (
    <>
      <h2>Albums</h2>
      {myUser?.id === user.id && (
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
            createAlbumMutate(albumTitle);
          }}
        >
          <TextField
            variant="standard"
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
        </StyledForm>
      )}
      <StyledList>
        {localAlbums.map((album, index) => (
          <AlbumPreview
            onDelete={
              myUser?.id === album.userId
                ? () => {
                    setLocalAlbums(
                      localAlbums.filter((a) => a.id !== album.id)
                    );
                    deleteAlbumMutate(album.id);
                  }
                : undefined
            }
            key={`album-${index}`}
            album={album}
          />
        ))}
      </StyledList>
    </>
  );
};
