import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="my-1 flex basis-full flex-col">
      <Label className="font-museo font-bold">
        {isRequired ? `*${label}` : label}
      </Label>
      <div
        className={`border-blue font-inter relative rounded-lg border border-black bg-[#E9DBCC] p-3 ${
          meta.touched && meta.error
            ? "border-red-600 focus:ring-red-600/50"
            : ""
        }`}
      >
        <select
          {...field}
          className="w-full cursor-pointer appearance-none bg-transparent outline-none"
          onBlur={() => setIsOpen(false)}
          onFocus={() => setIsOpen(true)}
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
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </div>
  );
}

export default SelectInput;
