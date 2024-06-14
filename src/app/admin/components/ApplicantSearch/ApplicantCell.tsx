import { AppStatusMutationType } from "@/app/hooks/ApplicationStatusMutation";
import { applicantStatusChangeSchema } from "@/app/schemas/applicantSchemas";
import { Hacker_Applications } from "@prisma/client";
import { useState } from "react";
import { useAppUpdateMutation } from "@/app/hooks/ApplicationUpdateMutation";
import { APPLICATION_STATUS_COLOR_MAPPING } from "@/app/constants/applicationConstants";
import ApplicantInfo from "./ApplicantInfo";

interface ApplicantCellProps {
  applicant: Hacker_Applications;
  handleAppStatusChange: AppStatusMutationType;
  handleSelectApplicant: () => void;
  isSelected: boolean;
}

export default function ApplicantCell({
  applicant,
  handleAppStatusChange,
  handleSelectApplicant,
  isSelected,
}: ApplicantCellProps) {
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCell, setEditedCell] = useState<Hacker_Applications>(applicant);

  const applicationUpdateMutation = useAppUpdateMutation();

  const toggleApplicationDetails = () => {
    setShowApplicationDetails((prev) => !prev);
  };

  const handleEdit = (fieldName: string, payload: string | number) => {
    if (editedCell.hasOwnProperty(fieldName)) {
      setEditedCell({ ...editedCell, [fieldName]: payload });
    }
  };

  const setAppStatus = async (application_status: string) => {
    const payload = applicantStatusChangeSchema.parse({
      ids: [applicant.id],
      application_status,
    });
    await handleAppStatusChange.mutate(payload);
  };

  const toggleEditing = async () => {
    if (isEditing) {
      console.log("saving...");
      await applicationUpdateMutation.mutateAsync(editedCell);
    }

    setIsEditing((prev) => !prev);
  };

  return (
    <div className="my-2 flex h-fit w-full flex-row rounded-md bg-white p-3">
      <div className="flex-shrink-0 px-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelectApplicant}
          className="form-checkbox text-deep_blue h-4 w-4 align-middle"
        />
      </div>

      <div
        className="grid flex-grow grid-cols-8 gap-3 hover:cursor-pointer"
        onClick={toggleApplicationDetails}
      >
        <p className="col-span-2 truncate">
          {applicant.first_name} {applicant.last_name}
        </p>

        <p className="col-span-2 truncate">
          {" "}
          {new Date(applicant.created_at!).toLocaleDateString()}
        </p>

        <p className="col-span-3 truncate"> {applicant.school}</p>

        <div className="col-span-1 flex items-center justify-between">
          <div
            className={`h-4 w-4 rounded-full`}
            style={{
              backgroundColor:
                APPLICATION_STATUS_COLOR_MAPPING[applicant.application_status],
            }}
            title={applicant.application_status}
          />

          {/* Arrow down */}
          <svg
            className={`transform transition-transform ${showApplicationDetails ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path fill="#3182ce" d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>

      {showApplicationDetails && (
        <div className="grid grid-cols-8 items-center justify-between gap-3 px-2 py-4 md:px-4">
          <div className="col-span-8 lg:col-span-6">
            <ApplicantInfo
              applicant={isEditing ? editedCell : applicant}
              handleEdit={handleEdit}
              isEditing={isEditing}
            />
            <p>Applicant details</p>
          </div>
          <div className="col-span-8 text-white lg:col-span-2">
            {/* <div className="flex flex-col items-center justify-around gap-1">
            <PixelButton
              className="w-full bg-indigo-500  hover:bg-indigo-600 hover:underline"
              onClick={() => openApplicantResume(data.email)}
              text="View Resume"
            />

            <PixelButton
              className={`${isEditing || applicationUpdateMutation.isLoading ? "bg-fuchsia-400 hover:bg-fuchsia-500" : "bg-teal-800 hover:bg-teal-900"} w-full hover:underline`}
              isLoading={applicationUpdateMutation.isLoading && isEditing}
              onClick={toggleEditing}
              text={isEditing ? "Save Changes" : "Edit Data"}
            />

            {data.discord_id && (
              <PixelButton
                className="w-full bg-violet-800 hover:bg-violet-700 hover:underline"
                isLoading={applicationUpdateMutation.isLoading && !isEditing}
                onClick={toggleResetDiscordVerification}
                text="Reset Discord Verification"
              />
            )}

            <div className="my-2" />

            {["registered", "waitlisted"].includes(
              data.application_status!,
            ) && (
              <PixelButton
                className=" w-full bg-green-500 hover:bg-green-600 hover:underline"
                onClick={() => setAppStatus("in_wave")}
                text="Add to Wave"
                isLoading={handleAppStatusChange.isLoading}
              />
            )}

            {data.application_status! !== "waitlisted" && (
              <PixelButton
                className=" w-full bg-red-500 hover:bg-red-600 hover:underline"
                onClick={() => setAppStatus("waitlisted")}
                text="Waitlist"
                isLoading={handleAppStatusChange.isLoading}
              />
            )}

            {["in_wave"].includes(data.application_status!) && (
              <PixelButton
                className=" w-full bg-red-500 hover:bg-red-600 hover:underline"
                onClick={() => setAppStatus("registered")}
                text="Remove from Wave"
                isLoading={handleAppStatusChange.isLoading}
              />
            )}

            {["accepted", "confirmed"].includes(data.application_status!) && (
              <PixelButton
                className=" w-full bg-fuchsia-400 hover:bg-fuchsia-500 hover:underline"
                onClick={() => setAppStatus("checked_in")}
                text="Check In"
                isLoading={handleAppStatusChange.isLoading}
              />
            )}
          </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
