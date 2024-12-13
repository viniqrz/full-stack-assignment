import { useMutation, useQuery } from "react-query";
import { getAlbumsByUser } from "../services";
import { useSession } from "../hooks/useSession";
import styled from "styled-components";
import { createPhoto } from "../services/createPhoto";
import { useState } from "react";
import { createAlbum } from "../services/createAlbum";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
`;

export const UploadPhotoForm = () => {
  const { user } = useSession();

  const formik = useFormik({
    initialValues: {
      photo: "",
      thumb: "",
      title: "",
      albumTitle: "",
      albumId: "",
    },
    onSubmit: (values) => {
      if (shouldCreateAlbum) {
        createAlbumMutate(values.albumTitle);
      } else {
        uploadPhotoMutate({
          url: values.photo,
          thumbnailUrl: values.thumb,
          title: values.title,
          albumId: +values.albumId,
        });
      }
    },
  });

  const [shouldCreateAlbum, setShouldCreateAlbum] = useState(false);

  const { data: myAlbums = [] } = useQuery(
    ["albums", user?.id],
    () => getAlbumsByUser(user?.id!),
    {
      enabled: !!user?.id,
    }
  );

  const { mutate: uploadPhotoMutate, isLoading: isLoadingPhotoMutate } =
    useMutation("uploadPhoto", createPhoto, {
      onSuccess: () => {},
    });

  const { mutate: createAlbumMutate, isLoading: isLoadingAlbumMutate } =
    useMutation(
      "ShouldCreateAlbum",
      (title: string) => createAlbum(title, user?.id!),
      {
        onSuccess: (album) => {
          const { photo, thumb, title } = formik.values;

          uploadPhotoMutate({
            url: photo,
            thumbnailUrl: thumb,
            title,
            albumId: album.id,
          });
        },
      }
    );

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <input name="title" type="text" placeholder="Title" required />
      <input
        onChange={(e) => {
          formik.setFieldValue("photo", e.target.files?.[0].name);
        }}
        name="photo"
        type="file"
        accept="image/*"
        max={1}
        required
      />
      <input
        onChange={(e) => {
          formik.setFieldValue("thumb", e.target.files?.[0].name);
        }}
        name="thumb"
        type="file"
        accept="image/*"
        max={1}
        required
      />
      <div style={{ display: "flex" }}>
        <input
          type="checkbox"
          id="create"
          placeholder="Create a new album"
          onChange={() => setShouldCreateAlbum(!shouldCreateAlbum)}
        />
        <label htmlFor="create">Create a new album</label>
      </div>
      {shouldCreateAlbum ? (
        <input
          name="albumTitle"
          type="text"
          placeholder="Album title"
          required
        />
      ) : (
        <>
          <select name="albumId" aria-placeholder="Select an album" required>
            <option value="">Select an album</option>
            {myAlbums.map((album) => (
              <option key={`album-option-${album.id}`} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </>
      )}
      <LoadingButton
        loading={isLoadingPhotoMutate || isLoadingAlbumMutate}
        variant="contained"
        type="submit"
      >
        Submit
      </LoadingButton>
    </StyledForm>
  );
};
