import { useQueryClient, useMutation } from "react-query";
import { applicantStatusChangeSchema } from "@/schemas/applicantSchemas";
import { z } from "zod";

type ApplicantStatusChangeType = z.infer<typeof applicantStatusChangeSchema>;

export const useAppStatusMutation = () => {
  const queryClient = useQueryClient();

  const setAppStatus = async (args: ApplicantStatusChangeType) => {
    if (args.email == null) {
      throw new Error("Email is null. Cannot update user application");
    }

    const response = await fetch(`/api/applications/${encodeURIComponent(args.email)}`, {
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
    },
  });
};

export type AppStatusMutationType = ReturnType<typeof useAppStatusMutation>;
