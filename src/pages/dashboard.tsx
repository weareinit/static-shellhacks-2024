import React, { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import blue from "/public/assets/decorations/blue_umbrella.png";
import red from "/public/assets/decorations/red_umbrella.png";
import yellow from "/public/assets/decorations/yellow_umbrella.png";
import green from "/public/assets/decorations/green_umbrella.png";
import Navbar from "@/components/dashboard/Navbar";
import { application_status_enums } from "@prisma/client";
import { useAppUpdateMutation } from "@/hooks/ApplicationUpdateMutation";

const getapplicant = async () => {
  const response = await fetch("/api/application", {
    method: "GET",
    headers: {
      "Content-Type": "applicant/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching applicant");
  }

  return response.json();
};

const Dashboard = () => {
  const { data, isLoading, error } = useQuery("applicant", getapplicant);
  const applicantData = data?.applicant;

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
      await appUpdateMutation.mutateAsync({ application_status: application_status_enums.confirmed });
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
    default:
      applicationStatusMessage = "";
  }

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
    <main className="bg-sand min-h-screen p-5">
      <div className="py-2 px-6">
        <Navbar />
      </div>

      <div className="max-w-md mx-auto">
        {applicantData.application_status === application_status_enums.accepted && (
          <div className="mt-4 bg-white rounded-md shadow-md p-6 flex flex-col justify-center">
            <h2 className="text-lg font-medium mb-2">{applicationStatusMessage}</h2>
            <p>Congratulations! Your application has been accepted. Please click the "Confirm" button below to confirm your attendance to the event.</p>
            <button onClick={handleConfirmClick} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
              Confirm
            </button>
          </div>
        )}
        <div className="bg-white rounded-md shadow-md p-6">
          <h1 className="text-xl mb-4 font-pixel text-center">Hacker Dashboard</h1>
          <div className="mt-4">
            <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium mb-2">Current Application Status</h2>
              <div>
                <Image src={decorationImage} alt="Umbrella Decoration" />
              </div>
              <p>{applicationStatusMessage}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-white rounded-md shadow-md p-6 flex flex-col justify-center">
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withPageAuthRequired(Dashboard);
