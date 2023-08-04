import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import FiltersModal from "@/components/dashboard/Filters";
import { useState } from "react";
import { applicantFiltersSchema } from "@/schemas/applicantSchemas";
import { useAppStatusMutation } from "@/hooks/ApplicationStatusMutation";
import { useApplicantsQuery } from "@/hooks/ApplicantsQuery";
import { z } from "zod";
import { parseCSV } from "@/util/parseCSV";
import ApplicantsTable from "@/components/dashboard/ApplicantsTable";
import { useAcceptWaveMutation } from "@/hooks/AcceptWaveMutation";
import Navbar from "../../components/dashboard/Navbar";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;
const DEFAULT_FILTERS: ApplicantFilterType = { application_status: "registered" };

export default withPageAuthRequired(function AdminDashboard({ schools }) {
  const [showFilters, setShowFilters] = useState(false);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState<ApplicantFilterType>(DEFAULT_FILTERS);

  const { data, isLoading, error } = useApplicantsQuery(filters, name);
  const appStatusMutation = useAppStatusMutation();
  const acceptWaveMutation = useAcceptWaveMutation();

  const downloadCsv = async () => {
    const params = new URLSearchParams(filters as unknown as Record<string, string>).toString();

    const response = await fetch(`/api/applications?${params}&format=csv`, {
      method: "GET",
      headers: {
        "Content-Type": "text/csv",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching applicant");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    return;
  };

  return (
    <main className="bg-sand min-h-screen p-5">
      <div className="p-5 pt-0">
        <Navbar />

        <div className="flex justify-between mb-5 row align-middle items-center">
          <h2 className="text-2xl">Showing {data?.length} Applicants</h2>
          <div className="flex row">
            <input className="border border-gray-300 font-pixel text-md pl-1 mr-2" type="text" placeholder="Search" value={name} onChange={(e: any) => setName(e.target.value)} />

            <button className="bg-deep_blue font-pixel text-md hover:bg-sky-700 text-white py-2 px-4 rounded mr-2" onClick={() => setShowFilters(!showFilters)}>
              Filters
            </button>
            <button className="font-pixel text-md bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={downloadCsv}>
              Export
            </button>
            {filters.application_status == "in_wave" && (
              <button className="font-pixel ml-2 text-md bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded" onClick={() => acceptWaveMutation.mutate()}>
                Accept Wave
              </button>
            )}
          </div>
        </div>

        {showFilters && <FiltersModal filters={filters} setFilters={setFilters} schools={schools} />}

        <ApplicantsTable data={data} isLoading={isLoading} error={error} appStatusMutation={appStatusMutation} />
      </div>
    </main>
  );
});

export async function getStaticProps() {
  const schoolData: string[] = await parseCSV<string>("https://raw.githubusercontent.com/quigongian/probable-octo-parakeet/main/schools.csv");

  const schools = schoolData
    .map((school) => {
      return school[0];
    })
    .splice(1);

  return {
    props: {
      schools,
    },
  };
}
