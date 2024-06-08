import { join } from "path";

export const uploadResume = async (file: File, userId: string) => {
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

  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(
    `/api/hackers/${encodeURIComponent(userId)}/resume`,
    {
      method: "PUT",
      body: formData,
    },
  );

  console.log(response);

  if (!response.ok) {
    throw new Error("Error uploading resume");
  }

  return await response.json();
};
