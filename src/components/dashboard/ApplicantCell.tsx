import React, { useRef, useState } from "react";
import { Hacker_Applications } from "@prisma/client";
import ApplicantInfo from "./ApplicantInfo";
import Button from "../input/Button";
import type { AppStatusMutationType } from "@/hooks/ApplicationStatusMutation";
import { applicantStatusChangeSchema } from "@/schemas/applicantSchemas";
import { openApplicantResume } from "@/util/openApplicantResume";
import PixelButton from "../misc/PixelButton";
import { useAppUpdateMutation } from "@/hooks/ApplicationUpdateMutation";
import { APPLICATION_STATUS_COLOR_MAPPING } from "@/constants/applicationConstants";

interface ApplicantCellPropType {
  data: Hacker_Applications;
  handleAppStatusChange: AppStatusMutationType;
  handleSelectApplicant: () => void;
  isSelected: boolean;
}

export default function ApplicantCell({ data, handleAppStatusChange, handleSelectApplicant, isSelected }: ApplicantCellPropType) {
  const [showItem, setShowItem] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCell, setEditedCell] = useState(data);

  const applicationUpdateMutation = useAppUpdateMutation();

  const handleEdit = (fieldName: string, payload: string | number) => {
    if (editedCell.hasOwnProperty(fieldName)) {
      setEditedCell({ ...editedCell, [fieldName]: payload });
    }
  };

  const toggleItem = () => {
    setShowItem((prev) => !prev);
  };

  const setAppStatus = async (application_status: string) => {
    const payload = applicantStatusChangeSchema.parse({ ids: [data.hacker_id], application_status });
    await handleAppStatusChange.mutate(payload);
  };

  const handleSelected = () => {
    toggleItem();
    handleSelectApplicant();
  };

  const toggleEditing = async () => {
    if (isEditing) {
      console.log("saving...");
      await applicationUpdateMutation.mutateAsync(editedCell);
    }

    setIsEditing((prev) => !prev);
  };

  return (
    <div className="bg-white p-3 my-2 rounded-pixel h-fit w-full relative">
      <h3 onClick={toggleItem} className="font-pixel font-bold text-lg decoration-blue hover:cursor-pointer grid grid-cols-9">
        <span className="col-span-1">
          <input type="checkbox" checked={isSelected} onChange={handleSelected} className="form-checkbox h-4 w-4 text-deep_blue align-middle" />
        </span>

        <span className="col-span-2 truncate">
          {data.first_name} {data.last_name}
        </span>

        <span className="col-span-2 truncate"> {new Date(data.created_at!).toLocaleDateString()}</span>

        <span className="col-span-3 truncate"> {data.school}</span>

        <div className="col-span-1 flex justify-between items-center">
          <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: APPLICATION_STATUS_COLOR_MAPPING[data.application_status!] }} title={data.application_status} />
          <svg className={`transform transition-transform ${showItem ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="#3182ce" d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </h3>

      {showItem && (
        <div className="py-4 justify-between items-center gap-3 grid grid-cols-8 px-2 md:px-4">
          <div className="col-span-8 lg:col-span-6">
            <ApplicantInfo data={isEditing ? editedCell : data} handleEdit={handleEdit} isEditing={isEditing} />
          </div>
          <div className="col-span-8 lg:col-span-2 text-white">
            <div className="flex flex-col gap-1 justify-around items-center">
              <PixelButton className="bg-indigo-500 hover:bg-indigo-600  hover:underline w-full" onClick={() => openApplicantResume(data.email)} text="View Resume" />

              <PixelButton
                className={`${isEditing || applicationUpdateMutation.isLoading ? "bg-fuchsia-400 hover:bg-fuchsia-500" : "bg-teal-800 hover:bg-teal-900"} hover:underline w-full`}
                isLoading={applicationUpdateMutation.isLoading}
                onClick={toggleEditing}
                text={isEditing ? "Save Changes" : "Edit Data"}
              />

              <div className="my-2" />

              {["registered", "waitlisted"].includes(data.application_status!) && (
                <PixelButton
                  className=" bg-green-500 hover:bg-green-600 hover:underline w-full"
                  onClick={() => setAppStatus("in_wave")}
                  text="Add to Wave"
                  isLoading={handleAppStatusChange.isLoading}
                />
              )}

              {["registered", "in_wave", "accepted"].includes(data.application_status!) && (
                <PixelButton className=" bg-red-500 hover:bg-red-600 hover:underline w-full" onClick={() => setAppStatus("waitlisted")} text="Waitlist" isLoading={handleAppStatusChange.isLoading} />
              )}

              {["in_wave"].includes(data.application_status!) && (
                <PixelButton
                  className=" bg-red-500 hover:bg-red-600 hover:underline w-full"
                  onClick={() => setAppStatus("registered")}
                  text="Remove from Wave"
                  isLoading={handleAppStatusChange.isLoading}
                />
              )}

              {["accepted", "confirmed"].includes(data.application_status!) && (
                <PixelButton
                  className=" bg-fuchsia-400 hover:bg-fuchsia-500 hover:underline w-full"
                  onClick={() => setAppStatus("checked_in")}
                  text="Check In"
                  isLoading={handleAppStatusChange.isLoading}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
