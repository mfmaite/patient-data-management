import { useEffect, useState } from "react";

const useIsMobile = (width?: number) => {
  const breakpoint = width || 768;
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setIsMobile(window.innerWidth < breakpoint);
  }

  useEffect(() => {
    handleResize();
    setScreenWidth(window.innerWidth)

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [breakpoint]);

  return {
    isMobile,
    screenWidth,
  };
}

export default useIsMobile;
