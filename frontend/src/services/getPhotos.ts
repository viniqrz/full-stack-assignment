import { Photo } from "../types";
import { api } from "./api";

export const getPhotos = async (albumId: string): Promise<Photo[]> => {
  const response = await api.get(`/albums/${albumId}/photos`);
  return response.data;
};
