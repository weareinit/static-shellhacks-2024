import React from "react";

interface LabelPropType {
  htmlFor: string;
  children?: React.ReactNode;
  className?: string;
  hasInter?: boolean;
}

function Label({ htmlFor, children, className, hasInter }: LabelPropType) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${
        hasInter ? "font-inter" : "font-pixel"
      } text-lg ${className}`}
    >
      {children}
    </label>
  );
}

export default Label;
