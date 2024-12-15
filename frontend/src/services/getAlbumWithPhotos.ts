import { Album } from "../types";
import { api } from "./api";

export const getAlbumWithPhotos = async (id: string): Promise<Album> => {
  const response = await api.get(`/albums/${id}?withPhotos=true`);
  return response.data;
};
