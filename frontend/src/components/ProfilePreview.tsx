import { useNavigate } from "react-router";
import { User } from "../types";
import styled from "styled-components";
import { ROUTES } from "../constants/routes";

const ProfilePreviewContainer = styled.div`
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const ProfilePreview = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  return (
    <ProfilePreviewContainer onClick={() => navigate(ROUTES.PROFILE(user.id))}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </ProfilePreviewContainer>
  );
};
