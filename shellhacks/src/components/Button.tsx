import React, { useState } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

function Button({ children, text, className, onClick }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`bg-blue text-white text-center px-4 py-1 rounded-full max-w-[16em] font-inter ${className}`}
      >
        {text}
      </button>
      {children}
    </>
  );
}

export default Button;
