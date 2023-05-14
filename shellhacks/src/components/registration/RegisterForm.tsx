import React from "react";

import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";

import { useFormOptionContext } from "@/hooks/FormOptionContext";
import {
  ethnicityOptions,
  genderOptions,
  levelsOfStudy,
  majorOptions,
  pronounOptions,
} from "@/util/RegistrationData";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import CheckboxInput from "../input/CheckboxInput";
import Button from "../input/Button";
import FileInput from "../input/FileInput";

function RegisterForm() {
  interface Values {
    first_name: string;
    last_name: string;
    age: number;
    school: string;
    major: string;
    gradYear: string;
    level_of_study: string;
    country: string;
    // SOCIALS / CONTACTS
    email: string;
    phone_number: string;
    resume: File;
    discord: string;
    github: string;
    linkedin: string;
    // DEMOGRAPHICS
    is_international: boolean;
    gender: string;
    pronouns: string;
    fill_in_pronouns: string;
    ethnicity: string;
    // MLH QUESTIONS
    agreed_mlh_conduct: boolean;
    agreed_mlh_privacy: boolean;
    agreed_mlh_news: boolean;
  }

  const formValidation = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    age: Yup.number()
      .required("Age is required")
      .min(18, "You must be at least 18 to compete.")
      .max(114, "114 is the age of the oldest person on Earth..."),
    school: Yup.string().required("School is required"),
    major: Yup.string().required("Major is required"),
    grad_year: Yup.number()
      .required("Graduation Year is required")
      .min(2022, "Minimum graduation year to participate is 2022.")
      .max(2030, "Maximum graduation year to participate is 2030."),
    level_of_study: Yup.string().required("Level of Study is required"),
    country: Yup.string().required("Country is requiured"),
    // SOCIALS / CONTACTS
    email: Yup.string()
      .email("Email is not formmated correctly")
      .required("Email is required"),
    phone_number: Yup.string()
      .matches(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
        "Invalid phone number format"
      )
      .required("Phone Number is required"),
    resume: Yup.mixed()
      .test("fileSize", "File size is too large", (value) => {
        if (value instanceof File) {
          return value.size <= 2000000;
        } else {
          return false;
        }
      })
      .test("fileType", "Unsupported File Format", (value) => {
        let file = value as File | null;
        if (!file) {
          return new Yup.ValidationError("A file is required", value, "resume");
        } else {
          const supportedFormats = ["application/pdf"];
          if (supportedFormats.includes(file.type)) {
            return true;
          } else {
            return new Yup.ValidationError(
              "Unsupported File Format",
              value,
              "resume"
            );
          }
        }
      }),
    discord: Yup.string(),
    github: Yup.string().url(),
    linkedin: Yup.string().url(),
    // DEMOGRAPHICS
    is_international: Yup.boolean(),
    gender: Yup.string(),
    pronouns: Yup.string(),
    fill_in_pronouns: Yup.string(),
    ethnicity: Yup.string().required("Ethnicity is a required field"),
    // MLH Questions
    agreed_mlh_privacy: Yup.boolean().oneOf([true], "Must Be Checked"),
    agreed_mlh_conduct: Yup.boolean().oneOf([true], "Must Be Checked"),
    agreed_mlh_news: Yup.boolean(),
  });

  const { schools, countries } = useFormOptionContext();

  async function getResumeLink() {
    const response = await fetch("http://localhost:8000/api/v1/resumes", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Error Fetching Resume Link");
    }

    return response.json();
  }

  async function uploadResume(resume: File, url: string) {
    const response = await fetch(url, {
      method: "POST",
      body: resume,
      headers: {
        "Content-Type": "file",
      },
    });

    if (!response.ok) {
      throw new Error("Error Uploading Resume");
    }

    return response.json();
  }

  return (
    <Formik
      validateOnChange
      validationSchema={formValidation}
      initialValues={{
        first_name: "",
        last_name: "",
        age: 18,
        school: "",
        major: "",
        gradYear: "",
        level_of_study: "",
        country: "United States of America",
        // SOCIALS / CONTACTS
        email: "",
        phone_number: "",
        resume: new File([], ""),
        discord: "",
        github: "",
        linkedin: "",
        // DEMOGRAPHICS
        is_international: false,
        gender: "",
        pronouns: "",
        fill_in_pronouns: "",
        ethnicity: "",
        // MLH QUESTIONS
        agreed_mlh_conduct: false,
        agreed_mlh_news: false,
        agreed_mlh_privacy: false,
      }}
      onSubmit={async (values) => {
        let { resume, fill_in_pronouns, ...body } = values;

        // TODO: Handle errors
        const { resumeId, url } = await getResumeLink();

        console.log(resumeId, url);

        // TODO: Handle errors
        await uploadResume(resume, url);

        // body.pronouns =
        //   values.pronouns === "Other"
        //     ? values.fill_in_pronouns
        //     : values.pronouns;

        // await fetch("backend:8000/api/v1/events/1/applicant", {
        //   method: "POST",
        //   body: JSON.stringify(body),
        // });
      }}
    >
      {(props: FormikProps<Values>) => (
        <Form className="grid gap-3 my-2">
          <TextInput
            label="First Name"
            name="first_name"
            type="text"
            isRequired
          />
          <TextInput
            label="Last Name"
            name="last_name"
            type="text"
            isRequired
          />
          <TextInput
            label="Age"
            name="age"
            type="number"
            min={18}
            max={114}
            isRequired
          />
          <SelectInput
            label="School"
            name="school"
            options={schools}
            isRequired
          />
          <SelectInput
            label="Major"
            name="major"
            options={majorOptions}
            isRequired
          />

          <TextInput
            label="Graduation Year"
            name="grad_year"
            type="number"
            min={2023}
            max={2033}
            isRequired
          />

          <SelectInput
            label="Level of Study"
            name="level_of_study"
            options={levelsOfStudy}
            isRequired
          />

          <SelectInput
            label="Country of Residency"
            name="country"
            options={countries}
            defaultValue="United States of America"
            isRequired
          />

          <TextInput label="Email" name="email" type="email" isRequired />
          <TextInput
            label="Phone Number"
            name="phone_number"
            type="tel"
            isRequired
          />
          <FileInput label="Resume" name="resume" isRequired />
          <TextInput label="Discord" name="discord" type="text" />
          <TextInput label="Github" name="github" type="text" />
          <TextInput label="LinkedIn" name="linkedin" type="text" />
          <CheckboxInput
            label="Check if you are an international student"
            name="is_international"
          />

          <SelectInput label="Gender" name="gender" options={genderOptions} />
          <SelectInput
            options={pronounOptions}
            label="Pronouns"
            name="pronouns"
          />
          {props.values.pronouns === "Other" && (
            <TextInput
              label="Fill in your pronouns here"
              name="fill_in_pronouns"
              type="text"
            />
          )}
          <SelectInput
            label="Ethnicity"
            name="ethnicity"
            options={ethnicityOptions}
          />

          <h2 className=" font-pixel text-lg font-black underline mt-2">
            We are currently in the process of partnering with MLH. The
            following 3 checkboxes are for this partnership. If we do not end up
            partnering with MLH, your information will not be shared.
          </h2>
          <CheckboxInput
            label={
              <h2>
                I have read and agree to the MLH Code of Conduct.
                <a
                  target="_blank"
                  href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                >
                  (https://static.mlh.io/docs/mlh-code-of-conduct.pdf)
                </a>
              </h2>
            }
            name="agreed_mlh_conduct"
            hasInter
            isRequired
          />
          <CheckboxInput
            label={
              <h2>
                I authorize you to share my application/registration information
                with Major League Hacking for event administration, ranking, and
                MLH administration in-line with the MLH Privacy Policy
                (https://mlh.io/privacy). I further agree to the terms of both
                the MLH Contest Terms and Conditions (
                <a
                  target="_blank"
                  href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                >
                  https://github.com/MLH/mlh-policies/blob/main/contest-terms.md
                </a>
                ) and the MLH Privacy Policy (
                <a target="_blank" href="https://mlh.io/privacy">
                  https://mlh.io/privacy
                </a>
                ).
              </h2>
            }
            name="agreed_mlh_privacy"
            hasInter
            isRequired
          />
          <CheckboxInput
            label="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
            name="agreed_mlh_news"
            hasInter
          />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
