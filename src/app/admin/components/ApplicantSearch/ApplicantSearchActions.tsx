import { adminAcceptWave } from "@/app/api/(logic)/adminAcceptWave";
import { changeApplicationStatus } from "@/app/api/(logic)/changeApplicationStatus";
import { HackerApplicationAdminResponse } from "@/app/hooks/useApplicantsInfiniteQuery";
import { type application_status_with_any } from "@/app/schemas/applicantSchemas";
import { application_status_enums } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ApplicantSearchActionsProps {
  selectedApplicants: Set<HackerApplicationAdminResponse>;
  resetSelectedApplicants: () => void;
  filteredStatus?: string;
}

export default function ApplicantSearchActions({
  selectedApplicants,
  resetSelectedApplicants,
  filteredStatus,
}: ApplicantSearchActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const selectedStatusSet = new Set(
    Array.from(selectedApplicants).map(
      (applicant) => applicant.application_status,
    ),
  );

  const handleChangeAppStatus = async (status: application_status_enums) => {
    setIsLoading(true);

    const ids = Array.from(selectedApplicants).map((applicant) => applicant.id);
    console.log("IDS", ids);
    await changeApplicationStatus(ids, status);

    setIsLoading(false);
    resetSelectedApplicants();
    queryClient.invalidateQueries({ queryKey: ["applicants"] });
  };

  const handleAcceptWave = async () => {
    setIsLoading(true);

    await adminAcceptWave();

    setIsLoading(false);
    resetSelectedApplicants();
    queryClient.invalidateQueries({ queryKey: ["applicants"] });
  };

  const handleDownloadCSV = async () => {
    setIsLoading(true);

    await fetch(`/api/admin/hackers?format=csv`, {});

    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <p className="my-2 text-right font-zoonaji text-xl">Actions:</p>

      <div className="justify-right flex flex-row flex-wrap gap-2">
        {/*Add to wave button */}
        {selectedStatusSet.size === 1 &&
          selectedStatusSet.has(application_status_enums.registered) && (
            <button
              onClick={() =>
                handleChangeAppStatus(application_status_enums.in_wave)
              }
              className="rounded-md bg-green-500 p-2 text-center font-museo text-white  no-underline hover:bg-green-600  hover:underline"
              disabled={isLoading}
            >
              Add {selectedApplicants.size} to wave
            </button>
          )}

        {/* Accept wave button */}
        {filteredStatus === application_status_enums.in_wave ||
          (selectedStatusSet.size === 1 &&
            selectedStatusSet.has(application_status_enums.in_wave) && (
              <button
                onClick={handleAcceptWave}
                disabled={isLoading}
                className="rounded-md bg-blue-500 p-2 text-center font-museo text-white  no-underline hover:bg-blue-600  hover:underline"
              >
                Accept Wave
              </button>
            ))}

        {/* Download CSV button */}
        <button
          onClick={handleDownloadCSV}
          disabled={isLoading}
          className="rounded-md bg-purple-500 p-2 text-center font-museo text-white  no-underline hover:bg-purple-600  hover:underline"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}
