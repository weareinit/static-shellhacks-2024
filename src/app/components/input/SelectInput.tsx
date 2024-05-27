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
    <div className="my-1 flex basis-full flex-col">
      <Label>{isRequired ? `*${label}` : label}</Label>
      <div
        className={`relative rounded-lg border-2 border-[#787976] border-blue bg-[#f1e9e0] p-1 py-2 font-inter ${
          meta.touched && meta.error
            ? "border-red-600 focus:ring-red-600/50"
            : ""
        }`}
      >
        <select
          {...field}
          className="w-full cursor-pointer appearance-none bg-transparent outline-none"
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
          className={`absolute right-2 top-1/2 -translate-y-1/2 transform ${
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
