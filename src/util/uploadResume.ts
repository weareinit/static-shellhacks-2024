export const uploadResume = async (file: File, email: string) => {
  //Verify the file details
  if (!file) {
    throw new Error("No file provided");
  }
  if (file.size > 1000000) {
    throw new Error("File size too large");
  }
  if (file.type !== "application/pdf") {
    throw new Error("File type not supported");
  }

  const response = await fetch(`/api/resumes/${encodeURIComponent(email)}`, {
    method: "PUT",
  });

  // Use message from response
  if (!response.ok) {
    throw new Error("Error uploading resume");
  }

  const { url } = await response.json();

  //upload the file to aws
  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/pdf",
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Error uploading resume");
  }
};
