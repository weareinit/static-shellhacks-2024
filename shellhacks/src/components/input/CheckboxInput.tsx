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
      <label htmlFor={props.name}>
        {props.label}
        <input
          {...field}
          type="checkbox"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </label>
    </>
  );
}

export default CheckboxInput;
