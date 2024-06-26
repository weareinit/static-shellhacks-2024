"use client";

import { changeApplicationStatus } from "@/app/api/(logic)/changeApplicationStatus";
import { application_status_enums } from "@prisma/client";
import { useState } from "react";

export default function WithdrawApplicationButton({ id }: { id: number }) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdrawApplication = async () => {
    const confirmation = confirm(
      "Are you sure you want to withdraw your application? This action can't be undone and you won't be able to reapply.",
    );
    if (!confirmation) return;

    setIsWithdrawing(true);
    await changeApplicationStatus([id], application_status_enums.withdrawn);
    setIsWithdrawing(false);

    window.location.reload();
  };

  return (
    <button
      type="submit"
      className="cursor-pointer font-zoonaji text-2xl text-red-600 underline"
      onClick={handleWithdrawApplication}
    >
      {isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
    </button>
  );
}
