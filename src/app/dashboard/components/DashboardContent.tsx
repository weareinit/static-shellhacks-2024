import { Hacker_Applications, application_status_enums } from "@prisma/client";
import UserInfo from "./UserInfo";
import { CustomButton } from "./CustomButton";
import Image from "next/image";
import { getUserFromId } from "../../api/(logic)/getUserFromId";
import { auth, signOut } from "@/server/auth";
import {
  APPLICATION_STATUS_COLOR_MAPPING,
  APPLICATION_STATUS_NAME_MAPPING,
} from "../../constants/applicationConstants";
import SocialButtons from "@/app/components/sections/SocialButtons";
import DashboardSocialButtons from "./DashboardSocialButtons";
import WithdrawApplicationButton from "./WithdrawApplicationButton";
import ResumeView from "./ResumeView";

export default async function DahsboardContent({
  user,
}: {
  user: Hacker_Applications;
}) {
  const sess = await auth();

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
        <div className="col-span-2 flex flex-col items-start justify-between">
          <div className="flex flex-col justify-center gap-4">
            <Image
              src="/assets/new/misc/Shell 1.svg"
              alt="test image"
              width={275}
              height={200}
              draggable={false}
            />
            <CustomButton>Change Avatar</CustomButton>
          </div>

          <div>
            <p className="font-zoonaji text-2xl">
              Status:{" "}
              <span
                style={{
                  color:
                    APPLICATION_STATUS_COLOR_MAPPING[user.application_status],
                }}
              >
                {APPLICATION_STATUS_NAME_MAPPING[user.application_status]}
              </span>
            </p>
          </div>
        </div>

        {/* User info */}
        <div className="col-span-6">
          <UserInfo user={user} />
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="my-5 w-[90%] border-b border-black"></div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Resume */}
        <ResumeView userId={sess!.user.id} />

        {/* Resources */}
        <div className="col-span-2 flex flex-col items-start gap-3">
          <p className="font-museo text-xl">Resources:</p>
          <DashboardSocialButtons />
          {user.application_status === application_status_enums.withdrawn ? (
            <p className="font-zoonaji text-2xl text-red-600">
              You have withdrawn your application
            </p>
          ) : (
            <WithdrawApplicationButton userId={sess!.user.id} />
          )}
        </div>
      </div>
    </div>
  );
}
