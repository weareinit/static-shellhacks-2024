import React, { useRef, useState } from "react";
import { Prisma } from "@prisma/client";

interface ApplicantCellPropType {
  data: Prisma.Hacker_ApplicationsUncheckedCreateInput;
}

export default function ApplicantCell({ data }: ApplicantCellPropType) {
  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium">Personal Information</h2>
          <p>
            <u>Age</u>: {data.age}
          </p>
          <p>
            <u>Country:</u> {data.country}
          </p>
          <p>
            <u>Gender:</u> {data.gender}
          </p>
          <p>
            <u>Pronouns:</u> {data.pronouns}
          </p>
          <p>
            <u>Ethnicity:</u> {data.ethnicity}
          </p>
          <p>
            <u>International:</u> {data.is_international ? "Yes" : "No"}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Education Information</h2>
          <p>
            <u>School:</u> {data.school}
          </p>
          <p>
            <u>Major:</u> {data.major}
          </p>
          <p>
            <u>Graduation Year:</u> {data.grad_year}
          </p>
          <p>
            <u>Level of Study:</u> {data.level_of_study}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Contact Information</h2>
          <p>
            <u>Email:</u> {data.email}
          </p>
          <p>
            <u>Phone Number:</u> {data.phone_number}
          </p>
          <p>
            <u>Discord:</u> {data.discord}
          </p>
          <p>
            <u>GitHub:</u> <a href={data.github ?? "#"}>{data.github}</a>
          </p>
          <p>
            <u>LinkedIn:</u> <a href={data.linkedin ?? "#"}>{data.linkedin}</a>
          </p>
        </div>
      </div>
    </>
  );
}
