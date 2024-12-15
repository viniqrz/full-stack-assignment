import { Modal } from "@mui/material";
import React from "react";

export const PhotoModal: React.FC<{
  photo: { url: string; title: string };
  onClose: () => void;
}> = ({ photo, onClose }) => {
  return (
    <Modal
      open={!!photo}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={onClose}
    >
      <img src={photo.url} alt={photo.title} />
    </Modal>
  );
};
