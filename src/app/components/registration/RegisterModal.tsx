import React from "react";
import Modal from "../Modal";
import RegisterForm from "./RegisterForm";

interface RegisterModalProps {
  toClose: any;
}

export default function RegisterModal({ toClose }: RegisterModalProps) {
  return (
    <Modal containerClassName="z-20 pb-24">
      <div className="relative row-span-1 row-start-1 m-auto flex h-fit flex-col justify-center rounded-lg bg-transparent p-4">
        <header className="relative row-span-1 row-start-1 flex h-fit flex-row justify-between">
          <div
            onClick={toClose}
            className="font-pixel absolute right-0 z-50 w-20 cursor-pointer text-center text-xl text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="font-pixel row-span-1 row-start-2 mx-auto mt-4 pt-1 font-zoonaji text-4xl text-darker_cyan">
            ShellHacks 2024 Application
          </h1>
        </header>
        <RegisterForm />
      </div>
    </Modal>
  );
}
