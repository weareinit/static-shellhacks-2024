import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQuery } from "react-query";
import Link from "next/link";
import ApplicantCell from "@/components/dashboard/ApplicantCell";
import ShorelineSection from "@/components/sections/ShorelineSection";

const getApplicants = async () => {
  const response = await fetch("/api/admin/applications", {
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

const ApplicantsTable = () => {
  const { data, isLoading, error } = useQuery("applicant", getApplicants);
  const applicantData = data;
  console.log(applicantData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!applicantData || error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
        <h1 className="text-xl font-bold mb-4">This account doesn't have admin privileges</h1>
        <p>You might need to login using a different account.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6">
      {applicantData.map((entry: any, index: number) => (
        <ApplicantCell data={entry} key={index} />
      ))}
    </div>
  );

  /*return (
    <table className="divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-1 px-1 text-left">First Name</th>
          <th className="py-1 px-1 text-left">Last Name</th>
          <th className="py-1 px-1 text-left">Email</th>
          <th className="py-1 px-1 text-left">Age</th>
          <th className="py-1 px-1 text-left">Country</th>
          <th className="py-1 px-1 text-left">Major</th>
          <th className="py-1 px-1 text-left">School</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {applicantData.map((entry: any, index: number) => (
          <tr key={index}>
            <td className="py-1 px-1">{entry.first_name}</td>
            <td className="py-1 px-1">{entry.last_name}</td>
            <td className="py-1 px-1">{entry.email}</td>
            <td className="py-1 px-1">{entry.age}</td>
            <td className="py-1 px-1">{entry.country}</td>
            <td className="py-1 px-1">{entry.major}</td>
            <td className="py-1 px-1">{entry.school}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );*/
};

export default withPageAuthRequired(function AdminDashboard() {
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

      <ApplicantsTable />
    </main>
  );
});
