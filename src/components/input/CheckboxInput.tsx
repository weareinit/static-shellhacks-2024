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
    <div className="flex flex-col basis-full">
      <div className="flex flex-col basis-full sm:flex-row sm:items-center sm:justify-between my-3">
        <Label hasInter={hasInter}>{label}</Label>

        <input {...field} {...props} type="checkbox" className=" sr-only" />
        <div className="relative sm:mx-5">
          <div
            className={`w-5 h-5 ${
              meta.value === false ? "bg-white" : "bg-blue"
            }`}
            onClick={() => {
              helpers.setValue(!meta.value);
            }}
          />
        </div>
      </div>

      <div className="basis-full">
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </div>
    </div>
  );
}

export default CheckboxInput;
