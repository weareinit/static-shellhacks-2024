"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Image, { StaticImageData } from "next/image";
import blue from "/public/assets/decorations/blue_umbrella.png";
import red from "/public/assets/decorations/red_umbrella.png";
import yellow from "/public/assets/decorations/yellow_umbrella.png";
import green from "/public/assets/decorations/green_umbrella.png";
import Navbar from "@/app/components/dashboard/Navbar";
import { application_status_enums } from "@prisma/client";
import { useAppUpdateMutation } from "@/app/hooks/ApplicationUpdateMutation";
import HackerGuide from "@/app/components/sections/HackerGuide";
import { useHackerGuideContext } from "@/app/hooks/ShowHackerGuideContext";
import ApplicantInfo from "@/app/components/dashboard/ApplicantInfo";
import PixelButton from "@/app/components/misc/PixelButton";
import { openApplicantResume } from "@/app/util/openApplicantResume";
import { uploadResume } from "@/app/util/uploadResume";
import { QRCodeSVG } from "qrcode.react";
import { APPLICATION_STATUS_DETAILS_MAPPING } from "@/app/constants/applicationConstants";
import { useApplicationQuery } from "@/app/hooks/ApplicationQuery";
import Link from "next/link";
import SocialButtons from "@/app/components/sections/SocialButtons";
import Button from "@/app/components/input/Button";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  // const applicantData = useGetUser("d913b428-aead-4540-b213-c84309bc6a9c");
  // const isLoading = false;
  // const isError = false;
  // const {
  //   data: applicantData,
  //   isLoading,
  //   isError,
  // } = useApplicationQuery(user?.email!);
  
  const {
    data: applicantData,
    isLoading,
    isError,
  } = useApplicationQuery("4f8101cf-7709-4303-9c70-457d4f52a281@gmail.com");
  const { showHackerGuide, setShowHackerGuide } = useHackerGuideContext();
  const [isUploadingResume, setIsUploadingResume] = useState<boolean>(false);
  const [decorationImage, setDecorationImage] =
    useState<StaticImageData>(yellow);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const appUpdateMutation = useAppUpdateMutation();

  useEffect(() => {
    switch (applicantData?.application_status) {
      case application_status_enums.registered:
      case application_status_enums.in_wave:
        setDecorationImage(yellow);
        break;
      case application_status_enums.accepted:
        setDecorationImage(blue);
        break;
      case application_status_enums.confirmed:
        setDecorationImage(green);
        break;
      case application_status_enums.withdrawn:
        setDecorationImage(red);
        break;
      default:
        setDecorationImage(yellow);
    }
  }, [applicantData]);

  const handleConfirmClick = async () => {
    try {
      await appUpdateMutation.mutateAsync({
        application_status: application_status_enums.confirmed,
        email: applicantData?.email,
      });
    } catch (error) {
      console.error("Error changing application status:", error);
    }
  };

  const handleWithdrawClick = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to withdraw? This action is irreversible.",
    );

    if (confirmation) {
      try {
        await appUpdateMutation.mutateAsync({
          application_status: application_status_enums.withdrawn,
          email: applicantData?.email,
        });
      } catch (error) {
        console.error("Error changing application status:", error);
      }
    }
  };

  const openHackerGuide = () => {
    //if on mobile, open in new tab
    if (window.innerWidth < 768) {
      window.open(
        "https://weareinit.notion.site/Hacker-Guide-7deb058ff624449a98391c910f7ad0bd?pvs=4",
        "_blank",
      );
    } else {
      setShowHackerGuide(true);
    }
  };

  const handleResumeFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setIsUploadingResume(true);
      await uploadResume(file, applicantData?.email!);
      setIsUploadingResume(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-sand p-2 text-center md:p-8">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sand p-2 md:p-8">
      <Navbar />

      {showHackerGuide && <HackerGuide />}

      {!applicantData || isError ? (
        <div className="mx-auto max-w-md rounded-md bg-white p-6 shadow-md">
          <h1 className="mb-4 text-xl font-bold">
            You need to login to a different account
          </h1>
          <p>
            Please login using the same account you used when registering for
            this event.
          </p>
        </div>
      ) : (
        <section>
          <h1 className="my-4 text-left font-pixel text-4xl">
            Welcome, {applicantData.first_name}!
          </h1>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
            <div className="rounded-pixel bg-white p-4">
              <h2 className="text-md mb-2 font-medium">Application Status</h2>
              <div className="mt-8 flex flex-col items-center justify-center gap-1">
                <Image src={decorationImage} alt="Umbrella Decoration" />

                <p className="text-md">
                  {
                    APPLICATION_STATUS_DETAILS_MAPPING[
                      applicantData.application_status
                    ]
                  }
                </p>

                {applicantData.application_status ===
                  application_status_enums.accepted && (
                  <PixelButton
                    text="Confirm Attendence"
                    onClick={handleConfirmClick}
                    className="mt-2 bg-deep_blue hover:bg-pink"
                  />
                )}

                <PixelButton
                  text="Withdraw application"
                  onClick={handleWithdrawClick}
                  className="mt-2 bg-red-400 hover:bg-red-500"
                />
              </div>
            </div>

            <div className="rounded-pixel bg-white p-4 lg:col-span-4">
              <h2 className="text-md mb-2 font-medium">My Application</h2>

              <ApplicantInfo
                data={applicantData}
                isEditing={false}
                handleEdit={(field, val) => null}
              />
            </div>

            <div className="rounded-pixel bg-white p-4 lg:col-span-2">
              <h2 className="text-md font-medium">My Resume</h2>
              <p className="mb-2">
                We share your resume with interested companies and sponsors, so
                make sure it's up-to-date!
              </p>

              <PixelButton
                text="View Resume"
                onClick={() => openApplicantResume(applicantData.email)}
                className="mt-2 bg-deep_blue hover:bg-pink"
              />

              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleResumeFileChange}
                accept="application/pdf"
              />
              <PixelButton
                isLoading={isUploadingResume}
                text="Upload New Resume"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 bg-deep_blue hover:bg-pink"
              />
            </div>

            {applicantData.application_status ===
              application_status_enums.confirmed && (
              <div className="rounded-pixel bg-white p-4">
                <h2 className="text-md mb-2 font-medium">Check-In Code</h2>

                <div className="flex items-center justify-center">
                  <QRCodeSVG value={applicantData.hacker_id.toString()} />
                </div>
              </div>
            )}

            <div className="rounded-pixel bg-white p-4 lg:col-span-2">
              <h2 className="text-md mb-2 font-medium">Resources</h2>

              <div className="flex flex-col items-center justify-center align-middle">
                <a
                  onClick={openHackerGuide}
                  className="mt-2 cursor-pointer font-pixel text-3xl text-pink hover:text-deep_blue"
                >
                  Open Hacker Guide
                </a>
                <Link
                  href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                  className="mb-3 mt-2 cursor-pointer font-pixel text-lg text-pink hover:text-deep_blue"
                >
                  MLH Code of Conduct
                </Link>

                <SocialButtons />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

function DashboardRemoved() {
  return (
    <main className="flex h-screen min-h-screen items-center justify-center bg-sand p-2 md:p-8">
      <div className="rounded-pixel flex w-[40vw] min-w-[200px] max-w-[600px] flex-col items-center justify-center space-y-3 bg-white p-5">
        <h1 className="text-center font-console text-xl ">
          Registration Has Ended, Thanks for Hacking!
        </h1>
        <Link href="/">
          <Button className="col-span-full flex h-[10vw] max-h-[60px] min-h-[50px] w-[40vw] min-w-[300px] max-w-[500px] items-center justify-center bg-deep_blue text-center text-white drop-shadow-teal hover:bg-pink hover:drop-shadow-pink">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default Dashboard;
