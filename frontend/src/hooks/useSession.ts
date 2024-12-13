import { useContext } from "react";
import { SessionContext } from "../contexts/Session";

export const useSession = () => {
  const { user } = useContext(SessionContext);
  return { user };
};
