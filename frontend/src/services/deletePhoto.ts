import { api } from "./api";

export const deletePhoto = async (photoId: number) => {
  const response = await api.delete(`/photos/${photoId}`);
  return response.data;
};
