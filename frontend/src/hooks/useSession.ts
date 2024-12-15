import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext/context";

export const useSession = () => {
  const { user } = useContext(SessionContext);
  return { user };
};
