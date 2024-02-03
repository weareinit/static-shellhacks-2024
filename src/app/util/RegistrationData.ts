import * as Yup from "yup";

export const levelsOfStudy = [
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

export const dietaryRestrictions = ["Vegetarian", "Vegan", "Celiac Disease", "Allergies", "Kosher", "Halal"];

export const genderOptions = ["Male", "Female", "Non-Binary", "Prefer Not to Answer"]; //Removed prefer to self describe

export const pronounOptions = ["She/Her", "He/Him", "They/Them", "She/They", "He/They", "Prefer Not to Answer", "Other"];

export const ethnicityOptions = [
  "Asian Indian",
  "Black or African",
  "Chinese",
  "Filipino",
  "Guamanian or Chamorro",
  "Hispanic / Latino / Spanish Origin",
  "Japanese",
  "Korean",
  "Middle Eastern",
  "Native American or Alaskan Native",
  "Native Hawaiian",
  "Samoan",
  "Vietnamese",
  "White",
  "Other Asian (Thai, Cambodian, etc)",
  "Other Pacific Islander",
  "Other",
  "Prefer Not to Answer",
];

export const gradYearOptions = ["2022", "2023", "2024", "2025", "2026", "2027", "2028"];

export const majorOptions = [
  "Computer Science",
  "Computer Engineering",
  "Software Engineering",
  "Another engineering discipline (such as civil, electrical, mechanical, etc.)",
  "Cybersecurity",
  "Information systems, information technology, or system administration",
  "Mathematics or Statistics",
  "A natural science (such as biology, chemistry, physics, etc.)",
  "Business discipline (such as accounting, finance, marketing, etc.)",
  "Humanities discipline (such as literature, history, philosophy, etc.)",
  "Social science (such as anthropology, psychology, political science, etc.)",
  "Fine arts or performing arts (such as graphic design, music studio, art, etc.)",
  "Health science (such as nursing, pharmacy, radiology, etc.)",
  "Other",
  "Undecided / No Declared Major",
  "My school does not offer majors / primary areas of study",
  "Prefer not to answer",
];

export interface ApplicantValues {
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
  // agreed_media: boolean,
  // agreed_international: boolean,
  // agreed_liability: boolean,
  // agreed_sponsors: boolean; //required for us to send resumes to sponsors
  // agreed_mlh_conduct: boolean;
  // agreed_mlh_privacy: boolean;

  agreed_mlh_news: boolean;
  agreed_terms: boolean;
  recaptcha: string;
}

export const formValidation = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  age: Yup.number().required("Age is required").min(18, "You must be at least 18 to compete.").max(114, "114 is the age of the oldest person on Earth..."),
  school: Yup.string().required("School is required"),
  major: Yup.string().required("Major is required"),
  grad_year: Yup.number().required("Graduation Year is required").min(2022, "Minimum graduation year to participate is 2022.").max(2030, "Maximum graduation year to participate is 2030."),
  level_of_study: Yup.string().required("Level of Study is required"),
  country: Yup.string().required("Country is requiured"),
  // SOCIALS / CONTACTS
  email: Yup.string().email("Email is not formmated correctly").required("Email is required"),
  phone_number: Yup.string()
    .matches(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Invalid phone number format")
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
          return new Yup.ValidationError("Unsupported file format, only .pdf is supported", value, "resume");
        }
      }
    }),
  discord: Yup.string(),
  github: Yup.string().url(),
  linkedin: Yup.string().url(),
  // DEMOGRAPHICS
  is_international: Yup.boolean(),
  gender: Yup.string().required("Please fill an option for gender"),
  pronouns: Yup.string().required("Please fill an option for pronouns"),
  fill_in_pronouns: Yup.string(),
  ethnicity: Yup.string().required("Ethnicity is a required field"),
  // MLH Questions
  agreed_terms: Yup.boolean().oneOf([true], "Must Be Checked"),

  // agreed_media: Yup.boolean().oneOf([true], "Must Be Checked"),
  // agreed_international: Yup.boolean().oneOf([true], "Must Be Checked"),
  // agreed_liability: Yup.boolean().oneOf([true], "Must Be Checked"),
  // agreed_sponsors: Yup.boolean().oneOf([true], "Must Be Checked"), //required for us to send resumes to sponsors
  // agreed_mlh_privacy: Yup.boolean().oneOf([true], "Must Be Checked"),
  // agreed_mlh_conduct: Yup.boolean().oneOf([true], "Must Be Checked"),


  recaptcha: Yup.string().required("Please complete the captcha"),
  agreed_mlh_news: Yup.boolean(),
});
