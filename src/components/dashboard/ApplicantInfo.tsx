import React, { useRef, useState } from "react";
import { Hacker_Applications } from "@prisma/client";
import ApplicantProperty from "./ApplicantProperty";
import { set } from "zod";

interface ApplicantCellPropType {
  data: Hacker_Applications;
  isEditing: boolean;
  handleEdit: (fieldName: string, payload: string) => void;
}

export default function ApplicantCell({ data, isEditing, handleEdit }: ApplicantCellPropType) {
  return (
    <>
      <div className="flex flex-row flex-wrap md:flex-nowrap justify-between gap-4">
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
          <ApplicantProperty propertyName="School" editing={isEditing} handleEdit={(payload: string) => handleEdit("school", payload)} propertyValue={data.school} />
          <ApplicantProperty propertyName="Graduation Year" editing={isEditing} handleEdit={(payload: string) => handleEdit("grad_year", payload)} propertyValue={data.grad_year} />
          <ApplicantProperty propertyName="Major" editing={isEditing} handleEdit={(payload: string) => handleEdit("major", payload)} propertyValue={data.major} />
          <ApplicantProperty propertyName="Level of Study" editing={isEditing} handleEdit={(payload: string) => handleEdit("level_of_study", payload)} propertyValue={data.level_of_study} />
          {/* 
          <p>
            <u>Major:</u> {data.major}
          </p>
          <p>
            <u>Graduation Year:</u> {data.grad_year}
          </p>
          <p>
            <u>Level of Study:</u> {data.level_of_study}
          </p> */}
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
