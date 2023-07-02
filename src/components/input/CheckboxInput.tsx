import React from "react";
import { useField } from "formik";
import Error from "./Error";
import Label from "./Label";

interface CheckboxInputPropTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  name: string;
  hasInter?: boolean;
  isRequired?: boolean;
}

function CheckboxInput({ label, hasInter, isRequired, ...props }: CheckboxInputPropTypes) {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col basis-full sm:flex-row sm:items-center sm:justify-between my-3">
        <Label hasInter={hasInter}>{label}</Label>

        <input {...field} {...props} type="checkbox" className="sr-only" />
        <div className="relative sm:mx-5">
          <div
            className={`w-5 h-5 border-2 border-blue ${
              meta.value ? "bg-blue" : "bg-white"
            } flex justify-center items-center cursor-pointer`}
            onClick={() => {
              helpers.setValue(!meta.value);
            }}
          >
            {meta.value && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-3 h-3"
              >
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
              </svg>
            )}
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
