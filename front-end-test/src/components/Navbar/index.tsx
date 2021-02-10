import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "components/Logo";
import { useState } from "react";
import styled from "styled-components";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <Nav>
      <Menu onClick={() => setOpen(!open)}>
        {open ? (
          <FontAwesomeIcon icon={faTimes} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="lg" />
        )}
      </Menu>
      <Title>
        <Logo width="32px" height="32px" />
        <h1>Reddit</h1>
      </Title>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.sizes.homeTitle};
`;

const Menu = styled.button`
  background: #ffffff45;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 3px;
  color: white;
  outline: none;
  cursor: pointer;
  margin-right: ${({ theme }) => theme.sizes.sm};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: ${({ theme }) => theme.sizes.sm};
  }
`;
