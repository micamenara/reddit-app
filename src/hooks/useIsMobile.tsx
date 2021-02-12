import { useState, useEffect } from "react";
const TABLET_SIZE = 1024;

interface WindowSize {
  width?: number;
  height?: number;
}

export default function useIsMobile() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize.width ? windowSize.width <= TABLET_SIZE : false;
}
