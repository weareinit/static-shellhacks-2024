import { useState, useEffect } from "react";
import {isMobile} from 'react-device-detect';

// Hook
function useWindowWidth() {
  // Initialize state with undefined width so server and client renders match
  const [windowSize, setWindowWidth] = useState<number | undefined>(undefined);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width to state
      setWindowWidth(isMobile ? window.outerWidth : window.innerWidth);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default useWindowWidth;
