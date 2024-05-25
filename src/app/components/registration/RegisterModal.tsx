import React, { useEffect, useRef } from "react";
import Modal from "../Modal";
import Button from "../input/Button";
import RegisterForm from "./RegisterForm";

interface RegisterModalProps {
  toClose: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | MouseEvent,
  ) => void;
}

export default function RegisterModal({ toClose }: RegisterModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toClose(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toClose]);

  return (
    <Modal containerClassName="z-20 pb-24" backgroundClassName="z-10">
      <div
        ref={modalRef}
        className="relative row-span-1 row-start-1 m-auto flex h-fit max-w-[800px] flex-col justify-center rounded-lg p-4"
      >
        <header className="relative row-span-1 row-start-1 flex h-fit flex-row justify-between">
          <h1 className=" text-darker_cyan row-span-1 row-start-2 pt-1 font-pixel text-3xl underline">
            Registration
          </h1>
          <Button
            className="bg-blue font-pixel text-xl text-white hover:underline"
            onClick={toClose}
          >
            <h1 className="text-base text-black">CLOSE</h1>
          </Button>
        </header>
        <RegisterForm />
      </div>
    </Modal>
  );
}
