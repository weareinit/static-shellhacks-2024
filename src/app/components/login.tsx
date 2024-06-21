"use server";
import React from "react";
import { signIn, signOut } from "@/server/auth";

const Login = () => {
  return (
    <div className="flex flex-row justify-center gap-4">
      <form
        action={async () => {
          "use server";
          await signIn("discord");
        }}
      >
        <button className="z-[100] bg-blue p-5 text-xl">Sign In</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="bg-green z-[100] p-5 text-xl">Sign Out</button>
      </form>
    </div>
  );
};

export default Login;
