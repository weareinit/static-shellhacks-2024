"use client";
import React, { PropsWithChildren } from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  colorVariant?: number;
  border?: boolean;
}

export const CustomButton: React.FC<PropsWithChildren<CustomButtonProps>> = ({
  onClick = () => {},
  colorVariant,
  border,
  children,
  ...btnProps
}) => {
  const color =
    colorVariant === 1
      ? "bg-[#E9DBCC] hover:bg-[#E9DBCC]/90 text-black"
      : colorVariant === 2
        ? "bg-[#CDC2BE] hover:bg-[#CDC2BE]/90 text-black"
        : colorVariant === 3
          ? "bg-[#E9DBCC] hover:bg-[#E9DBCC]/90"
          : "bg-[#78644F] hover:bg-[#78644F]/90 text-white";

  const borderClass = border ? " border" : "";

  return (
    <button
      onClick={onClick}
      className={`text-md rounded-lg border-[#000000] p-2 font-zoonaji ${color}${borderClass}`}
      {...btnProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
