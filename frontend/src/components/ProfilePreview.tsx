import { useNavigate } from "react-router";
import { User } from "../types";
import styled from "styled-components";
import { ROUTES } from "../constants/routes";

const ProfilePreviewContainer = styled.div`
  cursor: pointer;
  padding: 10px;
  border: 3px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: whitesmoke;
  color: black;

  &:hover {
    background-color: #f5f5f5b9;
    border-color: #008cff;
  }
`;

export const ProfilePreview: React.FC<{
  user: User;
  isMyUser: boolean;
}> = ({ user, isMyUser }) => {
  const navigate = useNavigate();
  return (
    <ProfilePreviewContainer onClick={() => navigate(ROUTES.PROFILE(user.id))}>
      {isMyUser && <span>👑 YOUR PROFILE</span>}
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </ProfilePreviewContainer>
  );
};
