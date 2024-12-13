import { Album } from "../types";
import { api } from "./api";

export const createAlbum = async (
  title: string,
  userId: number
): Promise<Album> => {
  const response = await api.post("/albums", { title, userId });
  return response.data;
};
