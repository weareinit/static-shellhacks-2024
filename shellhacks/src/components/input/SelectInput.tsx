import React from "react";

import Label from "./Label";

interface SelectInputProps {
  label: string;
  options: string[];
  name: string;
  children?: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

function SelectInput({
  label,
  options,
  name,
  children,
  defaultValue,
}: SelectInputProps) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <select
        defaultValue={defaultValue}
        name={name}
        className="relative w-[300px] overflow-clip bg-white outline-none appearance-none border-blue fill-white rounded-none border-2 p-1"
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default SelectInput;
