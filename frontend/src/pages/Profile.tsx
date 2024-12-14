import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getOneUser } from "../services/getOneUser";
import { getAlbumsByUser } from "../services";
import { AlbumsList } from "../components/AlbumsList";
import { useSession } from "../hooks/useSession";

export const Profile = () => {
  const { userId } = useParams();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(["user", userId], () => getOneUser(userId!), {
    enabled: !!userId,
  });

  const { user: myUser } = useSession();

  const { data: albums = [] } = useQuery(
    ["albums", userId],
    () => getAlbumsByUser(userId!),
    {
      enabled: !!user,
    }
  );

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user && isError) {
    return (
      <div>
        <h1>404 Not Found</h1>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      {myUser?.id === user.id && <p>👑 YOUR PROFILE</p>}
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <AlbumsList albums={albums} />
    </div>
  );
};
