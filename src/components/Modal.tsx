import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPropsType {
  children?: React.ReactNode;
  onBgClick?: React.MouseEventHandler<HTMLDivElement>;
  containerClassName?: string;
  backgroundClassName?: string;
}

function Modal({ children, containerClassName, onBgClick, backgroundClassName }: ModalPropsType) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  let modal = (
    <div onClick={onBgClick} id="modal-background" className={`fixed top-0 left-0 grid content-center w-screen h-screen justify-center bg-black bg-opacity-20 ${backgroundClassName}`}>
      <aside className={`p-2 sm:p-5 md:p-10 sm:m-3 bg-white/50 border-blue sm:rounded-md overflow-y-scroll w-90 border-2 ${containerClassName}`}>{children}</aside>
    </div>
  );

  if (isBrowser) {
    return <>{createPortal(modal, document.body)}</>;
  } else {
    return <></>;
  }
}

export default Modal;
