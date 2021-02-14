import { keyframes } from "styled-components";

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
    max-height: 0px;
    padding: 0px;
    margin: 0px;
    opacity: 0;
    visibility:hidden;
  }
`;
export default fadeOut;
