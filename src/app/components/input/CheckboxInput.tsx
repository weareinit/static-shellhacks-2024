import React from "react";
import { useField } from "formik";
import Error from "./Error";
import Label from "./Label";
import Image from "next/image";

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
    <div className="flex flex-col">
      <div className="my-3 flex basis-full flex-col sm:flex-row sm:items-center sm:justify-between">
        <Label hasInter={hasInter} className="font-museo font-bold">
          {label}
        </Label>

        <input {...field} {...props} type="checkbox" className="sr-only" />
        <div className="relative sm:mx-5">
          <div
            className={`h-5 w-5 border border-black ${
              meta.value ? "bg-[#3E3022]" : "bg-white"
            } flex cursor-pointer items-center justify-center`}
            onClick={() => {
              helpers.setValue(!meta.value);
            }}
          ></div>
        </div>
      </div>

      <div className="basis-full">
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </div>
    </div>
  );
}

export default CheckboxInput;
