import React from "react";

interface ButtonProps {
  text: string;
  className?: string;
}

function Button({ text, className }: ButtonProps) {
  return (
    <button
      className={`bg-blue text-white text-center px-4 py-1 rounded-full max-w-[16em] ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
