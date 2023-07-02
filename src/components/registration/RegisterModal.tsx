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
      <header className="relative row-start-1 row-span-1 h-fit flex flex-row justify-between m-auto">
        <h1 className=" pt-1 row-start-2 row-span-1 font-pixel underline text-blue text-3xl">Registration</h1>
        <Button className="font-pixel text-xl  text-blue hover:underline" onClick={toClose}>
          <h1 className="text-base">CLOSE</h1>
        </Button>
      </header>
      <div className="max-w-[800px] m-auto">
        <RegisterForm />
      </div>
    </Modal>
  );
}
