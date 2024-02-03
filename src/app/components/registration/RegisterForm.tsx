import React, { useState } from "react";

import { Formik, Form, FormikProps } from "formik";

import { useFormOptionContext } from "@/hooks/FormOptionContext";
import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import { ethnicityOptions, genderOptions, levelsOfStudy, majorOptions, pronounOptions, ApplicantValues, formValidation, gradYearOptions } from "@/util/RegistrationData";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import CheckboxInput from "../input/CheckboxInput";
import SearchInput from "../input/searchInput";
import Button from "../input/Button";
import FileInput from "../input/FileInput";
import ReCAPTCHA from "react-google-recaptcha";

function RegisterForm() {
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { schools, countries } = useFormOptionContext();
  const { setFinishedRegistration, setShowRegistration } = useShowRegistrationContext();

  // async function getResumeLink(recaptchaCode: string) {
  //   const response = await fetch(`/api/resumes/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ recaptcha: recaptchaCode }),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Error Fetching Resume Link");
  //   }

  //   return await response.json();
  // }

  async function uploadResume(resume: File, url: string) {
    const response = await fetch(url, {
      method: "PUT",
      body: resume,
      headers: {
        "Content-Type": "application/pdf",
      },
    });

    if (!response.ok) {
      throw new Error("Error Uploading Resume");
    }

    return response;
  }

  async function registerApplicant(body: Object) {
    const filteredBody = Object.fromEntries(Object.entries(body).filter(([_, value]) => value !== ""));

    const response = await fetch(`/api/applications`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
    return content;
  }

  const handleSubmit = async (values: ApplicantValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let { resume, fill_in_pronouns, ...body } = values;
    body.pronouns = values.pronouns === "Other" ? values.fill_in_pronouns : values.pronouns;

    try {
      // const { resumeId, url } = await getResumeLink(body.recaptcha);

      const { resume_url } = await registerApplicant(body);
      await uploadResume(resume, resume_url);
      setIsSubmitting(false);
    } catch (e: any) {
      setError(e.message);
      setIsSubmitting(false);
      return;
    }

    setFinishedRegistration(true);
    setShowRegistration(false);
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
          // agreed_mlh_conduct: false,


          agreed_terms: false,
          agreed_mlh_news: false,

          // agreed_mlh_privacy: false,
          recaptcha: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<ApplicantValues>) => (
          <Form className="flex flex-col my-2">
            <TextInput label="First Name" name="first_name" type="text" isRequired />
            <TextInput label="Last Name" name="last_name" type="text" isRequired />
            <TextInput label="Age" name="age" type="number" min={18} max={114} isRequired />
            <SearchInput label="School" name="school" options={schools} isRequired />
            <SelectInput label="Major" name="major" options={majorOptions} isRequired />

            <SelectInput label="Graduation Year" name="grad_year" options={gradYearOptions} isRequired />

            <SelectInput label="Level of Study" name="level_of_study" options={levelsOfStudy} isRequired />

            <SelectInput label="Country of Residency" name="country" options={countries} defaultValue="United States of America" isRequired />

            <TextInput label="Email" name="email" type="email" isRequired />
            <TextInput label="Phone Number" name="phone_number" type="tel" isRequired />
            <FileInput label="Resume" name="resume" isRequired maxSize={1 * 1024 * 1024} />
            <TextInput label="Discord" name="discord" type="text" />
            <TextInput label="Github" name="github" type="text" />
            <TextInput label="LinkedIn" name="linkedin" type="text" />
            <CheckboxInput label="Are you an international student (currently on a non-immigrant visa status in the US such as F-1, or others)?" name="is_international" />

            <SelectInput label="Gender" name="gender" options={genderOptions} isRequired />
            <SelectInput options={pronounOptions} label="Pronouns" name="pronouns" isRequired />
            {props.values.pronouns === "Other" && <TextInput label="Fill in your pronouns here" name="fill_in_pronouns" type="text" />}
            <SelectInput label="Ethnicity" name="ethnicity" options={ethnicityOptions} isRequired />

            <div className="sm:my-3" />

            <CheckboxInput
              label={
                <p>
                  I have thoroughly read and agree to all policies outlined in the provided document. (
                  <a target="_blank" href="https://docs.google.com/document/d/1QQCNz75v09EAiqE5Dg5UvubRxMYePIVZMajsA_I4GlM/edit">
                    Terms and Conditions
                  </a>
                  )
                </p>
              }
              name="agreed_terms"
              hasInter
              isRequired
            />
            {/* <CheckboxInput
              label={
                <p>
                  I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy
                  Policy (https://mlh.io/privacy). I further agree to the terms of both the MLH Contest Terms and Conditions (
                  <a target="_blank" href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">
                    https://github.com/MLH/mlh-policies/blob/main/contest-terms.md
                  </a>
                  ) and the MLH Privacy Policy (
                  <a target="_blank" href="https://mlh.io/privacy">
                    https://mlh.io/privacy
                  </a>
                  ).
                </p>
              }
              name="agreed_mlh_privacy"
              hasInter
            />

            <CheckboxInput
              label={
                <p>
                  I acknowledge and authorize the sharing of my registration information with corporate sponsors for the purpose of exploring potential job opportunities.
                  This sharing of information allows us to connect you with relevant corporate sponsors who may be interested in considering you for employment or related opportunities.
                </p>
              }
              name="agreed_sponsors"
              hasInter
              isRequired
            />

            <CheckboxInput
              label={
                <p>
                  I acknowledge that if I am an international non-FIU student I am not eligible for non sponsor prizes (1st, 2nd, 3rd or best first time hacker) or non sponsor social media giveaways if I do win as per FIU’s tax division policies.
                </p>
              }
              name="agreed_international"
              hasInter
              isRequired
            />

            <CheckboxInput
              label={
                <p>
                  I acknowledge that ANY organization that helped organize Shellhacks, will not be held liable for any lost or stolen property.
                </p>
              }
              name="agreed_liability"
              hasInter
              isRequired
            />

            <CheckboxInput
              label={
                <p>
                  I acknowledge and authorize the filming and recording of myself throughout the event.
                </p>
              }
              name="agreed_media"
              hasInter
              isRequired
            /> */}

            <CheckboxInput //required for us to send resumes to sponsors
              label={<p>I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.</p>}
              name="agreed_mlh_news"
              hasInter
            />

            <ReCAPTCHA
              size="normal"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
              onChange={(code: string | null) => {
                props.setFieldValue("recaptcha", code);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                marginBottom: "1rem", // Adjust the margin top as needed
              }}
            />

            <Button type="submit" className="bg-pink text-white rounded-pixel-primary hover:underline mx-auto whitespace-nowrap w-56 flex justify-center items-center">
              Submit
              {isSubmitting && (
                <span className="ml-2">
                  <img src="/assets/decorations/shell.svg" className="animate-spin w-5" />
                </span>
              )}
            </Button>

            {error != "" && <h2 className="text-lg text-center mt-1 font-pixel text-red-600">There was an error submitting, please try again later. {error}</h2>}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm;
