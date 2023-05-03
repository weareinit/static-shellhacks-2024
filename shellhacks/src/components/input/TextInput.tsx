import React, { useState, HTMLInputTypeAttribute } from "react";

import { useField } from "formik";

interface TextInputProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  min?: number;
  max?: number;
}

function TextInput(props: TextInputProps) {
  const [field, meta] = useField(props);
  const [value, setValue] = useState("");
  return (
    <>
      <label htmlFor={props.name}>
        {props.label}
        <input
          {...field}
          placeholder={props.placeholder}
          type={props.type}
          min={props.min}
          max={props.max}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </label>
    </>
  );
}

export default TextInput;
