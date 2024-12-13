import { Album } from "../types";
import { api } from "./api";

export const updateAlbum = async (album: Album) => {
  const response = await api.put(`/albums/${album.id}`, album);
  return response.data;
};
