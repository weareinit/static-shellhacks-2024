import React, { useState, useEffect } from "react";

import Papa from "papaparse";

import Image from "next/image";
import Modal from "../Modal";
import Button from "../Button";
import RegisterForm from "./RegisterForm";

interface RegisterModalProps {
  toClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function RegisterModal({ toClose }: RegisterModalProps) {
  return (
    <Modal containerClassName="">
      <header className="relative row-start-1 row-span-1 h-fit flex flex-row justify-between">
        <h1 className=" pt-1 row-start-2 row-span-1 font-pixel underline text-deep_blue text-3xl">
          Registration
        </h1>
        <Button className="font-pixel text-xl  text-blue" onClick={toClose}>
          <h1 className="text-base">CLOSE</h1>
        </Button>
      </header>
      <RegisterForm />
    </Modal>
  );
}
export default RegisterModal;
