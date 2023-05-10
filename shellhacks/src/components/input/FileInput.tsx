import React, { ChangeEvent } from "react";

import { useField } from "formik";

import Label from "./Label";
import Error from "./Error";

interface FileInputProps {
  label: string;
  name: string;
}

const FileInput = ({ label, ...props }: FileInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue(file);
  };

  return (
    <>
      <Label>
        {label}
        <input type="file" onChange={handleChange} {...props} />
        {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
      </Label>
    </>
  );
};

export default FileInput;
