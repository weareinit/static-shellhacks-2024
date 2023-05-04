import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useFormOptionContext } from "@/hooks/FormOptionContext";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";

function RegisterForm() {
  const formValidation = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    age: Yup.number().required().min(18).max(114),
    phoneNumber: Yup.string().required(),
    email: Yup.string().email().required(),
    school: Yup.string().required(),
    gradYear: Yup.number().required().min(2024).max(2030),
    levelOfStudy: Yup.string().required(),
    country: Yup.string().required(),
  });

  const { schools, countries } = useFormOptionContext();

  return (
    <Formik
      initialValues={formValidation}
      onSubmit={() => {
        return;
      }}
    >
      <Form>
        <TextInput label="First Name" name="firstName" type="text" />
        <TextInput label="Last Name" name="lastName" type="text" />
        <TextInput label="Age" name="age" type="number" min={18} max={114} />
        <TextInput label="Phone Number" name="phoneNumber" type="tel" />
        <TextInput label="Email" name="email" type="email" />
        <SelectInput label="School" name="school" options={schools} />
        <SelectInput
          label="Country of Residency"
          name="country"
          options={countries}
        />
      </Form>
    </Formik>
  );
}

export default RegisterForm;
