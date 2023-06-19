import React from "react";

import { useField } from "formik";

import Error from "./Error";
import Label from "./Label";

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  isRequired?: boolean;
  name: string;
}

function SelectInput({
  label,
  options,
  isRequired,
  ...props
}: SelectInputProps) {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="flex flex-col basis-full my-1">
      <Label>{isRequired ? `*${label}` : label}</Label>
      <select
        {...field}
        className={`relative basis-full bg-white outline-none border-blue fill-white rounded-none border-2 p-1 font-inter ${
          meta.touched && meta.error
            ? "border-red-600 focus:ring-red-600/50"
            : ""
        }`}
      >
        <option />
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
