import { LoadingButton } from "@mui/lab";
import { useSession } from "../hooks/useSession";
import { Album, Photo } from "../types";
import { Thumb } from "./Thumb";
import { useMutation } from "react-query";
import { createPhoto } from "../services/createPhoto";
import { useFormik } from "formik";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { PhotoModal } from "./PhotoModal";
import { deletePhoto } from "../services";

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
}> = ({ photos = [], album }) => {
  const { user: myUser } = useSession();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // This is a local state, since the dummy API doesn't persist changes
  const [localPhotos, setLocalPhotos] = useState<Photo[]>([]);
  useEffect(() => {
    setLocalPhotos(photos);
  }, [photos]);

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

  const { mutate: deletePhotoMutate } = useMutation(
    "deletePhoto",
    deletePhoto,
    {
      onSuccess: () => {
        setSelectedPhoto(null);
      },
    }
  );

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
      <h3>Photos (Click to expand)</h3>
      <StyledPhotosContainer>
        {localPhotos.length ? (
          localPhotos.map((photo, index) => (
            <Thumb
              key={`photo-${index}`}
              src={photo.thumbnailUrl}
              alt={photo.title}
              onSelect={() => setSelectedPhoto(photo)}
              onDelete={
                myUser?.id === album.userId
                  ? () => {
                      setLocalPhotos(localPhotos.filter((p) => p !== photo));
                      deletePhotoMutate(photo.id);
                    }
                  : undefined
              }
              className="photo"
            />
          ))
        ) : (
          <h3>No photos yet!</h3>
        )}
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
