import React from "react";

import Modal from "../Modal";
import Button from "../input/Button";
import RegisterForm from "./RegisterForm";

interface RegisterModalProps {
  toClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function RegisterModal({ toClose }: RegisterModalProps) {
  return (
    <Modal containerClassName="z-20 pb-24" backgroundClassName="z-10">
      <header className="relative row-span-1 row-start-1 m-auto flex h-fit flex-row justify-between">
        <h1 className=" text-darker_cyan row-span-1 row-start-2 pt-1 font-pixel text-3xl underline">
          Registration
        </h1>
        <Button
          className="bg-blue font-pixel  text-xl text-white hover:underline"
          onClick={toClose}
        >
          <h1 className="text-base">CLOSE</h1>
        </Button>
      </header>
      <div className="m-auto max-w-[800px]">
        <RegisterForm />
      </div>
    </Modal>
  );
}
