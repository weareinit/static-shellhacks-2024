import React from "react";
import { createPortal } from "react-dom";

interface ModalPropsType {
  children?: React.ReactNode;
  onBgClick?: React.MouseEventHandler<HTMLDivElement>;
  containerClassName?: string;
}

function Modal({ children, containerClassName, onBgClick }: ModalPropsType) {
  let modal = (
    <div
      onClick={onBgClick}
      id="modal-background"
      className="absolute top-0 left-0 grid content-center justify-center min-w-screen min-h-screen bg-black bg-opacity-20 z-10"
    >
      <aside
        className={`p-2 bg-white/50 border-blue rounded-md min-w-screen min-h-screen z-20 border-2 ${containerClassName}`}
      >
        {children}
      </aside>
    </div>
  );

  return <>{createPortal(modal, document.body)}</>;
}

export default Modal;
