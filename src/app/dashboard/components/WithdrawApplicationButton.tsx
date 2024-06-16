"use client";
export default function WithdrawApplicationButton({
  userId,
}: {
  userId: string;
}) {
  const handleWithdrawApplication = async () => {
    const confirmation = confirm(
      "Are you sure you want to withdraw your application?",
    );
    if (confirmation) {
      await fetch(`/api/hackers/${userId}`, {
        //can put a random field for the user id, cause the server will check the auth (since not admin)
        method: "PUT",
        body: JSON.stringify({ application_status: "withdrawn" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.reload();
    }
  };

  return (
    <p
      className="font-zoonaji cursor-pointer text-2xl text-red-600 underline"
      onClick={handleWithdrawApplication}
    >
      Withdraw Applicatiion
    </p>
  );
}
