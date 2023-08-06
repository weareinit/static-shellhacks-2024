import ApplicantCell from "@/components/dashboard/ApplicantCell";
import LoadingSpinner from "../misc/LoadingSpinner";
import { Hacker_Applications } from "@prisma/client";

interface ApplicantsTableProps {
  data: any;
  isLoading: boolean;
  error: any;
  appStatusMutation: any;
}

export default function ({ data, isLoading, error, appStatusMutation }: ApplicantsTableProps) {
  if (data) {
    return (
      <>
        {data.map((entry: Hacker_Applications, index: number) => (
          <ApplicantCell data={entry} key={entry.hacker_id} handleAppStatusChange={appStatusMutation} />
        ))}
      </>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-pixel p-6">
        <h1 className="text-xl font-pixel mb-4">This account doesn't have admin privileges</h1>
        <p>You might need to login using a different account.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
