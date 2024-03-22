import { useQuery } from "react-query";
import type Hacker_Applications from "@prisma/client";

export const useApplicationQuery = (email: string) => {
  const getApplication = async () => {
    const response = await fetch(
      `/api/applications/hacker/${encodeURIComponent(email)}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching applicant ${response.statusText}`);
    }

    return (await NextResponse.json()) as Hacker_Applications;
  };

  return useQuery(["application", email], getApplication, { retry: false });
};
