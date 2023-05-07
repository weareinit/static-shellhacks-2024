import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useFormOptionContext } from "@/hooks/FormOptionContext";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import CheckboxInput from "../input/CheckboxInput";

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

  const levelsOfStudy = [
    "Less than Secondary / High School",
    "Secondary / High School",
    "Undergraduate University (2 year - community college or similar)",
    "Undergraduate University (3+ year)",
    "Graduate University (3+ year)",
    "Graduate University (Masters, Professional, Doctoral, etc)",
    "Code School / Bootcamp",
    "Other Vocational / Trade Program or Apprenticeship",
    "Post Doctorate",
    "Other",
    "I'm not currently a student",
    "Prefer not to answer",
  ];

  return (
    <Formik
      initialValues={formValidation}
      onSubmit={() => {
        return;
      }}
    >
      <Form className="grid gap-3 my-2">
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
          defaultValue="United States of America"
        />
        <TextInput
          label="Graduation Year"
          name="gradYear"
          type="number"
          min={2023}
          max={2033}
        />
        <SelectInput
          label="Level of Study"
          name="levelOfStudy"
          options={levelsOfStudy}
        />
        <CheckboxInput
          label="Are you an international student?"
          name="isInternational"
        />
        <h2 className=" font-pixel text-lg">
          We are currently in the process of partnering with MLH. The following
          3 checkboxes are for this partnership. If we do not end up partnering
          with MLH, your information will not be shared.
        </h2>
        <CheckboxInput
          label="I have read and agree to the MLH Code of Conduct. (https://static.mlh.io/docs/mlh-code-of-conduct.pdf)"
          name="mlhCodeOfConduct"
        />
        <CheckboxInput
          label="I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy (https://mlh.io/privacy).
          I further agree to the terms of both the MLH Contest Terms and Conditions (https://github.com/MLH/mlh-policies/blob/main/contest-terms.md) and the MLH Privacy Policy (https://mlh.io/privacy)."
          name="mlhPrivacy"
        />
      </Form>
    </Formik>
  );
}

export default RegisterForm;
