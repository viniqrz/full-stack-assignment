import React from "react";
import styled from "styled-components";
import { User } from "../types";
import { ProfilePreview } from "./ProfilePreview";
import { useSession } from "../hooks/useSession";

const StyledList = styled.ul`
  list-style: none;
  padding: 2rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 1rem auto;
  max-width: 95%;
  width: 960px;
  background-color: #f9f9f975;
`;

export const UsersList: React.FC<{ users: User[] }> = ({ users }) => {
  const { user: myUser } = useSession();
  return (
    <StyledList>
      {users.map((user) => (
        <ProfilePreview
          isMyUser={myUser?.id === user.id}
          key={`user-preview-${user.id}`}
          user={user}
        />
      ))}
    </StyledList>
  );
};
