import React from "react";
import { Album } from "../types";
import { AlbumPreview } from "./AlbumPreview";

export const AlbumsList: React.FC<{ albums: Album[] }> = ({ albums }) => {
  return (
    <>
      <h2>Albums</h2>
      <div className="albums">
        {albums.map((album, index) => (
          <AlbumPreview key={`album-${index}`} album={album} />
        ))}
      </div>
    </>
  );
};
