import React, { ChangeEvent } from "react";
import { useField } from "formik";
import Label from "./Label";
import Error from "./Error";
import { CustomButton } from "@/app/dashboard/components/CustomButton";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  isRequired?: boolean;
  maxSize?: number; // Maximum file size in bytes
}

const FileInput = ({
  label,
  isRequired,
  maxSize,
  ...props
}: FileInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && maxSize && file.size > maxSize) {
      // Check if the file size exceeds the maximum size
      setValue(null); // Reset the field value
      e.target.value = ""; // Reset the file input value
      return; // Do not proceed further
    }
    setValue(file);
  };

  return (
    <div className="max-w-[300px]">
      <Label className="flex flex-col font-mono font-bold">
        {isRequired ? `*${label}` : label}
      </Label>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleChange}
        {...props}
      />
      <CustomButton
        onClick={() => fileInputRef.current?.click()}
        colorVariant={2}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
          </svg>

          <span className="mt-1">Choose file</span>
        </div>
      </CustomButton>
      {/* <Label className="flex flex-col">
        {isRequired ? `*${label}` : label}
        <input type="file" accept=".pdf" onChange={handleChange} {...props} />
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </Label> */}
    </div>
  );
};

export default FileInput;
