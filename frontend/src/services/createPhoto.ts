import { Photo } from "../types";
import { api } from "./api";

export const createPhoto = async (photo: Omit<Photo, "id">): Promise<Photo> => {
  const response = await api.post(`/photos`, photo);
  return response.data;
};
