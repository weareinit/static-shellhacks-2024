import React from "react";

interface SelectInputProps {
  label: string;
  options: string[];
  name: string;
}

function SelectInput({ label, options, name }: SelectInputProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name}>
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
