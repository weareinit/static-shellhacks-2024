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
    <div className="my-1 flex basis-full flex-col">
      <Label className="basis-full">{isRequired ? `*${label}` : label}</Label>
      <input
        {...field}
        {...props}
        className={`h-8 basis-full rounded-lg border-2 border-[#787976] bg-[#f1e9e0] p-1 py-2 font-inter !opacity-100 focus:ring-2 sm:h-10 ${
          meta.touched && meta.error
            ? `border-red-600 focus:outline-none focus:ring-red-600/50`
            : `focus:ring-blue/50`
        }`}
      />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </div>
  );
}

export default TextInput;
