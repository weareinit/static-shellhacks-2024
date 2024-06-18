"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [shouldRender, setShouldRender] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsBrowser(true);
    setShouldRender(true);
    setTimeout(() => setIsVisible(true), 10); // Trigger transition
  }, [onBgClick]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 300); // Delay unmounting to allow transition
  };

  const modal = (
    <div
      className={`fixed inset-0 z-[101] grid h-screen w-screen content-center justify-center bg-white bg-opacity-50`}
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <aside
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-90  overflow-y-scroll  p-2 sm:m-3 sm:rounded-md sm:p-5 md:p-10 ${containerClassName} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        style={{
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        {children}
      </aside>
    </div>
  );

  if (isBrowser && shouldRender) {
    return <>{createPortal(modal, document.body)}</>;
  } else {
    return <></>;
  }
}

export default Modal;
