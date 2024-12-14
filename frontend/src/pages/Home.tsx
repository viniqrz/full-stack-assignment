import { useQuery } from "react-query";
import { getUsers } from "../services";
import { UsersList } from "../components/UsersList";

export const Home: React.FC = () => {
  const { data: users = [] } = useQuery(["users"], getUsers, {});
  return <UsersList users={users} />;
};
