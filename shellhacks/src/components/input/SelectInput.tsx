import React from "react";

interface SelectInputProps {
  label: string;
  options: string[];
  name: string;
  children?: React.ReactNode;
  className?: string;
}

function SelectInput({ label, options, name, children }: SelectInputProps) {
  return (
    <>
      <label htmlFor={name} className=" text-lg font-pixel">
        {label}
      </label>
      <select
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
