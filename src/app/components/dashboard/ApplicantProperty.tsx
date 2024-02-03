"use client";

import React, { useState } from "react";

interface ApplicantPropertyProps {
  propertyName: string;
  propertyValue: string | number | null;
  editing: boolean;
  handleEdit?: (e: any) => void;
  isLink?: boolean;
}

const ApplicantProperty: React.FC<ApplicantPropertyProps> = ({
  propertyName,
  propertyValue,
  editing,
  handleEdit,
  isLink,
}) => {
  //const [editedValue, setEditedValue] = useState(propertyValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleEdit && handleEdit(event.target.value);
  };

  return (
    <p className="font-pixel flex flex-wrap items-center">
      <u className="mr-2 whitespace-nowrap">
        <b>{propertyName}:</b>
      </u>
      <span className="flex-grow">
        {editing ? (
          <input
            type="text"
            value={propertyValue || ""}
            className="w-full"
            onChange={handleInputChange}
          />
        ) : isLink ? (
          <a href={propertyValue as string} target="_blank">
            {propertyValue}
          </a>
        ) : (
          propertyValue
        )}
      </span>
    </p>
  );
};

export default ApplicantProperty;
