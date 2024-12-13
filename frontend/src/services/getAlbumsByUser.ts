import { Album } from "../types";
import { api } from "./api";

export const getAlbumsByUser = async (
  userId: string | number
): Promise<Album[]> => {
  const response = await api.get(`/users/${userId}/albums`);
  return response.data;
};
