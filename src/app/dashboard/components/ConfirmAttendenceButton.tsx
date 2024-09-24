"use client";

import { changeApplicationStatus } from "@/app/api/(logic)/changeApplicationStatus";
import { application_status_enums } from "@prisma/client";
import { useState } from "react";

export default function ConfirmAttendenceButton({ id }: { id: number }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleWithdrawApplication = async () => {
    setIsConfirming(true);
    await changeApplicationStatus([id], application_status_enums.confirmed);
    setIsConfirming(false);

    window.location.reload();
  };

  return (
    <>
      {/* <button className="cursor-pointer font-zoonaji text-2xl text-blue-500 underline hover:text-blue-600" onClick={handleWithdrawApplication}>
        {isConfirming ? "Confirming..." : "Confirm Attendance"}
      </button> */}
    </>
  );
}
