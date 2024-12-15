import { createContext } from "react";
import { User } from "../../types";

type SessionContextType = {
  user: User | null;
};

export const SessionContext = createContext<SessionContextType>({
  user: null,
});
