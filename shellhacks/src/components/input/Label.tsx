import React from "react";

interface LabelPropType {
  children?: React.ReactNode;
  className?: string;
  hasInter?: boolean;
}

function Label({ children, className, hasInter }: LabelPropType) {
  return (
    <label
      className={`${
        hasInter ? "font-inter" : "font-pixel"
      } text-lg ${className}`}
    >
      {children}
    </label>
  );
}

export default Label;
