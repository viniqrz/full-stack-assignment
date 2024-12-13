import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types";
import { useQuery } from "react-query";
import { getOneUser } from "../services/getOneUser";

const DEFAULT_USER_ID = "1";

type SessionContextType = {
  user: User | null;
};

export const SessionContext = createContext<SessionContextType>({
  user: null,
});

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const { refetch } = useQuery("user", () => getOneUser(DEFAULT_USER_ID), {
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    },
    enabled: false,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      refetch();
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
