import React, { useState } from "react";

function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-blue text-white text-center py-1 px-3 rounded-sm font-pixel sm:text-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
