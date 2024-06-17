import { Hacker_Applications, application_status_enums } from "@prisma/client";
import UserInfo from "./UserInfo";
import { CustomButton } from "./CustomButton";
import { auth, signOut } from "@/server/auth";
import {
  APPLICATION_STATUS_COLOR_MAPPING,
  APPLICATION_STATUS_NAME_MAPPING,
} from "../../constants/applicationConstants";
import DashboardSocialButtons from "./DashboardSocialButtons";
import WithdrawApplicationButton from "./WithdrawApplicationButton";
import ResumeView from "./ResumeView";
import DashboardAvatar from "./DashboardAvatar";
import HackerQRCode from "./HackerQRCode";

export default async function DahsboardContent({
  application,
}: {
  application: Hacker_Applications;
}) {
  const sess = await auth();
  const applicationWithDiscord = {
    ...application,
    discord: sess?.user.discordUsername as string,
  };

  return (
    <div className="flex w-full flex-col gap-4 p-5">
      <div className="flex justify-end">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <CustomButton colorVariant={2}>Logout</CustomButton>
        </form>
      </div>

      <div className="grid grid-cols-8 gap-8">
        {/* Avatar container */}
        <div className="col-span-8 flex flex-col items-center justify-between lg:col-span-2 lg:items-start">
          <div className="flex flex-col justify-center gap-4">
            <DashboardAvatar application={application} />
          </div>

          <div className="mt-2">
            <p className="font-zoonaji text-2xl">
              Status:{" "}
              <span
                style={{
                  color:
                    APPLICATION_STATUS_COLOR_MAPPING[
                      application.application_status
                    ],
                }}
              >
                {
                  APPLICATION_STATUS_NAME_MAPPING[
                    application.application_status
                  ]
                }
              </span>
            </p>
          </div>
        </div>

        {/* User info */}
        <div className="col-span-8 lg:col-span-6">
          <UserInfo user={applicationWithDiscord} />
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="my-5 w-[90%] border-b border-black"></div>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {/* Resume */}
        <div className="col-span-8 lg:col-span-2">
          <ResumeView userId={sess!.user.id} />
        </div>

        {/* QR Code */}
        {application.application_status ===
          application_status_enums.confirmed && (
          <div className="col-span-8 lg:col-span-2">
            <HackerQRCode hacker_id={sess!.user.id} />
          </div>
        )}

        {/* Contact / resources */}
        <div className="col-span-8 lg:col-span-4">
          <div className="flex flex-col items-start gap-2">
            <p className="font-museo text-xl">Contact:</p>
            <p className="text-md font-museo">
              If you have any questions about the hackathon, please post them in
              the <i>#ask-an-organizer</i> channel in Discord, and we'll be in
              touch as soon as possible. Or if you prefer, you may reach out to
              an organizer privately on Discord or send an email to
              <i> shellhacks@fiu.weareinit.org</i>.
            </p>

            <div>
              <p className="font-museo text-xl">Resources:</p>
              <div className="my-3">
                <DashboardSocialButtons />
              </div>
              {application.application_status ===
              application_status_enums.withdrawn ? (
                <p className="font-zoonaji text-2xl text-red-600">
                  You have withdrawn your application
                </p>
              ) : (
                <WithdrawApplicationButton userId={sess!.user.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
