'use client'
import { useState } from "react";
import {
  applicantFiltersSchema,
  applicantStatusChangeSchema,
} from "@/app/schemas/applicantSchemas";
import { useAppStatusMutation } from "@/app/hooks/ApplicationStatusMutation";
import { useApplicantsQuery } from "@/app/hooks/ApplicantsQuery";
import { z } from "zod";
import ApplicantsTable from "@/app/components/dashboard/ApplicantsTable";
import Navbar from "../../app/components/dashboard/Navbar";
import { useZxing } from "react-zxing";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;

export default function CheckIn() {
  const [filters, setFilters] = useState<ApplicantFilterType>({
    application_status: "accepted",
    phone_number: "",
  });
  const [phone, setPhone] = useState("");

  const { ref } = useZxing({
    onResult(result) {
      checkIn(result.getText());
    },
  });

  const { data, isLoading, error } = useApplicantsQuery(filters);
  const appStatusMutation = useAppStatusMutation({ onSuccess: () => null });

  const getApplicantByPhone = () => {
    setFilters({ ...filters, phone_number: phone });
  };

  const checkIn = (hacker_id: string) => {
    // alert("Checking in " + hacker_id);
    const payload = applicantStatusChangeSchema.parse({
      hacker_id,
      application_status: "checked_in",
    });
    appStatusMutation.mutate(payload);
    alert("Checked in " + hacker_id);
  };

  return (
    <main className="min-h-screen bg-sand p-5">
      <div className="p-5 pt-0">
        <Navbar />

        <div className="mb-5 flex flex-row items-center justify-around align-middle">
          <div className="align-center flex flex-col items-start justify-center">
            <h2 className="mb-2 text-left text-2xl">Check In</h2>
            <div className="flex justify-between">
              <input
                className="text-md mr-4 border border-gray-300 pl-1 font-pixel"
                type="text"
                placeholder="Phone number"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
              />

              <button
                className="text-md mr-2 rounded bg-deep_blue px-4 py-2 font-pixel text-white hover:bg-sky-700"
                onClick={getApplicantByPhone}
              >
                Search
              </button>
            </div>
          </div>

          <video ref={ref} />
        </div>

        {/* {data && <ApplicantsTable data={data} isLoading={isLoading} error={error} appStatusMutation={appStatusMutation} />} */}
      </div>
    </main>
  );
};
