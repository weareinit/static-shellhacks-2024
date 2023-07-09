import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Link from "next/link";
import ApplicantCell from "@/components/dashboard/ApplicantCell";
import FiltersModal from "@/components/dashboard/FiltersModal";
import { useState } from "react";
import { applicantFiltersSchema, applicantStatusChangeSchema } from "@/schemas/applicantSchemas";
import { useAppStatusMutation } from "@/hooks/ApplicationStatusMutation";
import { z } from "zod";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;

interface ApplicantsTableProps {
  data: any;
  isLoading: boolean;
  error: any;
  appStatusMutation: any;
}

const getApplicants = async (filters: ApplicantFilterType) => {
  const params = new URLSearchParams(filters as unknown as Record<string, string>).toString();
  const response = await fetch(`/api/admin/applications?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "applicantion/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching applicant");
  }

  return response.json();
};

const ApplicantsTable = ({ data, isLoading, error, appStatusMutation }: ApplicantsTableProps) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
        <h1 className="text-xl font-bold mb-4">This account doesn't have admin privileges</h1>
        <p>You might need to login using a different account.</p>
      </div>
    );
  }

  if (!data) return <p>No data</p>;

  return (
    <>
      {data.map((entry: any, index: number) => (
        <ApplicantCell data={entry} key={index} handleAppStatusChange={appStatusMutation} />
      ))}
    </>
  );
};

export default withPageAuthRequired(function AdminDashboard() {
  const [showFilters, setShowFilters] = useState(false);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState<ApplicantFilterType>({ application_status: "registered" });

  const { data, isLoading, error } = useQuery(["applicants", filters], () => getApplicants(filters), {
    select: (data) => data.filter((entry: any) => (entry.first_name + " " + entry.last_name).toLowerCase().includes(name.toLowerCase())),
  });

  const appStatusMutation = useAppStatusMutation();

  const downloadCsv = async () => {
    const params = new URLSearchParams(filters as unknown as Record<string, string>).toString();

    const response = await fetch(`/api/admin/applications?${params}&format=csv`, {
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
        <div className="flex justify-between mb-10 row">
          <Link href="/">
            <h3 className="underline text-green-500 hover:text-green-600 text-xl font-pixel">Home</h3>
          </Link>
          <Link href="/api/auth/logout">
            <h3 className="underline text-red-500 hover:text-red-600 text-xl font-pixel">Logout</h3>
          </Link>
        </div>

        <div className="flex justify-between mb-5 row align-middle items-center">
          <h2 className="text-2xl">Showing {data?.length} Applicants</h2>
          <div className="flex row">
            <input className="border border-gray-300 font-pixel text-md pl-1 mr-2" type="text" placeholder="Search" value={name} onChange={(e: any) => setName(e.target.value)} />

            <button className="bg-deep_blue font-pixel text-md hover:bg-sky-700 text-white py-2 px-4 rounded mr-2" onClick={() => setShowFilters(!showFilters)}>
              Filters
            </button>
            <button className="font-pixel text-md bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={downloadCsv}>
              Export
            </button>
          </div>
        </div>

        {showFilters && <FiltersModal handleFilterChange={setFilters} />}

        <ApplicantsTable data={data} isLoading={isLoading} error={error} appStatusMutation={appStatusMutation} />
      </div>
    </main>
  );
});
