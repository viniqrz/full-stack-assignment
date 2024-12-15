import { ReactNode, useEffect, useState } from "react";
import { User } from "../../types";
import { useQuery } from "react-query";
import { getOneUser } from "../../services/getOneUser";
import { api } from "../../services/api";
import { SessionContext } from "./context";

const DEFAULT_USER_ID = "1";

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const { refetch } = useQuery("user", () => getOneUser(DEFAULT_USER_ID), {
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      api.interceptors.request.use((config) => {
        config.auth = {
          username: data.email,
          password: "", // no password for now
        };
        return config;
      });
    },
    enabled: false,
  });

  useEffect(() => {
    console.log("Starting session provider...");
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      refetch();
    }
  }, [refetch]);

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
