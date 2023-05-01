import React, { useState } from "react";

interface ButtonProps {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue text-white text-center py-1 px-3 rounded-sm max-w-[16em] font-inter ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
