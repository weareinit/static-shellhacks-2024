"use server";
import { Hacker_Applications } from ".prisma/client";

const PRETTY_FIELD_MAPPING: Record<keyof Hacker_Applications, string | null> = {
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email",
  phone_number: "Phone Number",
  age: "Age",
  school: "School",
  major: "Major",
  grad_year: "Grad Year",
  level_of_study: "Level of Study",
  country: "Country",
  userId: null,
  resume_path: null,
  application_status: null,
  created_at: null,
  id: null,
  discord: "Discord",
  pronouns: "Pronouns",
  discord_verification_code: null,
  is_international: "Is international",
  github: "Github",
  linkedin: "Linkedin",
  gender: "Gender",
  ethnicity: "Ethnicity",
  agreed_mlh_news: null,
  check_in_status: null,
  dinosaur_avatar: null,
};

export default async function UserInfo({
  user,
}: {
  user: Hacker_Applications & { discord: string };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {Object.entries(user).map(([key, value]) => {
        if (value && PRETTY_FIELD_MAPPING[key as keyof Hacker_Applications]) {
          return (
            <div key={key} className="flex font-museo">
              <h2>
                <span className="font-bold">
                  {PRETTY_FIELD_MAPPING[key as keyof Hacker_Applications]}:
                </span>
                <span>{(" " + value) as string}</span>
              </h2>
            </div>
          );
        }
      })}
    </div>
  );
}
