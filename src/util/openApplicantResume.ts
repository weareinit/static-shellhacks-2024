export const openApplicantResume = async (email: string) => {
  const response = await fetch(`/api/resumes/${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Use message from response
  if (!response.ok) {
    throw new Error("Error fetching applicant");
  }

  const { url } = await response.json();
  window.open(url, "_blank");
};
