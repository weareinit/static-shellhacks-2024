import React, { useRef, useState } from "react";
import { Prisma } from "@prisma/client";

interface ApplicantCellPropType {
  data: Prisma.Hacker_ApplicationsUncheckedCreateInput;
}

export default function ApplicantCell({ data }: ApplicantCellPropType) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Personal Information</h2>
          <p>Age: {data.age}</p>
          <p>Country: {data.country}</p>
          <p>Gender: {data.gender}</p>
          <p>Pronouns: {data.pronouns}</p>
          <p>Ethnicity: {data.ethnicity}</p>
          <p>International: {data.is_international ? "Yes" : "No"}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Education Information</h2>
          <p>School: {data.school}</p>
          <p>Major: {data.major}</p>
          <p>Graduation Year: {data.grad_year}</p>
          <p>Level of Study: {data.level_of_study}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Contact Information</h2>
        <p>Email: {data.email}</p>
        <p>Phone Number: {data.phone_number}</p>
        <p>Discord: {data.discord}</p>
        <p>GitHub: {data.github}</p>
        <p>LinkedIn: {data.linkedin}</p>
      </div>
    </>
  );
}
