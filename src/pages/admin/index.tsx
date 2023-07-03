import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQuery } from "react-query";
import Link from "next/link";
import ApplicantCell from "@/components/dashboard/ApplicantCell";
import FiltersModal from "@/components/dashboard/FiltersModal";
import { useState } from "react";
import { applicantFiltersSchema } from "@/schemas/applicantSchemas";
import { z } from "zod";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;

interface ApplicantsTableProps {
  data: any;
  isLoading: boolean;
  error: any;
}

const getApplicants = async (filters: ApplicantFilterType) => {
  const params = new URLSearchParams(filters as unknown as Record<string, string>).toString();
  const response = await fetch(`/api/admin/applications?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "applicant/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching applicant");
  }

  return response.json();
};

const ApplicantsTable = ({ data, isLoading, error }: ApplicantsTableProps) => {
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
        <ApplicantCell data={entry} key={index} />
      ))}
    </>
  );
};

export default withPageAuthRequired(function AdminDashboard() {
  const [showFilters, setShowFilters] = useState(false);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState<ApplicantFilterType>({ event_id: 1 });

  const { data, isLoading, error } = useQuery(["applicants", filters], () => getApplicants(filters), {
    select: (data) => data.filter((entry: any) => (entry.first_name + " " + entry.last_name).toLowerCase().includes(name.toLowerCase())),
  });

  const applicantData = data;
  console.log(applicantData);

  return (
    <main className="bg-sand min-h-screen p-5">
      <div className="flex justify-between mb-4 row">
        <Link href="/">
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">Home</button>
        </Link>
        <Link href="/api/auth/logout">
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Logout</button>
        </Link>
      </div>

      <div className="bg-white rounded-md shadow-md p-5">
        <div className="flex justify-between mb-5 row align-middle items-center">
          <h2 className="text-2xl">Showing {data?.length} Applicants</h2>
          <div className="flex row">
            <input className="border border-gray-300 rounded-md p-1 mr-2" type="text" placeholder="Search" value={name} onChange={(e: any) => setName(e.target.value)} />
            <button className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded mr-2" onClick={() => setShowFilters(!showFilters)}>
              Filters
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">Export</button>
          </div>
        </div>

        {showFilters && <FiltersModal handleFilterChange={setFilters} />}

        <ApplicantsTable data={data} isLoading={isLoading} error={error} />
      </div>
    </main>
  );
});
