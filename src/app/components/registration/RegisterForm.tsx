"use client";
import React, { useState } from "react";

import { Formik, Form, type FormikProps } from "formik";

import { useFormOptionContext } from "@/app//hooks/FormOptionContext";
import { useShowRegistrationContext } from "@/app/hooks/ShowRegistrationContext";
import {
  ethnicityOptions,
  genderOptions,
  levelsOfStudy,
  majorOptions,
  pronounOptions,
  type ApplicantValues,
  formValidation,
  gradYearOptions,
} from "@/app/util/RegistrationData";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import CheckboxInput from "../input/CheckboxInput";
import SearchInput from "../input/searchInput";
import Button from "../input/Button";
import FileInput from "../input/FileInput";
import ReCAPTCHA from "react-google-recaptcha";
import schools from "../../../../public/registration_data/schools.json";
import countries from "../../../../public/registration_data/countries.json";
import { CustomButton } from "@/app/dashboard/components/CustomButton";

function RegisterForm() {
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // const { setFinishedRegistration, setShowRegistration } =
  //   useShowRegistrationContext();

  const handleSubmit = async (values: ApplicantValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log("VALUES", values);

    let { fill_in_pronouns, ...body } = values;
    body.pronouns =
      values.pronouns === "Other" ? values.fill_in_pronouns : values.pronouns;

    try {
      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== ""),
      );

      const response = await fetch(`/api/applications`, {
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(filteredBody),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error);
      }

      const content = await response.json();
      console.log(content);

      setIsSubmitting(false);
    } catch (e: any) {
      setError(e.message);
      setIsSubmitting(false);
      return;
    }

    //redirect to dashboard...
    // setFinishedRegistration(true);
    // setShowRegistration(false);
  };

  return (
    <>
      <Formik
        validateOnChange
        // validationSchema={formValidation}
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

          // agreed_international: false,
          // agreed_liability: false,
          // agreed_media: false,
          // agreed_sponsors: false, //required for us to send resumes to sponsors
          agreed_mlh_conduct: false,

          agreed_mlh_terms: false,
          agreed_mlh_news: false,

          // agreed_mlh_privacy: false,
          recaptcha: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<ApplicantValues>) => (
          <Form className="my-2 flex flex-col">
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
            <TextInput label="Email" name="email" type="email" isRequired />
            <TextInput
              label="Age"
              name="age"
              type="number"
              min={18}
              max={114}
              isRequired
            />
            <SearchInput
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

            <SelectInput
              label="Graduation Year"
              name="grad_year"
              options={gradYearOptions}
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
            <FileInput
              label="Resume"
              name="resume"
              isRequired
              maxSize={1 * 1024 * 1024}
            />
            <TextInput label="Discord" name="discord" type="text" />
            <TextInput label="Github" name="github" type="text" />
            <TextInput label="LinkedIn" name="linkedin" type="text" />
            <CheckboxInput
              label="Are you an international student (currently on a non-immigrant visa status in the US such as F-1, or others)?"
              name="is_international"
            />

            <SelectInput
              label="Gender"
              name="gender"
              options={genderOptions}
              isRequired
            />
            <SelectInput
              options={pronounOptions}
              label="Pronouns"
              name="pronouns"
              isRequired
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

            <div className="sm:my-3" />

            <p className="font-museo">
              We are currently in the process of partnering with MLH. The
              following 3 checkboxes are for this partnership. If we do not end
              up partnering with MLH, your information will not be shared
            </p>

            <CheckboxInput
              label={
                <p>
                  I have read and agree to the MLH Code of Conduct. (
                  <a href="" target="_blank" className="text-blue-500">
                    https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md
                  </a>
                  )
                </p>
              }
              name="agreed_mlh_conduct"
              hasInter
              isRequired
            />

            <CheckboxInput
              label={
                <p>
                  I authorize you to share my application/registration
                  information with Major League Hacking for event
                  administration, ranking, and MLH administration in-line with
                  the
                  <a
                    href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                    className="ml-2 text-blue-500"
                  >
                    MLH Privacy Policy
                  </a>
                  . I further agree to the terms of both the
                  <a
                    href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                    className="ml-2 text-blue-500"
                  >
                    MLH Contest Terms and Conditions
                  </a>
                  and the
                  <a
                    href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                    className="ml-2 text-blue-500"
                  >
                    MLH Privacy Policy
                  </a>
                  .
                </p>
              }
              name="agreed_mlh_terms"
              hasInter
              isRequired
            />

            <CheckboxInput //required for us to send resumes to sponsors
              label={
                <p>
                  I authorize MLH to send me occasional emails about relevant
                  events, career opportunities, and community announcements.
                </p>
              }
              name="agreed_mlh_news"
              hasInter
            />

            <ReCAPTCHA
              size="normal"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
              onChange={(code: string | null) => {
                void props.setFieldValue("recaptcha", code);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
                marginBottom: "3rem", // Adjust the margin top as needed
              }}
            />

            <div className="flex justify-end">
              <CustomButton type="submit">
                Submit
                {isSubmitting && (
                  <span className="ml-2">
                    <img
                      src="/assets/decorations/shell.svg"
                      className="w-5 animate-spin"
                    />
                  </span>
                )}
              </CustomButton>
            </div>

            {error != "" && (
              <h2 className="font-pixel mt-1 text-center text-lg text-red-600">
                There was an error submitting, please try again later. {error}
              </h2>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm;
