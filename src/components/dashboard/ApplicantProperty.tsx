import React, { useState } from "react";

interface ApplicantPropertyProps {
  propertyName: string;
  propertyValue: string | number;
  editing: boolean;
  handleEdit: (e: any) => void;
}

const ApplicantProperty: React.FC<ApplicantPropertyProps> = ({ propertyName, propertyValue, editing, handleEdit }) => {
  //const [editedValue, setEditedValue] = useState(propertyValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleEdit(event.target.value);
  };

  return (
    <p className="font-pixel flex flex-wrap items-center">
      <u className="whitespace-nowrap mr-2">
        <b>{propertyName}:</b>
      </u>
      <span className="flex-grow">{editing ? <input type="text" value={propertyValue} className="w-full" onChange={handleInputChange} /> : propertyValue}</span>
    </p>
  );
};

export default ApplicantProperty;
