import React, { use, useEffect } from "react";
import Modal from "../Modal";
import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface RegisterModalProps {
  toClose: any;
}

export default function RegisterModal({ toClose }: RegisterModalProps) {
  const { data: session, update } = useSession();

  if (!session) {
    signIn("discord");
  } else if (session.user.hacker_id) {
    redirect("/dashboard");
  }

  return (
    <Modal>
      <div className="row-span-1 flex flex-col justify-center rounded-lg">
        <header>
          <h1 className="text-center font-zoonaji text-4xl text-darker_cyan">
            ShellHacks 2024 Application
          </h1>
          <div
            onClick={toClose}
            className="absolute right-0 top-0 mr-2 mt-2 w-20 cursor-pointer text-xl text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
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
        </header>
        <RegisterForm />
      </div>
    </Modal>
  );
}
