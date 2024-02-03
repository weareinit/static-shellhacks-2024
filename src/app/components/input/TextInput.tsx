import React from "react";

import { useField } from "formik";

import Error from "./Error";
import Label from "./Label";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  isRequired?: boolean;
}

function TextInput({ label, isRequired, ...props }: TextInputProps) {
  const [field, meta] = useField(props);
  return (
    <div className="basis-full flex flex-col my-1">
      <Label className="basis-full">{isRequired ? `*${label}` : label}</Label>
      <input
        {...field}
        {...props}
        className={`border-blue basis-full border-2 p-1 h-8 sm:h-10 font-inter focus:ring-2 ${
          meta.touched && meta.error
            ? `border-red-600 focus:ring-red-600/50 focus:outline-none`
            : `focus:ring-blue/50`
        }`}
      />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </div>
  );
}

export default TextInput;
