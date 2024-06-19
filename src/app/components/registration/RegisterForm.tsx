"use client";
import React, { useState } from "react";

import { Formik, Form, type FormikProps } from "formik";

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
import FileInput from "../input/FileInput";
import ReCAPTCHA from "react-google-recaptcha";
import schools from "../../../../public/registration_data/schools.json";
import countries from "../../../../public/registration_data/countries.json";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (values: ApplicantValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let { fill_in_pronouns, ...body } = values;
    body.pronouns =
      values.pronouns === "Other" ? values.fill_in_pronouns : values.pronouns;

    try {
      const { resume, ...fields } = body;

      //why exactly do we need this?
      const filteredBody = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== ""),
      );

      const formData = new FormData();
      formData.append("json_application", JSON.stringify(filteredBody));
      formData.append("resume", resume);

      const response = await fetch(`/api/hackers`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      // setIsSubmitting(false);
      router.push("/dashboard");
    }
  };

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
          agreed_liability: false,
          agreed_media: false,
          agreed_sponsors: false, //required for us to send resumes to sponsors
          agreed_mlh_conduct: false,

          agreed_mlh_terms: false,
          agreed_mlh_news: false,

          // agreed_mlh_privacy: false,
          recaptcha: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<ApplicantValues>) => (
          <Form className="my-2 flex flex-col ">
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
              label="Phone Number"
              name="phone_number"
              type="tel"
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

            <FileInput
              label="Resume"
              name="resume"
              isRequired
              maxSize={1 * 1024 * 1024}
            />
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
            <CheckboxInput //required for us to send resumes to sponsors
              label={
                <p>
                  I acknowledge and authorize the sharing of my registration
                  information with corporate sponsors for the purpose of
                  exploring potential job opportunities. This sharing of
                  information allows them to connect me with relevant corporate
                  sponsors who may be interested in considering me for
                  employment or related opportunities.
                </p>
              }
              name="agreed_sponsors"
              hasInter
            />
            <CheckboxInput //required to allow filming
              label={
                <p>
                  I acknowledge and authorize the filming and recording of
                  myself throughout the event. I understand that any photos or
                  videos taken may be used by INIT for marketing and social
                  media purposes.
                </p>
              }
              name="agreed_media"
              hasInter
            />
            <CheckboxInput //required for liability
              label={
                <p>
                  I acknowledge that ShellHacks and its organizing team will not
                  be held liable for any lost or stolen property.
                </p>
              }
              name="agreed_liability"
              hasInter
            />
            <div className="mt-1 sm:mb-4" />

            <p className="mb-3 font-museo text-xl">
              We are partnered with MLH, the official collegiate hackathon
              league in the United States. The disclaimers below pertain to this
              partnership.
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

            <div className="flex justify-center">
              <button
                type="submit"
                className="min-w-full cursor-pointer rounded-md bg-[#78644F] p-2 hover:bg-[#78644F]/80 sm:min-w-[200px] sm:rounded-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  {isSubmitting && (
                    <img
                      src="assets/new/misc/Shell_1.svg"
                      className="w-7 animate-spin"
                    />
                  )}

                  <span className="mt-1 font-zoonaji text-xl text-white">
                    Apply
                  </span>
                </div>
              </button>
            </div>

            {error != "" && (
              <h2 className="font-pixel mt-1 text-center text-lg text-red-600">
                There was an error submitting, please try again later. {error}
              </h2>
            )}
            <div className="h-20"></div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm;
