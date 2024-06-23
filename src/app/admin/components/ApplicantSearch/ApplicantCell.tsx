import { AppStatusMutationType } from "@/app/hooks/ApplicationStatusMutation";
import { applicantStatusChangeSchema } from "@/app/schemas/applicantSchemas";
import { Hacker_Applications } from "@prisma/client";
import { useState } from "react";
import { useAppUpdateMutation } from "@/app/hooks/ApplicationUpdateMutation";
import { APPLICATION_STATUS_COLOR_MAPPING } from "@/app/constants/applicationConstants";
import ApplicantInfo from "./ApplicantInfo";
import Link from "next/link";
import PixelButton from "@/app/components/misc/PixelButton";

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
    handleAppStatusChange.mutate(payload);
  };

  const toggleEditing = async () => {
    if (isEditing) {
      await applicationUpdateMutation.mutateAsync(editedCell);
    }

    setIsEditing((prev) => !prev);
  };

  return (
    <div className="my-2 h-fit w-full rounded-md bg-white p-3">
      <div className="flex w-full items-center">
        <div className="mr-4 flex-shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelectApplicant}
            className="text-deep_blue mt-2 h-4 w-4"
          />
        </div>

        <div
          className="grid flex-grow grid-cols-8 items-center gap-3 hover:cursor-pointer"
          onClick={toggleApplicationDetails}
        >
          <p className="col-span-2 truncate font-museo">
            {applicant.first_name} {applicant.last_name}
          </p>

          <p className="col-span-2 truncate font-museo">
            {new Date(applicant.created_at!).toLocaleDateString()}
          </p>

          <p className="col-span-3 truncate font-museo">{applicant.school}</p>

          <div className="col-span-1 flex items-center justify-between">
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor:
                  APPLICATION_STATUS_COLOR_MAPPING[
                    applicant.application_status
                  ],
              }}
              title={applicant.application_status}
            />

            {/* Arrow down */}
            <svg
              className={`transform transition-transform ${
                showApplicationDetails ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path fill="#3182ce" d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>

      {showApplicationDetails && (
        <div className="flex items-start justify-between gap-4 px-2 py-4 md:px-4">
          <div className="flex-grow">
            <ApplicantInfo
              applicant={isEditing ? editedCell : applicant}
              handleEdit={handleEdit}
              isEditing={isEditing}
            />
          </div>
          <div className="min-w-[250px]">
            <div className="flex flex-col items-center justify-around gap-1">
              <Link
                href={`/api/hackers/${applicant.id}/resume`}
                target="_blank"
                className="w-full rounded-md  bg-indigo-500 p-2 text-center font-museo text-white no-underline hover:bg-indigo-600 hover:underline"
              >
                View Resume
              </Link>

              <button
                onClick={toggleEditing}
                className="w-full rounded-md bg-fuchsia-400 p-2 text-center font-museo text-white no-underline hover:bg-fuchsia-500 hover:underline"
              >
                {applicationUpdateMutation.isPending && isEditing
                  ? "Loading..."
                  : isEditing
                    ? "Save Changes"
                    : "Edit Data"}
              </button>

              <div className="my-2" />
              {/*TODO: update the other buttons*/}

              {["registered", "waitlisted"].includes(
                applicant.application_status,
              ) && (
                <button
                  onClick={() => setAppStatus("in_wave")}
                  className="w-full rounded-md bg-green-500 p-2 text-center font-museo text-white no-underline hover:bg-green-600 hover:underline"
                >
                  {handleAppStatusChange.isPending
                    ? "Loading..."
                    : "Add to Wave"}
                </button>
              )}

              {applicant.application_status! !== "waitlisted" && (
                <button
                  onClick={() => setAppStatus("waitlisted")}
                  className="w-full rounded-md bg-red-500 p-2 text-center font-museo text-white  no-underline hover:bg-red-600  hover:underline"
                >
                  {handleAppStatusChange.isPending ? "Loading..." : "Waitlist"}
                </button>
              )}

              {["in_wave"].includes(applicant.application_status!) && (
                <button
                  onClick={() => setAppStatus("registered")}
                  className="w-full rounded-md bg-red-500 p-2 text-center font-museo text-white  no-underline hover:bg-red-600  hover:underline"
                >
                  {handleAppStatusChange.isPending
                    ? "Loading..."
                    : "Remove from Wave"}
                </button>
              )}

              {["accepted", "confirmed"].includes(
                applicant.application_status!,
              ) && (
                <button
                  onClick={() => setAppStatus("checked_in")}
                  className="w-full rounded-md bg-red-500 p-2 text-center font-museo text-white  no-underline hover:bg-red-600  hover:underline"
                >
                  {handleAppStatusChange.isPending ? "Loading..." : "Check In"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
