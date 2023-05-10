import React, { useState } from "react";

import { useField } from "formik";

import Label from "./Label";
import Error from "./Error";

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
    <div className="flex flex-col w-fit">
      <Label>{isRequired ? `*${label}` : label}</Label>
      <select
        {...field}
        className={`relative w-[300px] overflow-clip bg-white outline-none border-blue fill-white rounded-none border-2 p-1 font-inter ${
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
