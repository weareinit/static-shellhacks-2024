import { useQuery } from "react-query";
import { applicantFiltersSchema } from "@/schemas/applicantSchemas";
import { z } from "zod";
import { Hacker_Applications } from "@prisma/client";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;

//Note: Right now the name is filtered from the frontend, though it will proably be moved to the backend
export const useApplicantsQuery = (filters: ApplicantFilterType, name: string = "") => {
  const getApplicants = async () => {
    try {
      applicantFiltersSchema.parse(filters);
      const params = new URLSearchParams(filters as unknown as Record<string, string>).toString();
      const response = await fetch(`/api/applications?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching applicant");
      }

      return response.json();
    } catch (e) {
      console.error(e);
      throw new Error("Invalid filters");
    }
  };

  return useQuery(["applicants", filters], getApplicants, {
    select: (data) =>
      data.filter(
        (entry: Hacker_Applications) =>
          (entry.first_name + " " + entry.last_name).toLowerCase().includes(name.toLowerCase()) ||
          entry.email.toLowerCase().includes(name.toLowerCase()) ||
          entry.discord?.toLowerCase().startsWith(name.toLowerCase()) ||
          entry.phone_number.toLowerCase().startsWith(name.toLowerCase())
      ),
  });
};
