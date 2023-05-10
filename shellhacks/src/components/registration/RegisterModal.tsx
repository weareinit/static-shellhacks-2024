import React, { useState, useEffect } from "react";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Modal from "../Modal";
import Button from "../input/Button";
import RegisterForm from "./RegisterForm";

interface RegisterModalProps {
  toClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default withPageAuthRequired(function RegisterModal({
  toClose,
}: RegisterModalProps) {
  return (
    <Modal containerClassName="">
      <header className="relative row-start-1 row-span-1 h-fit flex flex-row justify-between">
        <h1 className=" pt-1 row-start-2 row-span-1 font-pixel underline text-blue text-3xl">
          Registration
        </h1>
        <Button className="font-pixel text-xl  text-blue" onClick={toClose}>
          <h1 className="text-base">CLOSE</h1>
        </Button>
      </header>
      <RegisterForm />
    </Modal>
  );
});
