import React, { useState, HTMLInputTypeAttribute } from "react";

import { useField } from "formik";

interface TextInputProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
}

function TextInput(props: TextInputProps) {
  const [field, meta] = useField(props);
  const [value, setValue] = useState("");
  return (
    <>
      <label
        htmlFor={props.name}
        className={`font-pixel text-xl w-fit flex flex-col ${props.className}`}
      >
        {props.label}
        <input
          {...field}
          className=" border-blue border-2 p-1 h-8"
          placeholder={props.placeholder}
          type={props.type}
          min={props.min}
          max={props.max}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </label>
    </>
  );
}

export default TextInput;
