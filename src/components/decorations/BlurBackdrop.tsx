import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function BlurBackdrop() {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  let backdrop = <div className=" fixed top-0 left-0 w-screen h-screen backdrop-blur-sm" />;
  if (isBrowser) {
    return createPortal(backdrop, document.body);
  } else {
    return <></>;
  }
}

export default BlurBackdrop;
