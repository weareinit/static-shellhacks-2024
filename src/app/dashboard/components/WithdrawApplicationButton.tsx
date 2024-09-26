"use client";

import { changeApplicationStatus } from "@/app/api/(logic)/changeApplicationStatus";
import { application_status_enums } from "@prisma/client";
import { useState } from "react";

export default function WithdrawApplicationButton({ id }: { id: number }) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdrawApplication = async () => {
    const confirmation = confirm("Are you sure you want to withdraw your application? This action can't be undone and you won't be able to reapply.");
    if (!confirmation) return;

    setIsWithdrawing(true);
    await changeApplicationStatus([id], application_status_enums.withdrawn);
    setIsWithdrawing(false);

    window.location.reload();
  };

  return (
    <>
      <button className="cursor-not-allowed font-zoonaji text-2xl text-gray-400 underline" disabled>
        {isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
      </button>
      <p className="font-museo">We&apos;re no longer accepting withdrawals to prevent miss-clicks!</p>
    </>
  );
}
