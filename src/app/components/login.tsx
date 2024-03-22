"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex flex-row justify-center gap-4">
      <button className="z-50" onClick={() => signIn("discord")}>
        login in here
      </button>
      <button className="text-red z-50" onClick={() => signOut()}>
        logout
      </button>
    </div>
  );
};

export default Login;
