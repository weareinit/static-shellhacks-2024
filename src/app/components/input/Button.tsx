import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`transform border-[#787976] px-3 py-1 text-center font-pixel no-underline transition hover:scale-105 hover:bg-[#6c757d] hover:text-white sm:text-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
