import { adminAcceptWave } from "@/app/api/(logic)/adminAcceptWave";
import { changeApplicationStatus } from "@/app/api/(logic)/changeApplicationStatus";
import { HackerApplicationAdminResponse } from "@/app/hooks/useApplicantsInfiniteQuery";
import { downloadApplicantsCSV } from "@/app/util/downloadApplicantsCSV";
import { sendComfirmAttendenceReminderEmail } from "@/app/util/sendConfirmAttendecReminderEmail";
import { application_status_enums } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ApplicantSearchActionsProps {
  selectedApplicants: Set<HackerApplicationAdminResponse>;
  resetSelectedApplicants: () => void;
  filteredStatus?: string;
}

export default function ApplicantSearchActions({ selectedApplicants, resetSelectedApplicants, filteredStatus }: ApplicantSearchActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const selectedStatusSet = new Set(Array.from(selectedApplicants).map((applicant) => applicant.application_status));
  const canAddToWave =
    selectedStatusSet.size > 0 && Array.from(selectedStatusSet).every((status) => [application_status_enums.waitlisted, application_status_enums.registered].includes(status as any));

  const handleChangeAppStatus = async (status: application_status_enums) => {
    if (isLoading) return;
    setIsLoading(true);

    const ids = Array.from(selectedApplicants).map((applicant) => applicant.id);
    console.log("IDS", ids);
    await changeApplicationStatus(ids, status);

    setIsLoading(false);
    resetSelectedApplicants();
    queryClient.invalidateQueries({ queryKey: ["applicants"] });
  };

  const handleAcceptWave = async () => {
    if (isLoading) return;
    setIsLoading(true);

    await adminAcceptWave();

    setIsLoading(false);
    resetSelectedApplicants();
    queryClient.invalidateQueries({ queryKey: ["applicants"] });
  };

  const handleDownloadCSV = async () => {
    setIsLoading(true);
    await downloadApplicantsCSV();
    setIsLoading(false);
  };

  const handleSendReminderEmails = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await sendComfirmAttendenceReminderEmail();
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <p className="my-1 font-zoonaji text-xl">Actions:</p>

      <div className="mb-2 flex flex-row flex-wrap justify-start gap-2">
        {/*Add to wave button */}
        {canAddToWave && (
          <button
            onClick={() => handleChangeAppStatus(application_status_enums.in_wave)}
            className="rounded-md bg-green-500 p-2 text-center font-museo text-white  no-underline hover:bg-green-600  hover:underline"
            disabled={isLoading}
          >
            {isLoading ? "loading..." : `Add ${selectedApplicants.size} to wave`}
          </button>
        )}

        {/* Accept wave button */}
        {filteredStatus === application_status_enums.in_wave && (
          <button onClick={handleAcceptWave} disabled={isLoading} className="rounded-md bg-blue-500 p-2 text-center font-museo text-white  no-underline hover:bg-blue-600  hover:underline">
            {isLoading ? "loading..." : "Accept Wave"}
          </button>
        )}

        {/* Send reminder email button */}
        {filteredStatus === application_status_enums.accepted && (
          <button onClick={handleSendReminderEmails} disabled={isLoading} className="rounded-md bg-orange-500 p-2 text-center font-museo text-white  no-underline hover:bg-orange-600  hover:underline">
            {isLoading ? "loading..." : "Send Reminder Email"}
          </button>
        )}

        {/* Download CSV button */}
        <button onClick={handleDownloadCSV} disabled={isLoading} className="rounded-md bg-purple-500 p-2 text-center font-museo text-white  no-underline hover:bg-purple-600  hover:underline">
          {isLoading ? "loading..." : "Download CSV"}
        </button>
      </div>
    </div>
  );
}
