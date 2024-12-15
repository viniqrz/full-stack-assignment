import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getOneUser } from "../services/getOneUser";
import { useSession } from "../hooks/useSession";
import { getAlbumWithPhotos } from "../services/getAlbumWithPhotos";
import { PhotosList } from "../components/PhotosList";

export const Album = () => {
  const { albumId, userId } = useParams();
  const { user: myUser } = useSession();

  const { data: user, isLoading: isLoadingUser } = useQuery(
    ["user", userId],
    () => getOneUser(userId!)
  );

  const { data: album, isLoading: isLoadingAlbum } = useQuery(
    ["album", albumId],
    () => getAlbumWithPhotos(albumId!)
  );

  if (!album && (isLoadingAlbum || isLoadingUser)) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!album) {
    return null;
  }

  return (
    <div>
      <h1>Album: {album.title}</h1>
      <h3>Name: {user?.name}</h3>
      <h3>Username: {user?.username}</h3>
      {myUser?.id === user?.id && <p>👑 YOUR ALBUM</p>}
      <PhotosList album={album} photos={album.photos || []} />
    </div>
  );
};
