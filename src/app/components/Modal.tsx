import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPropsType {
  children?: React.ReactNode;
  onBgClick?: React.MouseEventHandler<HTMLDivElement>;
  containerClassName?: string;
  backgroundClassName?: string;
}

function Modal({
  children,
  containerClassName,
  onBgClick,
  backgroundClassName,
}: ModalPropsType) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const modal = (
    <div
      onClick={onBgClick}
      id="modal-background"
      className={`fixed left-0 top-0 grid h-screen w-screen content-center justify-center bg-black bg-opacity-20 ${backgroundClassName}`}
      style={{
        backdropFilter: "blur(10px)",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`w-90 overflow-y-scroll border-2 border-blue bg-white p-2 sm:m-3 sm:rounded-md sm:p-5 md:p-10 ${containerClassName} transform transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        {children}
      </aside>
    </div>
  );

  if (isBrowser) {
    return <>{createPortal(modal, document.body)}</>;
  } else {
    return <></>;
  }
}

export default Modal;
