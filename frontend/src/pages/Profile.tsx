import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getOneUser } from "../services/getOneUser";
import { AlbumPreview } from "../components";
import { getAlbumsByUser } from "../services";

export const Profile = () => {
  const { userId } = useParams();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(["user", userId], () => getOneUser(userId!), {
    enabled: !!userId,
  });

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
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2>Albums</h2>
      <div className="albums">
        {albums.map((album, index) => (
          <AlbumPreview key={`album-${index}`} album={album} />
        ))}
      </div>
    </div>
  );
};
