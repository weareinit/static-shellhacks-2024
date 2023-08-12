import { useQueryClient, useMutation } from "react-query";
import { applicantStatusChangeSchema } from "@/schemas/applicantSchemas";
import { z } from "zod";

type ApplicantStatusChangeType = z.infer<typeof applicantStatusChangeSchema>;

export const useAppStatusMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  const setAppStatus = async (args: ApplicantStatusChangeType) => {
    if (!applicantStatusChangeSchema.safeParse(args).success) {
      throw new Error("Invalid arguments");
    }

    const response = await fetch(`/api/applications/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    if (!response.ok) {
      throw new Error("Error updating applicant");
    }

    return response.json();
  };

  return useMutation({
    mutationFn: (args: ApplicantStatusChangeType) => setAppStatus(args),
    onSuccess: () => {
      queryClient.invalidateQueries("applicants");
      onSuccess();
    },
  });
};

export type AppStatusMutationType = ReturnType<typeof useAppStatusMutation>;
