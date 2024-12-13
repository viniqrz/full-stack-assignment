import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPhotos } from "../services";
import { Thumb } from "../components";
import { getOneUser } from "../services/getOneUser";

export const Album = () => {
  const { albumId, userId } = useParams();

  const { data: user } = useQuery(
    ["album", userId],
    () => getOneUser(userId!),
    {
      enabled: !!userId,
    }
  );

  const { data: photos } = useQuery(
    ["album", albumId],
    () => getPhotos(albumId!),
    { enabled: !!albumId }
  );

  if (!photos) {
    return null;
  }

  return (
    <div>
      <h1>{user?.username}</h1>
      {photos.map((photo, index) => (
        <Thumb
          key={`photo-${index}`}
          src={photo.thumbnailUrl}
          alt={photo.title}
          className="photo"
        />
      ))}
    </div>
  );
};
