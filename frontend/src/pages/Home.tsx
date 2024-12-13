import { useQuery } from "react-query";
import { getUsers } from "../services";
import { ProfilePreview } from "../components";
import { UploadPhotoForm } from "../components/UploadPhotoForm";

export const Home: React.FC = () => {
  const { data: users = [] } = useQuery(["users"], getUsers, {});

  return (
    <div>
      <h1>Create Photos</h1>
      <UploadPhotoForm />
      <h1>My Users</h1>
      <p>Click on a user to see their photos</p>
      {users.map((user) => (
        <ProfilePreview key={user.id} user={user} />
      ))}
    </div>
  );
};
