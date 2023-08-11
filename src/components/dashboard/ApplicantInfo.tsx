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
          <ApplicantProperty propertyName="Age" editing={isEditing} handleEdit={(payload: string) => handleEdit("age", payload)} propertyValue={data.age} />
          <ApplicantProperty propertyName="Country" editing={isEditing} handleEdit={(payload: string) => handleEdit("country", payload)} propertyValue={data.country} />
          <ApplicantProperty propertyName="Gender" editing={isEditing} handleEdit={(payload: string) => handleEdit("gender", payload)} propertyValue={data.gender} />
          <ApplicantProperty propertyName="Pronouns" editing={isEditing} handleEdit={(payload: string) => handleEdit("pronouns", payload)} propertyValue={data.pronouns} />
          <ApplicantProperty propertyName="Ethnicity" editing={isEditing} handleEdit={(payload: string) => handleEdit("ethnicity", payload)} propertyValue={data.ethnicity} />
          <ApplicantProperty propertyName="International" editing={false} propertyValue={data.is_international ? "Yes" : "No"} />
        </div>
        <div>
          <h2 className="text-lg font-medium">Education Information</h2>
          <ApplicantProperty propertyName="School" editing={isEditing} handleEdit={(payload: string) => handleEdit("school", payload)} propertyValue={data.school} />
          <ApplicantProperty propertyName="Graduation Year" editing={isEditing} handleEdit={(payload: string) => handleEdit("grad_year", payload)} propertyValue={data.grad_year} />
          <ApplicantProperty propertyName="Major" editing={isEditing} handleEdit={(payload: string) => handleEdit("major", payload)} propertyValue={data.major} />
          <ApplicantProperty propertyName="Level of Study" editing={isEditing} handleEdit={(payload: string) => handleEdit("level_of_study", payload)} propertyValue={data.level_of_study} />
        </div>
        <div>
          <h2 className="text-lg font-medium">Contact Information</h2>
          <ApplicantProperty propertyName="Email" editing={false} propertyValue={data.email} />
          <ApplicantProperty propertyName="Phone Number" editing={isEditing} handleEdit={(payload: string) => handleEdit("phone_number", payload)} propertyValue={data.phone_number} />

          <ApplicantProperty propertyName="Discord" editing={isEditing} handleEdit={(payload: string) => handleEdit("discord", payload)} propertyValue={data.discord} />
          <ApplicantProperty propertyName="Github" editing={isEditing} handleEdit={(payload: string) => handleEdit("github", payload)} propertyValue={data.github} />
          <ApplicantProperty propertyName="LinkedIn" editing={isEditing} handleEdit={(payload: string) => handleEdit("linkedin", payload)} propertyValue={data.linkedin} />
        </div>
      </div>
    </>
  );
}
