import { useQuery } from "react-query";
import { applicantFiltersSchema, applicantStatusChangeSchema } from "@/schemas/applicantSchemas";
import { z } from "zod";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;

//Note: Right now the name is filtered from the frontend, though it will proably be moved to the backend
export const useApplicantsQuery = (filters: ApplicantFilterType, name: string = "") => {
  const getApplicants = async () => {
    try {
      applicantFiltersSchema.parse(filters);
      const params = new URLSearchParams(filters as unknown as Record<string, string>).toString();
      const response = await fetch(`/api/admin/applications?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "applicantion/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching applicant");
      }

      return response.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  return useQuery(["applicants", filters], getApplicants, {
    select: (data) => data.filter((entry: any) => (entry.first_name + " " + entry.last_name).toLowerCase().includes(name.toLowerCase())),
  });
};
