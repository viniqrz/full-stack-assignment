import { ReactNode } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ROUTES } from "../constants/routes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSession } from "../hooks/useSession";

const StyledNav = styled.nav`
  background-color: #556cd6;
  color: white;
  text-align: center;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  padding: 10px 1.5rem;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  h1 {
    font-size: 1.5rem;
    cursor: pointer;
  }

  span {
    font-size: 1rem;
    cursor: pointer;
    width: 5%;
  }
`;

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSession();
  return (
    <div>
      <StyledNav>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon style={{ fill: "white" }} />
        </IconButton>
        <h1 onClick={() => navigate(ROUTES.HOME())}>PhotoApp</h1>
        <Tooltip title="My Account">
          <IconButton onClick={() => navigate(ROUTES.PROFILE(user?.id))}>
            <AccountBoxIcon style={{ fill: "white" }} />
          </IconButton>
        </Tooltip>
      </StyledNav>
      <div style={{ height: "4rem" }}></div>
      {children}
    </div>
  );
};
