import React, { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import blue from "/public/assets/decorations/blue_umbrella.png";
import red from "/public/assets/decorations/red_umbrella.png";
import yellow from "/public/assets/decorations/yellow_umbrella.png";
import green from "/public/assets/decorations/green_umbrella.png";
import Navbar from "@/components/dashboard/Navbar";
import { application_status_enums } from "@prisma/client";
import { useAppUpdateMutation } from "@/hooks/ApplicationUpdateMutation";
import Button from "@/components/input/Button";
import HackerGuide from "@/components/sections/HackerGuide";
import { useHackerGuideContext } from "@/hooks/ShowHackerGuideContext";
import ApplicantInfo from "@/components/dashboard/ApplicantInfo";
import { Hacker_Applications } from "@prisma/client";
import PixelButton from "@/components/misc/PixelButton";

const getApplicant = async ({ queryKey }: { queryKey: any }) => {
  const [_, email] = queryKey;
  const response = await fetch(`/api/applications/${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {

    throw new Error("Error fetching applicant");
  }

  return (await response.json()) as Hacker_Applications;
};

const Dashboard = () => {
  const { user } = useUser();
  const { data: applicantData, isLoading, error } = useQuery(["applicant", user?.email], getApplicant);
  const { showHackerGuide, setShowHackerGuide } = useHackerGuideContext();
  const [isEditing, setIsEditing] = useState(false);
  const applicationUpdateMutation = useAppUpdateMutation();
  const [editedData, setEditedData] = useState<Hacker_Applications | null>(null);

  const appUpdateMutation = useAppUpdateMutation();

  const [decorationImage, setDecorationImage] = useState<StaticImageData>(yellow);
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

  let applicationStatusMessage = "";

  switch (applicantData?.application_status) {
    case application_status_enums.registered:
      applicationStatusMessage = "You have applied!";
      break;
    case application_status_enums.in_wave:
      applicationStatusMessage = "You have applied!";
      break;
    case application_status_enums.accepted:
      applicationStatusMessage = "You are accepted!";
      break;
    case application_status_enums.confirmed:
      applicationStatusMessage = "You are confirmed!";
      break;
    case application_status_enums.withdrawn:
      applicationStatusMessage = "You have withdrawn! :(";
      break;
    // case application_status_enums.waitlisted: //waitlisted doesnt exist as a status
    //   applicationStatusMessage = "You are waitlisted";
    //   break;
    default:
      applicationStatusMessage = "";
  }

  const openHackerGuide = () => {
    //if on mobile, open in new tab
    if (window.innerWidth < 768) {
      window.open("https://weareinit.notion.site/Hacker-Guide-7deb058ff624449a98391c910f7ad0bd?pvs=4", "_blank");
    } else {
      setShowHackerGuide(true);
    }
  };

  const toggleEditing = async () => {
    if (isEditing) {
      console.log("saving...");
      await applicationUpdateMutation.mutateAsync(editedData!);
    } else {
      setEditedData(applicantData!);
    }

    setIsEditing((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!applicantData || error) {
    return (
      <>
        <div className="py-2 px-6">
          <Navbar />
        </div>
        <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
          <h1 className="text-xl font-bold mb-4">You need to login to a different account</h1>
          <p>Please login using the same account you used when registering for this event.</p>
        </div>
      </>
    );
  }

  return (
    <main className="bg-sand min-h-screen p-2 md:p-8">
      <Navbar />

      <div className="">
        {showHackerGuide && <HackerGuide />}

        <h1 className="font-pixel text-4xl text-left my-4">Welcome, {applicantData.first_name}!</h1>

        {/* {applicantData.application_status === application_status_enums.accepted && (
          <div className="mt-4 bg-white rounded-md shadow-md p-6 flex flex-col justify-center">
            <h2 className="text-lg font-medium mb-2">{applicationStatusMessage}</h2>
            <p>Congratulations! Your application has been accepted. Please click the "Confirm" button below to confirm your attendance to the event.</p>
            <button onClick={handleConfirmClick} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
              Confirm
            </button>
          </div>
        )} */}
        <div className="flex flex-row flex-wrap lg:flex-nowrap gap-4">
          <div className="bg-white rounded-md shadow-md p-5 grow-0">
            <h2 className="text-md font-medium mb-2">Current Application Status</h2>
            <div className="flex flex-col mt-8 items-center gap-1 justify-center">
              <Image src={decorationImage} alt="Umbrella Decoration" />

              <p className="text-md">
                {applicantData.application_status !== application_status_enums.accepted
                  ? applicationStatusMessage
                  : 'Congratulations! Your application has been accepted. Please click the "Confirm" button below to confirm your attendance to the event'}
              </p>

              {applicantData.application_status === application_status_enums.accepted && (
                <PixelButton text="Confirm Attendence" onClick={handleConfirmClick} className="bg-deep_blue hover:bg-pink mt-2" />
              )}

              {applicantData.application_status === application_status_enums.confirmed && (
                <PixelButton text="Open Hacker Guide" onClick={openHackerGuide} className="bg-deep_blue hover:bg-pink mt-2" />
              )}
            </div>
          </div>

          <div className="bg-white rounded-md shadow-md p-5 grow">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-md font-medium mb-2">My Application</h2>
              <a className="text-md font-pixel font-medium color-pink mb-2" onClick={toggleEditing}>
                Edit
              </a>
            </div>
            <ApplicantInfo data={applicantData} isEditing={false} handleEdit={(field, val) => null} />
            {/* <div className="bg-white rounded-md shadow-md p-6 flex flex-col justify-center">
              <h2 className="text-lg font-medium mb-2">Personal Information</h2>
              <p>
                Name: {applicantData.first_name} {applicantData.last_name}
              </p>
              <p>Age: {applicantData.age}</p>
              <p>Country: {applicantData.country}</p>
              <p>Gender: {applicantData.gender}</p>
              <p>Pronouns: {applicantData.pronouns}</p>
              <p>Ethnicity: {applicantData.ethnicity}</p>
              <p>International: {applicantData.is_international ? "Yes" : "No"}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-white rounded-md shadow-md p-6 flex flex-col justify-center">
              <h2 className="text-lg font-medium mb-2">Education Information</h2>
              <p>School: {applicantData.school}</p>
              <p>Major: {applicantData.major}</p>
              <p>Graduation Year: {applicantData.grad_year}</p>
              <p>Level of Study: {applicantData.level_of_study}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-white rounded-md shadow-md p-6 flex flex-col justify-center">
              <h2 className="text-lg font-medium mb-2">Contact Information</h2>
              <p>Email: {applicantData.email}</p>
              <p>Phone Number: {applicantData.phone_number}</p>
              <p>Discord: {applicantData.discord}</p>
              <p>GitHub: {applicantData.github}</p>
              <p>LinkedIn: {applicantData.linkedin}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-white rounded-md shadow-md p-6 flex flex-col justify-center">
              <h2 className="text-lg font-medium mb-2">Additional Information</h2>
              <p>Agreed to MLH news: {applicantData.agreed_mlh_news ? "Yes" : "No"}</p>
              <p>Check-In Status: {applicantData.check_in_status ? "Checked in" : "Not checked in"}</p>
              <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
                <p className="mt-4">MLH Code of Conduct</p>
              </a> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default withPageAuthRequired(Dashboard);
