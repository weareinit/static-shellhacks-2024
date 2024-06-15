"use client";

import React from "react";

interface ApplicantPropertyProps {
  propertyName: string;
  propertyValue: string | number | null;
  editing?: boolean;
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
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleEdit && handleEdit(event.target.value);
  };

  return (
    <p className="flex flex-wrap items-center font-museo">
      <u className="mr-2 whitespace-nowrap font-bold">{propertyName}:</u>
      <span className="flex-grow">
        {editing ? (
          <input
            type="text"
            value={propertyValue || ""}
            className="w-full font-museo"
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
