import React from "react";

import { useField } from "formik";

import Label from "./Label";
import Error from "./Error";

interface SelectInputProps {
  label: string;
  options: string[];
  name: string;
  children?: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

function SelectInput({ label, options, ...props }: SelectInputProps) {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col w-fit">
      <Label>{label}</Label>
      <select
        {...field}
        className={`relative w-[300px] overflow-clip bg-white outline-none border-blue fill-white rounded-none border-2 p-1 font-inter ${
          meta.touched && meta.error
            ? "border-red-600 focus:ring-red-600/50"
            : ""
        }`}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </div>
  );
}

export default SelectInput;
