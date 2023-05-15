import React, { useState } from "react";

import { Formik, Form, FormikProps } from "formik";

import { useFormOptionContext } from "@/hooks/FormOptionContext";
import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import {
  ethnicityOptions,
  genderOptions,
  levelsOfStudy,
  majorOptions,
  pronounOptions,
  ApplicantValues,
  formValidation,
} from "@/util/RegistrationData";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import CheckboxInput from "../input/CheckboxInput";
import Button from "../input/Button";
import FileInput from "../input/FileInput";

function RegisterForm() {
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const { schools, countries } = useFormOptionContext();
  const { setFinishedRegistration, setShowRegistration } =
    useShowRegistrationContext();

  async function getResumeLink() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/v1/resumes`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Error Fetching Resume Link");
    }

    return response.json();
  }

  async function uploadResume(resume: File, url: string) {
    const response = await fetch(url, {
      method: "PUT",
      body: resume,
      headers: {
        "Content-Type": "file",
      },
    });

    if (!response.ok) {
      throw new Error("Error Uploading Resume");
    }

    return response;
  }

  async function registerApplicant(resumeId: string, body: Object) {
    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([_, value]) => value !== "")
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/v1/events/1/applicants`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...filteredBody, resume_path: resumeId }),
      }
    );

    if (!response.ok) {
      throw new Error("Error Registering Applicant");
    }

    return response;
  }

  return (
    <>
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

          body.pronouns =
            values.pronouns === "Other"
              ? values.fill_in_pronouns
              : values.pronouns;

          try {
            const { resumeId, url } = await getResumeLink();
            await uploadResume(resume, url);
            await registerApplicant(resumeId, body);
          } catch {
            setShowErrorModal(true);
            return;
          }

          setFinishedRegistration(true);
          setShowRegistration(false);
        }}
      >
        {(props: FormikProps<ApplicantValues>) => (
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
              isRequired
            />

            <h2 className=" font-pixel text-lg font-black underline mt-2">
              We are currently in the process of partnering with MLH. The
              following 3 checkboxes are for this partnership. If we do not end
              up partnering with MLH, your information will not be shared.
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
                  I authorize you to share my application/registration
                  information with Major League Hacking for event
                  administration, ranking, and MLH administration in-line with
                  the MLH Privacy Policy (https://mlh.io/privacy). I further
                  agree to the terms of both the MLH Contest Terms and
                  Conditions (
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
            {showErrorModal && (
              <h2 className="text-lg font-pixel text-red-600">
                There was an error submitting, please try again later.
              </h2>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm;
