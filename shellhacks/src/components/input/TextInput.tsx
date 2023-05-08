import React, { HTMLInputTypeAttribute } from "react";

import { useField } from "formik";

import Label from "./Label";

interface TextInputProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  min?: number;
  max?: number;
}

function TextInput({ label, ...props }: TextInputProps) {
  const [field, meta] = useField(props);
  return (
    <>
      <Label className="w-fit flex flex-col">
        {label}
        <input
          {...field}
          {...props}
          className={`border-blue border-2 p-1 h-8 font-inter focus:ring-2 ${
            meta.touched && meta.error
              ? `border-red-600 focus:ring-red-600/50 focus:outline-none`
              : `focus:ring-blue/50`
          }`}
        />
        {meta.touched && meta.error ? (
          <div className="font-inter text-sm text-red-600 m-0 p-0 font-semibold underline">
            {meta.error}
          </div>
        ) : null}
      </Label>
    </>
  );
}

export default TextInput;
