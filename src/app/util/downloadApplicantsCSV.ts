export const downloadApplicantsCSV = async () => {
  const response = await fetch(`/api/admin/hackers?format=csv`, {
    method: "GET",
    headers: {
      "Content-Type": "text/csv",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching applicant CSV file");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  return;
};
