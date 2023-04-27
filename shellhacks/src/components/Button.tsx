import React from "react";

interface ButtonProps {
  text: string;
  className?: string;
}

function Button({ text, className }: ButtonProps) {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        window.open("https://airtable.com/shrkEhas1KhZ1XpFv");
      }}
      className={`bg-blue text-white text-center px-4 py-1 rounded-full max-w-[16em] font-inter ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
