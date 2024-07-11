"use client";
export const uploadResume = async (file: File, hackerId: number) => {
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

  const response = await fetch(`/api/hackers/${encodeURIComponent(hackerId)}/resume`, {
    method: "PUT",
    body: formData,
  });

  console.log(response);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }
};
