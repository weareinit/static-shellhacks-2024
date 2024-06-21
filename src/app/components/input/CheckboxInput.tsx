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
      {/* <div className="my-3 flex basis-full flex-col sm:flex-row sm:items-center sm:justify-between"> */}
      <div className="xl:justify-left my-3 flex w-full flex-col items-start gap-3">
        <Label hasInter={hasInter} className="font-museo font-bold">
          {label}
        </Label>

        <input {...field} {...props} type="checkbox" className="sr-only" />
        <div className="relative">
          <div
            className={`h-5 w-5 border border-black ${
              meta.value ? "bg-[#3E3022]" : "bg-white"
            } flex cursor-pointer items-center justify-center`}
            onClick={() => {
              helpers.setValue(!meta.value);
            }}
          >
            {meta.value ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            ) : null}
          </div>
        </div>
      </div>

      <div className="basis-full">
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </div>
    </div>
  );
}

export default CheckboxInput;
