import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { applicantFiltersSchema, applicantStatusChangeSchema } from "@/schemas/applicantSchemas";
import { useAppStatusMutation } from "@/hooks/ApplicationStatusMutation";
import { useApplicantsQuery } from "@/hooks/ApplicantsQuery";
import { z } from "zod";
import ApplicantsTable from "@/components/dashboard/ApplicantsTable";
import Navbar from "../../components/dashboard/Navbar";
import { useZxing } from "react-zxing";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;

export default withPageAuthRequired(function CheckIn() {
  const [filters, setFilters] = useState<ApplicantFilterType>({ application_status: "accepted", phone_number: "" });
  const [phone, setPhone] = useState("");

  const { ref } = useZxing({
    onResult(result) {
      checkIn(result.getText());
    },
  });

  const { data, isLoading, error } = useApplicantsQuery(filters);
  const appStatusMutation = useAppStatusMutation();

  const getApplicantByPhone = () => {
    setFilters({ ...filters, phone_number: phone });
  };

  const checkIn = (hacker_id: string) => {
    // alert("Checking in " + hacker_id);
    const payload = applicantStatusChangeSchema.parse({ hacker_id, application_status: "checked_in" });
    appStatusMutation.mutate(payload);
    alert("Checked in " + hacker_id);
  };

  return (
    <main className="bg-sand min-h-screen p-5">
      <div className="p-5 pt-0">
        <Navbar />

        <div className="flex justify-around mb-5 flex-row align-middle items-center">
          <div className="flex justify-center flex-col align-center items-start">
            <h2 className="text-2xl mb-2 text-left">Check In</h2>
            <div className="flex justify-between">
              <input className="border border-gray-300 font-pixel text-md pl-1 mr-4" type="text" placeholder="Phone number" value={phone} onChange={(e: any) => setPhone(e.target.value)} />

              <button className="bg-deep_blue font-pixel text-md hover:bg-sky-700 text-white py-2 px-4 rounded mr-2" onClick={getApplicantByPhone}>
                Search
              </button>
            </div>
          </div>

          <video ref={ref} />
        </div>

        {data && <ApplicantsTable data={data} isLoading={isLoading} error={error} appStatusMutation={appStatusMutation} />}
      </div>
    </main>
  );
});
