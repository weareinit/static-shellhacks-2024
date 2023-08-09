import sendReminderEmail from "@/pages/api/admin/sendReminderEmail";
import { sendReminderEmailType } from "@/schemas/applicantSchemas";
import { useQueryClient, useMutation } from "react-query";

export const useSendReminderEmailMutation = () => {
  const queryClient = useQueryClient();

  const sendReminderEmail = async (emailType: sendReminderEmailType) => {
    const response = await fetch(`/api/admin/sendReminderEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailType),
    });

    if (!response.ok) {
      throw new Error("Error sending confirmation email");
    }

    return response.json();
  };

  return useMutation({
    mutationFn: sendReminderEmail,
  });
};
