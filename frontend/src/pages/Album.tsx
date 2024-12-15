import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getOneUser } from "../services/getOneUser";
import { useSession } from "../hooks/useSession";
import { getAlbumWithPhotos } from "../services/getAlbumWithPhotos";
import { PhotosList } from "../components/PhotosList";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Album as IAlbum } from "../types";

export const Album = () => {
  const { albumId, userId } = useParams();
  const {
    state: { album: historyAlbum },
  } = useLocation();
  const { user: myUser } = useSession();

  const { data: user, isLoading: isLoadingUser } = useQuery(
    ["albumUser", userId],
    () => getOneUser(userId!)
  );

  const {
    data: fetchedAlbum,
    isLoading: isLoadingAlbum,
    refetch: fetchAlbum,
  } = useQuery(["album", albumId], () => getAlbumWithPhotos(albumId!), {
    enabled: !historyAlbum,
  });

  const [album, setAlbum] = useState<IAlbum | null>(null);

  useEffect(() => {
    if (historyAlbum) {
      setAlbum(historyAlbum);
    } else if (fetchedAlbum) {
      setAlbum(fetchedAlbum);
    } else {
      fetchAlbum();
    }
  }, [historyAlbum, fetchedAlbum, fetchAlbum]);

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
    <div style={{ padding: "1rem" }}>
      <h2>Album: {album.title}</h2>
      <h3>Name: {user?.name}</h3>
      <h3>Username: {user?.username}</h3>
      {myUser?.id === user?.id && <p>👑 YOUR ALBUM</p>}
      <PhotosList album={album} photos={album.photos || []} />
    </div>
  );
};
