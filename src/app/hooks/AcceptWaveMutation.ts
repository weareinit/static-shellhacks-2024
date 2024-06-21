import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useAcceptWaveMutation = () => {
  const queryClient = useQueryClient();

  const acceptWave = async () => {
    const response = await fetch(`/api/admin/acceptWave`, {
      method: "POST",
      headers: {
        "Content-Type": "applicantion/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error accepting wave");
    }

    return response.json();
  };

  return useMutation({
    mutationFn: acceptWave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });
};
