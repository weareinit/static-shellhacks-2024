import React from "react";

interface LabelPropType {
  htmlFor: string;
  children?: React.ReactNode;
  className?: string;
}

function Label({ htmlFor, children, className }: LabelPropType) {
  return (
    <label htmlFor={htmlFor} className={`font-pixel text-lg ${className}`}>
      {children}
    </label>
  );
}

export default Label;
