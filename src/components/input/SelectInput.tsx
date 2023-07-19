import React, { useState } from "react";
import { useField } from "formik";

import Error from "./Error";
import Label from "./Label";

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  isRequired?: boolean;
  name: string;
}

function SelectInput({ label, options, isRequired, ...props }: SelectInputProps) {
  const [field, meta, helpers] = useField(props);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="flex flex-col basis-full my-1">
      <Label>{isRequired ? `*${label}` : label}</Label>
      <div
        className={`relative bg-white border-2 border-blue rounded-none p-1 font-inter ${
          meta.touched && meta.error ? "border-red-600 focus:ring-red-600/50" : ""
        }`}
      >
        <select
          {...field}
          className="w-full appearance-none outline-none cursor-pointer bg-transparent"
          onClick={handleSelectToggle}
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
        <div
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-200`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </div>
  );
}

export default SelectInput;
