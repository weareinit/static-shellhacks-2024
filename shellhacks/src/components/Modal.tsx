import React from "react";
import { createPortal } from "react-dom";

interface ModalPropsType {
  children?: React.ReactNode;
  onBgClick?: React.MouseEventHandler<HTMLDivElement>;
}

function Modal({ children, onBgClick }: ModalPropsType) {
  let modal = (
    <div
      onClick={onBgClick}
      id="modal-background"
      className="absolute top-0 left-0 grid content-center justify-center w-screen h-screen bg-black bg-opacity-20 z-10"
    >
      <div className=" bg-white border-blue rounded-md min-w-[200px] min-h-[200px] z-20 border-2">
        {children}
      </div>
    </div>
  );

  return <>{createPortal(modal, document.body)}</>;
}

export default Modal;
