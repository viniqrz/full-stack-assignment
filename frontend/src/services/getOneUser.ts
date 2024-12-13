import { User } from "../types";
import { api } from "./api";

export const getOneUser = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
