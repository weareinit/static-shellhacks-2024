import React from "react";

function InputError({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-inter m-0 p-0 text-sm font-semibold text-red-600 underline">
      {children}
    </h3>
  );
}

export default InputError;
