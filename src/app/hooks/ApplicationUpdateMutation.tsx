import { useQueryClient, useMutation } from "@tanstack/react-query";
import { adminApplicantUpdateSchema } from "@/app/schemas/applicantSchemas";
import { z } from "zod";

type ApplicantUpdateType = z.infer<typeof adminApplicantUpdateSchema>;

export const useAppUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateApplicant = async (args: ApplicantUpdateType) => {
    if (args.id == null) {
      throw new Error("Cannot update applicant when id is null");
    }

    const response = await fetch(
      `/api/hackers/${encodeURIComponent(args.id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      },
    );

    if (!response.ok) {
      throw new Error("Error updating applicant");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateApplicant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });
};

export type AppUpdateMutationType = ReturnType<typeof useAppUpdateMutation>;
