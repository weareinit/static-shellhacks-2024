import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image, { StaticImageData } from "next/image";
import blue from "/public/assets/decorations/blue_umbrella.png";
import red from "/public/assets/decorations/red_umbrella.png";
import yellow from "/public/assets/decorations/yellow_umbrella.png";
import green from "/public/assets/decorations/green_umbrella.png";
import Navbar from "@/components/dashboard/Navbar";
import { application_status_enums } from "@prisma/client";
import { useAppUpdateMutation } from "@/hooks/ApplicationUpdateMutation";
import HackerGuide from "@/components/sections/HackerGuide";
import { useHackerGuideContext } from "@/hooks/ShowHackerGuideContext";
import ApplicantInfo from "@/components/dashboard/ApplicantInfo";
import PixelButton from "@/components/misc/PixelButton";
import { openApplicantResume } from "@/util/openApplicantResume";
import { uploadResume } from "@/util/uploadResume";
import { QRCodeSVG } from "qrcode.react";
import { APPLICATION_STATUS_DETAILS_MAPPING } from "@/constants/applicationConstants";
import { useApplicationQuery } from "@/hooks/ApplicationQuery";

const Dashboard = () => {
  const { user } = useUser();
  const { data: applicantData, isLoading, isError } = useApplicationQuery(user?.email!);
  const { showHackerGuide, setShowHackerGuide } = useHackerGuideContext();
  const [isUploadingResume, setIsUploadingResume] = useState<boolean>(false);
  const [decorationImage, setDecorationImage] = useState<StaticImageData>(yellow);
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
      await appUpdateMutation.mutateAsync({ application_status: application_status_enums.confirmed, email: applicantData?.email });
    } catch (error) {
      console.error("Error changing application status:", error);
    }
  };

  const openHackerGuide = () => {
    //if on mobile, open in new tab
    if (window.innerWidth < 768) {
      window.open("https://weareinit.notion.site/Hacker-Guide-7deb058ff624449a98391c910f7ad0bd?pvs=4", "_blank");
    } else {
      setShowHackerGuide(true);
    }
  };

  const handleResumeFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setIsUploadingResume(true);
      await uploadResume(file, applicantData?.email!);
      setIsUploadingResume(false);
    }
  };

  if (isLoading) {
    return (
      <main className="bg-sand min-h-screen p-2 md:p-8 text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="bg-sand min-h-screen p-2 md:p-8">
      <Navbar />

      {showHackerGuide && <HackerGuide />}

      {!applicantData || isError ? (
        <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
          <h1 className="text-xl font-bold mb-4">You need to login to a different account</h1>
          <p>Please login using the same account you used when registering for this event.</p>
        </div>
      ) : (
        <section>
          <h1 className="font-pixel text-4xl text-left my-4">Welcome, {applicantData.first_name}!</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
            <div className="bg-white rounded-pixel p-5">
              <h2 className="text-md font-medium mb-2">Application Status</h2>
              <div className="flex flex-col mt-8 items-center gap-1 justify-center">
                <Image src={decorationImage} alt="Umbrella Decoration" />

                <p className="text-md">{APPLICATION_STATUS_DETAILS_MAPPING[applicantData.application_status]}</p>

                {applicantData.application_status === application_status_enums.accepted && (
                  <PixelButton text="Confirm Attendence" onClick={handleConfirmClick} className="bg-deep_blue hover:bg-pink mt-2" />
                )}

                {applicantData.application_status === application_status_enums.confirmed && (
                  <PixelButton text="Open Hacker Guide" onClick={openHackerGuide} className="bg-deep_blue hover:bg-pink mt-2" />
                )}
              </div>
            </div>

            <div className="bg-white rounded-pixel p-5 lg:col-span-4">
              <h2 className="text-md font-medium mb-2">My Application</h2>

              <ApplicantInfo data={applicantData} isEditing={false} handleEdit={(field, val) => null} />
            </div>

            <div className="bg-white rounded-pixel p-5 lg:col-span-2">
              <h2 className="text-md font-medium mb-2">My Resume</h2>

              <PixelButton text="View Resume" onClick={() => openApplicantResume(applicantData.email)} className="bg-deep_blue hover:bg-pink mt-2" />

              <input type="file" className="hidden" ref={fileInputRef} onChange={handleResumeFileChange} accept="application/pdf" />
              <PixelButton isLoading={isUploadingResume} text="Upload New Resume" onClick={() => fileInputRef.current?.click()} className="bg-deep_blue hover:bg-pink mt-2" />
            </div>

            <div className="bg-white rounded-pixel p-5">
              <h2 className="text-md font-medium mb-2">Check-In Code</h2>

              <div className="flex items-center justify-center">
                <QRCodeSVG value={applicantData.hacker_id.toString()} />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default withPageAuthRequired(Dashboard);
