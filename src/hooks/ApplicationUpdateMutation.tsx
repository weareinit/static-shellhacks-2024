import { useQueryClient, useMutation } from "react-query";
import { applicantUpdateSchema } from "@/schemas/applicantSchemas";
import { z } from "zod";

type ApplicantUpdateType = z.infer<typeof applicantUpdateSchema>;

export const useAppUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateApplicant = async (args: ApplicantUpdateType) => {
    const response = await fetch(`/api/application`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    if (!response.ok) {
      throw new Error("Error updating applicant");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: updateApplicant,
    onSuccess: () => {
      queryClient.invalidateQueries("applicant");
    },
  });
};

export type AppUpdateMutationType = ReturnType<typeof useAppUpdateMutation>;
