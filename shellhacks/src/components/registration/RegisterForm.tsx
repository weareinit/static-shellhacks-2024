import React from "react";

import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";

import { useFormOptionContext } from "@/hooks/FormOptionContext";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import CheckboxInput from "../input/CheckboxInput";
import Button from "../input/Button";

function RegisterForm() {
  interface Values {
    firstName: string;
    lastName: string;
    age: string;
    phoneNumber: string;
    email: string;
    school: string;
    gradYear: string;
    levelOfStudy: string;
    country: string;
    isInternational: boolean;
    agreedMLHConduct: boolean;
    agreedMLHPrivacy: boolean;
    agreedMLHNews: boolean;
  }

  const formValidation = Yup.object().shape({
    firstName: Yup.string().required("First Name is equired"),
    lastName: Yup.string().required("Last Name is required"),
    age: Yup.number()
      .required()
      .min(18, "You must be at least 18 to compete.")
      .max(114, "114 is the age of the oldest person on Earth..."),
    phoneNumber: Yup.string()
      .matches(
        /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/,
        "Invalid phone number format"
      )
      .required("Phone Number is required"),
    email: Yup.string()
      .email("Email is not formmated correctly")
      .required("Email is required"),
    school: Yup.string().required("School is required"),
    gradYear: Yup.number()
      .required("Graduation Year is required")
      .min(2022)
      .max(2028),
    levelOfStudy: Yup.string().required("Level of Study is required"),
    country: Yup.string().required("Country is requiured"),
    isInternational: Yup.boolean(),
    agreedMLHPrivacy: Yup.boolean().oneOf([true], "Must Be Checked"),
    agreedMLHConduct: Yup.boolean().oneOf([true], "Must Be Checked"),
    agreedMLHNews: Yup.boolean(),
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
      validateOnChange
      validationSchema={formValidation}
      initialValues={{
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
        email: "",
        school: "",
        gradYear: "",
        levelOfStudy: "",
        country: "United States of America",
        agreedMLHConduct: false,
        agreedMLHNews: false,
        agreedMLHPrivacy: false,
        isInternational: false,
      }}
      onSubmit={(values) => {
        console.log(values);
        return;
      }}
    >
      {(props: FormikProps<Values>) => (
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
          <h2 className=" font-pixel text-lg font-black underline mt-2">
            We are currently in the process of partnering with MLH. The
            following 3 checkboxes are for this partnership. If we do not end up
            partnering with MLH, your information will not be shared.
          </h2>
          <CheckboxInput
            label="I have read and agree to the MLH Code of Conduct. (https://static.mlh.io/docs/mlh-code-of-conduct.pdf)"
            name="agreedMLHConduct"
            hasInter
          />
          <CheckboxInput
            label="I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy (https://mlh.io/privacy).
          I further agree to the terms of both the MLH Contest Terms and Conditions (https://github.com/MLH/mlh-policies/blob/main/contest-terms.md) and the MLH Privacy Policy (https://mlh.io/privacy)."
            name="agreedMLHPrivacy"
            hasInter
          />
          <CheckboxInput
            label="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
            name="agreedMLHNews"
            hasInter
          />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
