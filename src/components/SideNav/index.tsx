import styled from "styled-components";
import { useContext } from "react";
import useIsMobile from "hooks/useIsMobile";
import MenuContext from "context/MenuContext";
import Navbar from "components/Navbar";
import Posts from "components/Posts";

export default function SideNav() {
  const isMobile = useIsMobile();
  const { isOpen } = useContext(MenuContext);

  return (
    <SideNavContent>
      <Navbar />
      {isMobile ? (
        isOpen && (
          <>
            <Backdrop />
            <MobileContainer>
              <Posts />
            </MobileContainer>
          </>
        )
      ) : (
        <Posts />
      )}
    </SideNavContent>
  );
}
const SideNavContent = styled.div``

const MobileContainer = styled.div`
  padding: ${({ theme }) => theme.sizes.sm};
  position: absolute;
  left: 0;
  bottom: 0px;
  z-index: 1;
  background: ${({ theme }) => theme.colors.dark};
  height: 100vh;
  -webkit-box-shadow: -2px 1px 12px 5px rgb(255 255 255 / 79%);
  box-shadow: -2px 1px 12px 5px rgb(255 255 255 / 21%);
`;

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  bottom: 0px;
  background-color: #67657159;
`;
