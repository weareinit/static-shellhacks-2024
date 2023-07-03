import React, { ChangeEvent } from "react";
import { useField } from "formik";
import Label from "./Label";
import Error from "./Error";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  isRequired?: boolean;
  maxSize?: number; // Maximum file size in bytes
}

const FileInput = ({ label, isRequired, maxSize, ...props }: FileInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

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
    <>
      <Label className="flex flex-col">
        {isRequired ? `*${label}` : label}
        <input type="file" accept=".pdf" onChange={handleChange} {...props} />
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </Label>
    </>
  );
};

export default FileInput;
