import React, { useState } from "react";

import { useField } from "formik";

import Label from "./Label";
import Error from "./Error";

interface CheckboxInputPropTypes {
  label: string;
  name: string;
  hasInter?: boolean;
}

function CheckboxInput({ label, hasInter, ...props }: CheckboxInputPropTypes) {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <Label className="w-fit flex flex-col" hasInter={hasInter}>
        {label}
        <input {...field} {...props} type="checkbox" className=" sr-only" />
        <div
          className={`w-5 h-5 ${meta.value === false ? "bg-white" : "bg-blue"}`}
          onClick={() => {
            helpers.setValue(!meta.value);
          }}
        />
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </Label>
    </>
  );
}

export default CheckboxInput;
