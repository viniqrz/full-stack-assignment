import { api } from "./api";

export const deleteAlbum = async (albumId: string) => {
  const response = await api.delete(`/albums/${albumId}`);
  return response.data;
};
