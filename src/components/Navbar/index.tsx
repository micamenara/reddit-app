import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "components/Logo";
import MenuContext from "context/MenuContext";
import useIsMobile from "hooks/useIsMobile";
import { useContext } from "react";
import styled from "styled-components";

export default function Navbar() {
  const isMobile = useIsMobile();
  const { setIsOpen, isOpen } = useContext(MenuContext);
  return (
    <Nav>
      {isMobile && (
        <StyledMenu
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </StyledMenu>
      )}
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

export const StyledMenu = styled.button`
  background: #ffffff45;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 3px;
  color: white;
  outline: none;
  cursor: pointer;
  margin-right: ${({ theme }) => theme.sizes.sm};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: ${({ theme }) => theme.sizes.sm};
  }
`;
