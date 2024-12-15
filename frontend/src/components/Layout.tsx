import { ReactNode } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ROUTES } from "../constants/routes";

const StyledNav = styled.nav`
  background-color: #556cd6;
  color: white;
  padding: 10px;
  text-align: center;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  padding: 0 1rem;
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
  return (
    <div>
      <StyledNav>
        <span onClick={() => navigate(-1)}>Return</span>
        <h1 onClick={() => navigate(ROUTES.HOME())}>Photo App</h1>
        <span></span>
      </StyledNav>
      <div style={{ height: "2rem" }}></div>
      {children}
    </div>
  );
};
