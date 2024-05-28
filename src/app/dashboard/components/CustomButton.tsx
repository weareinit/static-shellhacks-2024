import React, { PropsWithChildren } from "react";

export const CustomButton = ({
  onClick = () => {},
  colorVariant,
  border,
  children,
}: PropsWithChildren<{
  onClick?: () => void;
  colorVariant?: number;
  border?: boolean;
}>) => {
  const color =
    colorVariant === 1
      ? "bg-[#E9DBCC] hover:bg-[#E9DBCC]/90 text-black"
      : colorVariant === 2
        ? "bg-[#CDC2BE] hover:bg-[#CDC2BE]/90 text-black"
        : "bg-[#78644F] hover:bg-[#78644F]/90 text-white";

  return (
    <button
      onClick={onClick}
      className={
        "font-zoonaji text-md rounded-lg border-[#000000] p-2 " +
        color +
        (border ? " border" : "")
      }
    >
      {children}
    </button>
  );
};
