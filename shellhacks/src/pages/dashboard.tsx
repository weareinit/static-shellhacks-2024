import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import { useQuery } from "react-query"

const getapplicant = async () => {
  const response = await fetch("http://localhost:3000/api/getApplication", {
    method: "GET",
    headers: {
      "Content-Type": "applicant/json",
    },
  })

  if (!response.ok) {
    throw new Error("Error fetching applicant")
  }

  return response.json()
}

const HackerProfile = () => {
  const { data, isLoading, error } = useQuery("applicant", getapplicant)
  const applicantData = data?.applicant

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!applicantData || error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
        <h1 className="text-xl font-bold mb-4">You need to login to a different account</h1>
        <p>Please login using the same account you used when registering for this event.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
      <h1 className="text-xl font-bold mb-4">
        Application for {applicantData.first_name} {applicantData.last_name}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Personal Information</h2>
          <p>Hacker ID: {applicantData.hacker_id}</p>
          <p>Auth0 ID: {applicantData.auth0_id}</p>
          <p>Event ID: {applicantData.event_id}</p>
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
        <p>applicantData Status: {applicantData.applicantData_status}</p>
        <p>Check-In Status: {applicantData.check_in_status ? "Checked in" : "Not checked in"}</p>
      </div>
    </div>
  )
}

export default withPageAuthRequired(function Dashboard() {
  return (
    <main className="bg-sand min-h-screen p-5">
      <HackerProfile />
    </main>
  )
})
