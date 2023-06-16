import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQuery } from "react-query";
import Link from "next/link";

const getapplicant = async () => {
  const response = await fetch("/api/application", {
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

const HackerProfile = () => {
  const { data, isLoading, error } = useQuery("applicant", getapplicant);
  const applicantData = data?.applicant;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!applicantData || error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
        <h1 className="text-xl font-bold mb-4">You need to login to a different account</h1>
        <p>Please login using the same account you used when registering for this event.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <h1 className="text-xl mb-4 font-pixel">
        Application for {applicantData.first_name} {applicantData.last_name}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Personal Information</h2>
          <p>Age: {applicantData.age}</p>
          <p>Country: {applicantData.country}</p>
          <p>Gender: {applicantData.gender}</p>
          <p>Pronouns: {applicantData.pronouns}</p>
          <p>Ethnicity: {applicantData.ethnicity}</p>
          <p>International: {applicantData.is_international ? "Yes" : "No"}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Education Information</h2>
          <p>School: {applicantData.school}</p>
          <p>Major: {applicantData.major}</p>
          <p>Graduation Year: {applicantData.grad_year}</p>
          <p>Level of Study: {applicantData.level_of_study}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Contact Information</h2>
        <p>Email: {applicantData.email}</p>
        <p>Phone Number: {applicantData.phone_number}</p>
        <p>Discord: {applicantData.discord}</p>
        <p>GitHub: {applicantData.github}</p>
        <p>LinkedIn: {applicantData.linkedin}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Additional Information</h2>
        <p>Agreed to MLH news: {applicantData.agreed_mlh_news ? "Yes" : "No"}</p>
        <p>Check-In Status: {applicantData.check_in_status ? "Checked in" : "Not checked in"}</p>
      </div>

      <a href="#">
        <p className="mt-4">MLH Code of Conduct</p>
      </a>
    </div>
  );
};

const LogoutButton = () => {
  return (
    <div className="flex justify-end mt-4">
      <Link href="/api/auth/logout">
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Logout</button>
      </Link>
    </div>
  );
};

export default withPageAuthRequired(function Dashboard() {
  return (
    <main className="bg-sand min-h-screen p-5">
      <div className="max-w-md mx-auto ">
        <HackerProfile />

        <div className="flex justify-between mt-4 row">
          <Link href="/">
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">Home</button>
          </Link>
          <Link href="/api/auth/logout">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Logout</button>
          </Link>
        </div>
      </div>
    </main>
  );
});
