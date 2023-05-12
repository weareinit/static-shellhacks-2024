import React from "react";

function Error({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-inter text-sm text-red-600 m-0 p-0 font-semibold underline">
      {children}
    </h3>
  );
}

export default Error;
