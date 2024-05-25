import React from "react";
import Modal from "../Modal";
import Button from "../input/Button";
import RegisterForm from "./RegisterForm";

interface RegisterModalProps {
  toClose: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | MouseEvent,
  ) => void;
}

export default function RegisterModal({ toClose }: RegisterModalProps) {
  return (
    <Modal
      containerClassName="z-20 pb-24"
      backgroundClassName="z-10"
      onBgClick={toClose}
    >
      <div className="relative row-span-1 row-start-1 m-auto flex h-fit max-w-[800px] flex-col justify-center rounded-lg bg-transparent p-4">
        <header className="relative row-span-1 row-start-1 flex h-fit flex-row justify-between">
          <div
            onClick={toClose}
            className="w-20 text-center absolute cursor-pointer right-0 z-50 font-pixel text-xl text-black"
          >
            CLOSE
          </div>
          <h1 className="text-darker_cyan font-zoonaji row-span-1 row-start-2 mx-auto pt-1 font-pixel text-4xl">
            ShellHacks 2024 Application
          </h1>
        </header>
        <RegisterForm />
      </div>
    </Modal>
  );
}
