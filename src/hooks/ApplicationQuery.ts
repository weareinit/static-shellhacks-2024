import { useQuery } from "react-query";
import { Hacker_Applications } from "@prisma/client";

//Note: Right now the name is filtered from the frontend, though it will proably be moved to the backend
export const useApplicationQuery = (email: string) => {
  const getApplication = async () => {
    const response = await fetch(`/api/applications/${encodeURIComponent(email)}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching applicant ${response.statusText}`);
    }

    return (await response.json()) as Hacker_Applications;
  };

  return useQuery(["application", email], getApplication, { retry: false });
};
