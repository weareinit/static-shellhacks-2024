import React, { useState } from "react";

import { useField } from "formik";

import Label from "./Label";

interface CheckboxInputPropTypes {
  label: string;
  name: string;
  hasInter?: boolean;
}

function CheckboxInput(props: CheckboxInputPropTypes) {
  const [field, meta] = useField(props);
  const [value, setValue] = useState<string>("n");

  return (
    <>
      <Label
        htmlFor={props.name}
        className="w-fit flex flex-col"
        hasInter={props.hasInter}
      >
        {props.label}
        <input {...field} type="checkbox" className=" sr-only" value={value} />
        <div
          className={`w-5 h-5 ${value === "n" ? "bg-white" : "bg-blue"}`}
          onClick={() => {
            setValue((prev) => {
              if (prev === "n") {
                return "y";
              }
              return "n";
            });
          }}
        />
      </Label>
    </>
  );
}

export default CheckboxInput;
