import { api } from "./api";

export const deleteAlbum = async (albumId: number) => {
  const response = await api.delete(`/albums/${albumId}`);
  return response.data;
};
