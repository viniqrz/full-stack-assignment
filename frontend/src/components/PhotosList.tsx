import { LoadingButton } from "@mui/lab";
import { useSession } from "../hooks/useSession";
import { Album, Photo } from "../types";
import { Thumb } from "./Thumb";
import { useMutation } from "react-query";
import { createPhoto } from "../services/createPhoto";
import { useFormik } from "formik";
import styled from "styled-components";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { PhotoModal } from "./PhotoModal";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 1rem auto;
  background-color: whitesmoke;
  padding: 1rem;
  border-radius: 5px;
  color: black;
`;

const StyledPhotosContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

export const PhotosList: React.FC<{
  album: Album;
  photos: Photo[];
}> = ({ photos, album }) => {
  const isAlbumEmpty = !photos.length;

  const { user: myUser } = useSession();
  const photoInputRef = useRef<HTMLInputElement>(null);

  // This is a local state to store the photos created by the user
  const [localPhotos, setLocalPhotos] = useState<Photo[]>([]);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      photo: null as File | null,
      albumId: album.id,
    },
    onSubmit: (values) => {
      {
        uploadPhotoMutate({
          url: values.photo!.name,
          thumbnailUrl: values.photo!.name,
          title: values.title,
          albumId: +values.albumId,
        });
      }
    },
  });

  const { mutate: uploadPhotoMutate, isLoading: isLoadingPhotoMutate } =
    useMutation("uploadPhoto", createPhoto, {
      onSuccess: () => {
        // This is a local state to store the photos created by the user
        setLocalPhotos([
          {
            id: photos.length + 1,
            title: formik.values.title,
            thumbnailUrl: URL.createObjectURL(formik.values.photo!),
            url: URL.createObjectURL(formik.values.photo!),
            albumId: album.id,
          },
          ...localPhotos,
        ]);
        photoInputRef.current!.value = "";
        formik.resetForm();
      },
    });

  if (isAlbumEmpty) {
    return <p>Album is empty</p>;
  }

  return (
    <div>
      {myUser?.id === album.userId && (
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <TextField
            variant="filled"
            name="title"
            type="text"
            placeholder="Title"
            value={formik.values.title}
            onChange={(e) => formik.setFieldValue("title", e.target.value)}
            required
          />
          <input
            onChange={(e) => {
              formik.setFieldValue("photo", e.target.files![0]);
            }}
            ref={photoInputRef}
            name="photo"
            type="file"
            accept="image/*"
            max={1}
            required
          />
          <LoadingButton
            loading={isLoadingPhotoMutate}
            type="submit"
            variant="contained"
          >
            Upload Photo
          </LoadingButton>
        </StyledForm>
      )}
      <StyledPhotosContainer>
        {[...localPhotos, ...photos].map((photo, index) => (
          <Thumb
            key={`photo-${index}`}
            src={photo.thumbnailUrl}
            alt={photo.title}
            onSelect={() => setSelectedPhoto(photo)}
            className="photo"
          />
        ))}
      </StyledPhotosContainer>
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};
