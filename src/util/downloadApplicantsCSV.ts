export const downloadApplicantsCSV = async (filters: any) => {
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
