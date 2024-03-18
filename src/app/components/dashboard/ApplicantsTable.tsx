import ApplicantCell from "@/app/components/dashboard/ApplicantCell";
import LoadingSpinner from "../misc/LoadingSpinner";
import type Hacker_Applications from "@prisma/client";

interface ApplicantsTableProps {
  data: any;
  isLoading: boolean;
  error: any;
  appStatusMutation: any;
  handleSelectApplicant: (hacker_id: number) => void;
  selectedApplicants: Set<number>;
}

export default function ApplicantsTable({
  data,
  isLoading,
  error,
  appStatusMutation,
  handleSelectApplicant,
  selectedApplicants,
}: ApplicantsTableProps) {
  if (data) {
    return (
      <>
        {data.map((entry: Hacker_Applications, index: number) => (
          <ApplicantCell
            key={index}
            handleSelectApplicant={() => handleSelectApplicant(entry.hacker_id)}
            isSelected={selectedApplicants.has(entry.hacker_id)}
            data={entry}
            // key={entry.hacker_id}
            handleAppStatusChange={appStatusMutation}
          />
        ))}
      </>
    );
  }

  if (error) {
    return (
      <div className="rounded-pixel mx-auto max-w-md bg-white p-6">
        <h1 className="mb-4 font-pixel text-xl">
          This account doesn't have admin privileges
        </h1>
        <p>You might need to login using a different account.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <LoadingSpinner size="large" />
    </div>
  );
}
