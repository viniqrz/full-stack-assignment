import { User } from "../types";
import { api } from "./api";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};
