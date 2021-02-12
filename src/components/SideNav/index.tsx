import styled, { css } from "styled-components";
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
        (
          <>
            {isOpen && <Backdrop />}
            <MobileContainer isOpen={isOpen} isMobile={isMobile}>
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

const MobileContainer = styled.div<{isMobile: boolean, isOpen: boolean}>`
  padding: ${({ theme }) => theme.sizes.sm};
  position: absolute;
  left: 0;
  bottom: 0px;
  z-index: 1;
  background: ${({ theme }) => theme.colors.dark};
  height: 100vh;
  -webkit-box-shadow: -2px 1px 12px 5px rgb(255 255 255 / 79%);
  box-shadow: -2px 1px 12px 5px rgb(255 255 255 / 21%);
  transition: transform 0.5s;

  ${({ isMobile, isOpen }) =>
    isMobile &&
    isOpen &&
    css`
      transform: translate3d(0px, 0, 0);
    `}

  ${({ isMobile, isOpen }) =>
    isMobile &&
    !isOpen &&
    css`
      transform: translate3d(-100%, 0, 0);
      box-shadow: none;
    `}
`;

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  bottom: 0px;
  background-color: #67657159;
`;
