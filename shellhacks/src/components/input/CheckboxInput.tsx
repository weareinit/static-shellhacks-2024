import React from "react";

import { useField } from "formik";

import Error from "./Error";
import Label from "./Label";

interface CheckboxInputPropTypes
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  name: string;
  hasInter?: boolean;
  isRequired?: boolean;
}

function CheckboxInput({
  label,
  hasInter,
  isRequired,
  ...props
}: CheckboxInputPropTypes) {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <Label
        className="w-fit h-fit flex flex-col sm:items-center sm:w-full sm:flex-row sm:justify-between"
        hasInter={hasInter}
      >
        <span className="max-w-[90%] md:max-w-[86%]">{label}</span>
        <input {...field} {...props} type="checkbox" className=" sr-only" />
        <div className="relative">
          <div
            className={`w-5 h-5 ${
              meta.value === false ? "bg-white" : "bg-blue"
            }`}
            onClick={() => {
              helpers.setValue(!meta.value);
            }}
          />
          <div className="sm:absolute whitespace-nowrap sm:-bottom-10 md:-bottom-8 right-0">
            {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
          </div>
        </div>
      </Label>
    </>
  );
}

export default CheckboxInput;
