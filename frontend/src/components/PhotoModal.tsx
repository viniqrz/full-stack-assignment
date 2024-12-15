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
      <img
        style={{
          width: "600px",
          height: "600px",
          maxWidth: "90%",
          objectFit: "contain",
        }}
        src={photo.url}
        alt={photo.title}
      />
    </Modal>
  );
};
