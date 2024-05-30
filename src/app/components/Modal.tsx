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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onBgClick &&
          onBgClick(
            event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>,
          );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onBgClick]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 300); // Delay unmounting to allow transition
  };

  const modal = (
    <div
      className={`fixed left-0 top-0 grid h-screen w-screen content-center justify-center bg-slate-400 bg-opacity-20 ${backgroundClassName}`}
      style={{
        backdropFilter: "blur(10px)",
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <aside
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-90 border-blue overflow-y-scroll border-2 bg-slate-200 bg-transparent bg-opacity-55 p-2 sm:m-3 sm:rounded-md sm:p-5 md:p-10 ${containerClassName} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
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
