import React, { useState } from "react";

import { useField } from "formik";

interface CheckboxInputPropTypes {
  label: string;
  name: string;
}

function CheckboxInput(props: CheckboxInputPropTypes) {
  const [field, meta] = useField(props);
  const [value, setValue] = useState<string>("n");

  return (
    <>
      <label
        htmlFor={props.name}
        className="font-pixel text-lg w-fit flex flex-col"
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
      </label>
    </>
  );
}

export default CheckboxInput;
