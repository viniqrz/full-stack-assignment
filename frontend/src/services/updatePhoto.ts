import { Photo } from "../types";
import { api } from "./api";

export const updatePhoto = async (photo: Photo): Promise<Photo> => {
  const response = await api.put(`/photos/${photo.id}`, photo);
  return response.data;
};
