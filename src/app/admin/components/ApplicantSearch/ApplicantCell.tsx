import { useState } from "react";
import { useAppUpdateMutation } from "@/app/hooks/ApplicationUpdateMutation";
import { APPLICATION_STATUS_COLOR_MAPPING } from "@/app/constants/applicationConstants";
import ApplicantInfo from "./ApplicantInfo";
import Link from "next/link";
import { HackerApplicationAdminResponse } from "@/app/hooks/useApplicantsInfiniteQuery";
import { changeApplicationStatus } from "@/app/api/(logic)/changeApplicationStatus";
import { application_status_enums } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

interface ApplicantCellProps {
  applicant: HackerApplicationAdminResponse;
  handleSelectApplicant: () => void;
  isSelected: boolean;
}

export default function ApplicantCell({ applicant, handleSelectApplicant, isSelected }: ApplicantCellProps) {
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedCell, setEditedCell] = useState<HackerApplicationAdminResponse>(applicant);

  const queryClient = useQueryClient();

  //used for updating the hacker's information
  const applicationUpdateMutation = useAppUpdateMutation();

  const toggleApplicationDetails = () => {
    setShowApplicationDetails((prev) => !prev);
  };

  const handleEdit = (fieldName: string, payload: string | number) => {
    if (editedCell.hasOwnProperty(fieldName)) {
      setEditedCell({ ...editedCell, [fieldName]: payload });
    }
  };

  const toggleEditing = async () => {
    if (isEditing) {
      await applicationUpdateMutation.mutateAsync(editedCell);
    }

    setIsEditing((prev) => !prev);
  };

  const setAppStatus = async (status: application_status_enums) => {
    if (isSaving) return;

    setIsSaving(true);
    await changeApplicationStatus([applicant.id], status);
    setIsSaving(false);

    queryClient.invalidateQueries({ queryKey: ["applicants"] });
  };

  return (
    <div className="my-2 h-fit w-full rounded-md bg-white p-1 sm:p-2">
      <div className="flex w-full items-center">
        <div className="mr-4 hidden flex-shrink-0 sm:block">
          <input type="checkbox" checked={isSelected} onChange={handleSelectApplicant} className="text-deep_blue mt-2 h-4 w-4" />
        </div>

        <div className="grid flex-grow grid-cols-8 items-center gap-3 text-sm hover:cursor-pointer sm:text-lg" onClick={toggleApplicationDetails}>
          <p className="col-span-4 truncate font-museo sm:col-span-2">
            {applicant.first_name} {applicant.last_name}
          </p>

          <p className="col-span-2 truncate font-museo">{new Date(applicant.created_at!).toLocaleDateString()}</p>

          <p className="col-span-3 hidden truncate font-museo sm:block">{applicant.school}</p>

          <div className="col-span-2 flex items-center justify-end sm:col-span-1 sm:gap-2">
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: APPLICATION_STATUS_COLOR_MAPPING[applicant.application_status],
              }}
              title={applicant.application_status}
            />

            {/* Arrow down */}
            <svg className={`transform transition-transform ${showApplicationDetails ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="#3182ce" d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>

      {showApplicationDetails && (
        <div className="flex flex-wrap items-start gap-4 px-2 py-4 md:px-4">
          <div className="flex-grow">
            <ApplicantInfo applicant={isEditing ? editedCell : applicant} handleEdit={handleEdit} isEditing={isEditing} />
          </div>
          <div className="w-full md:w-auto md:min-w-[250px]">
            <div className="flex flex-row flex-wrap items-center gap-1">
              <Link
                href={`/api/hackers/${applicant.id}/resume`}
                target="_blank"
                className="rounded-md  bg-indigo-500 p-2 text-center font-museo text-white no-underline hover:bg-indigo-600 hover:underline"
              >
                View Resume
              </Link>

              <button onClick={toggleEditing} className="rounded-md bg-fuchsia-400 p-2 text-center font-museo text-white no-underline hover:bg-fuchsia-500 hover:underline">
                {applicationUpdateMutation.isPending && isEditing ? "Loading..." : isEditing ? "Save Changes" : "Edit Data"}
              </button>

              <div className="my-2" />

              {["registered", "waitlisted"].includes(applicant.application_status) && (
                <button onClick={() => setAppStatus("in_wave")} className="rounded-md bg-green-500 p-2 text-center font-museo text-white no-underline hover:bg-green-600 hover:underline">
                  {isSaving ? "Loading..." : "Add to Wave"}
                </button>
              )}

              {applicant.application_status! !== "waitlisted" && (
                <button onClick={() => setAppStatus("waitlisted")} className="rounded-md bg-red-500 p-2 text-center font-museo text-white  no-underline hover:bg-red-600  hover:underline">
                  {isSaving ? "Loading..." : "Waitlist"}
                </button>
              )}

              {["in_wave"].includes(applicant.application_status!) && (
                <button onClick={() => setAppStatus("registered")} className="rounded-md bg-red-500 p-2 text-center font-museo text-white  no-underline hover:bg-red-600  hover:underline">
                  {isSaving ? "Loading..." : "Remove from Wave"}
                </button>
              )}

              {["accepted", "confirmed"].includes(applicant.application_status!) && (
                <button onClick={() => setAppStatus("checked_in")} className="rounded-md bg-red-500 p-2 text-center font-museo text-white  no-underline hover:bg-red-600  hover:underline">
                  {isSaving ? "Loading..." : "Check In"}
                </button>
              )}

              {["checked_in"].includes(applicant.application_status!) && (
                <button onClick={() => setAppStatus("confirmed")} className="rounded-md bg-red-500 p-2 text-center font-museo text-white  no-underline hover:bg-red-600  hover:underline">
                  {isSaving ? "Loading..." : "Remove Check In"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
